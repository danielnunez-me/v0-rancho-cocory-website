"use client"

import Image from "next/image"
import { LegalLinks } from "@/components/legal-modals"
import { EditableText } from "@/components/editor/editor-mode"
import { useContent } from "@/components/content-provider"

export function Footer() {
  const { content } = useContent()
  const { footer } = content

  return (
    <footer className="bg-foreground text-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="mb-3">
              <Image
                src="/images/logo.png"
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
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  <EditableText
                    path={`footer.navLinks.${index}.label`}
                    value={link.label}
                  />
                </a>
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
              <a
                href={footer.phoneHref}
                className="hover:text-background transition-colors"
              >
                <EditableText path="footer.phone" value={footer.phone} />
              </a>
              <a
                href={footer.emailHref}
                className="hover:text-background transition-colors"
              >
                <EditableText path="footer.email" value={footer.email} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            <EditableText path="footer.copyright" value={footer.copyright} />{" "}
            <a
              href={footer.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium"
            >
              <EditableText path="footer.creditName" value={footer.creditName} />
            </a>
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
