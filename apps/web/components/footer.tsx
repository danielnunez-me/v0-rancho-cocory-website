"use client"

import Image from "next/image"
import { LegalLinks } from "@/components/legal-modals"
import { EditableText } from "@/components/editor/editor-mode"
import { EditableLink } from "@/components/editor/editable-link"
import { useContent } from "@/components/content-provider"

export function Footer() {
  const { content } = useContent()
  const { footer, branding } = content

  return (
    <footer className="bg-foreground text-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="mb-3">
              <Image
                src={branding.logoUrl}
                alt="Rancho Cocory"
                width={240}
                height={120}
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              <EditableText path="footer.description" value={footer.description} multiline />
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-background/80">
              <EditableText path="footer.linksTitle" value={footer.linksTitle} />
            </h3>
            <nav className="flex flex-col gap-2">
              {footer.navLinks.map((link, index) => (
                <EditableLink
                  key={link.href}
                  hrefPath={`footer.navLinks.${index}.href`}
                  textPath={`footer.navLinks.${index}.label`}
                  href={link.href}
                  value={link.label}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                />
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-background/80">
              <EditableText path="footer.contactTitle" value={footer.contactTitle} />
            </h3>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <p>
                <EditableText path="footer.addressLine1" value={footer.addressLine1} />
              </p>
              <p>
                <EditableText path="footer.addressLine2" value={footer.addressLine2} />
              </p>
              <EditableLink
                hrefPath="footer.phoneHref"
                textPath="footer.phone"
                href={footer.phoneHref}
                value={footer.phone}
                className="hover:text-background transition-colors"
              />
              <EditableLink
                hrefPath="footer.emailHref"
                textPath="footer.email"
                href={footer.emailHref}
                value={footer.email}
                className="hover:text-background transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            <EditableText path="footer.copyright" value={footer.copyright} />{" "}
            <EditableLink
              hrefPath="footer.creditUrl"
              textPath="footer.creditName"
              href={footer.creditUrl}
              value={footer.creditName}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium"
            />
            .
          </p>
          <div className="flex gap-4">
            <LegalLinks />
          </div>
        </div>
      </div>
    </footer>
  )
}
