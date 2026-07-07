"use client"

import { Phone, Mail, MapPin, Clock, type LucideIcon } from "lucide-react"
import type { ContactInfo } from "@rancho-cocory/shared"
import { EditableText } from "@/components/editor/editor-mode"
import { useContent } from "@/components/content-provider"
import { SocialIcon } from "@/lib/social-icons"

const contactIconMap: Record<ContactInfo["icon"], LucideIcon> = {
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  clock: Clock,
}

export function Contact() {
  const { content } = useContent()
  const { contact } = content

  return (
    <section id="contacto" className="py-20 md:py-28 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            <EditableText path="contact.eyebrow" value={contact.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            <EditableText path="contact.title" value={contact.title} />
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            <EditableText
              path="contact.subtitle"
              value={contact.subtitle}
              multiline
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {contact.contactInfo.map((item, index) => {
              const Icon = contactIconMap[item.icon]
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50"
                >
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-foreground font-semibold hover:text-primary transition-colors text-sm"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <EditableText
                          path={`contact.contactInfo.${index}.value`}
                          value={item.value}
                        />
                      </a>
                    ) : (
                      <p className="text-foreground font-semibold text-sm">
                        <EditableText
                          path={`contact.contactInfo.${index}.value`}
                          value={item.value}
                        />
                      </p>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-sm font-semibold text-muted-foreground">
                <EditableText path="contact.socialLabel" value={contact.socialLabel} />
              </span>
              {contact.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors"
                  aria-label={link.label}
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm h-[400px] lg:h-auto">
            <iframe
              src={contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicacion de Rancho Cocory en Higuey"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
