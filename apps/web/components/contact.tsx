"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, type LucideIcon } from "lucide-react"
import type { ContactInfo } from "@rancho-cocory/shared"
import {
  AddItemButton,
  EditableText,
  ItemControls,
  ItemEditDialog,
} from "@/components/editor/editor-mode"
import { EditableLink } from "@/components/editor/editable-link"
import { EditableSection } from "@/components/editor/editable-section"
import { useContent } from "@/components/content-provider"
import { SocialIcon } from "@/lib/social-icons"

const contactIconMap: Record<ContactInfo["icon"], LucideIcon> = {
  phone: Phone,
  mail: Mail,
  mapPin: MapPin,
  clock: Clock,
}

function ContactInfoCard({
  item,
  index,
  onDelete,
}: {
  item: ContactInfo
  index: number
  onDelete: () => void
}) {
  const { updateField } = useContent()
  const [editOpen, setEditOpen] = useState(false)
  const Icon = contactIconMap[item.icon]
  const basePath = `contact.contactInfo.${index}`

  async function handleSave(values: Record<string, string>) {
    await updateField(basePath, {
      ...item,
      icon: values.icon as ContactInfo["icon"],
      label: values.label,
      value: values.value,
      href: values.href || undefined,
    })
    setEditOpen(false)
  }

  return (
    <>
      <div className="relative flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50">
        <ItemControls
          itemLabel={item.label}
          onEdit={() => setEditOpen(true)}
          onDelete={onDelete}
        />
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="size-5 text-primary" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
            {item.label}
          </p>
          {item.href ? (
            <EditableLink
              hrefPath={`${basePath}.href`}
              textPath={`${basePath}.value`}
              href={item.href}
              value={item.value}
              className="text-foreground font-semibold hover:text-primary transition-colors text-sm"
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            />
          ) : (
            <p className="text-foreground font-semibold text-sm">
              <EditableText path={`${basePath}.value`} value={item.value} />
            </p>
          )}
        </div>
      </div>

      <ItemEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Editar contacto"
        fields={[
          {
            key: "icon",
            label: "Icono (phone, mail, mapPin, clock)",
            value: item.icon,
          },
          { key: "label", label: "Etiqueta", value: item.label },
          { key: "value", label: "Valor", value: item.value },
          { key: "href", label: "Enlace (opcional)", value: item.href ?? "" },
        ]}
        onSave={handleSave}
      />
    </>
  )
}

export function Contact() {
  const { content, updateField } = useContent()
  const { contact } = content
  const [adding, setAdding] = useState(false)

  async function handleAdd(values: Record<string, string>) {
    const newItem: ContactInfo = {
      id: `contact-${Date.now()}`,
      icon: (values.icon as ContactInfo["icon"]) || "phone",
      label: values.label || "Nuevo contacto",
      value: values.value || "",
      href: values.href || undefined,
    }
    await updateField("contact.contactInfo", [...contact.contactInfo, newItem])
    setAdding(false)
  }

  async function handleDelete(index: number) {
    await updateField(
      "contact.contactInfo",
      contact.contactInfo.filter((_, i) => i !== index),
    )
  }

  return (
    <EditableSection
      sectionId="contacto"
      stylePath="contact.style"
      style={contact.style}
      className="py-20 md:py-28 px-4"
    >
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
          <AddItemButton
            label="Añadir contacto"
            onAdd={() => setAdding(true)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {contact.contactInfo.map((item, index) => (
              <ContactInfoCard
                key={item.id}
                item={item}
                index={index}
                onDelete={() => void handleDelete(index)}
              />
            ))}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-sm font-semibold text-muted-foreground">
                <EditableText
                  path="contact.socialLabel"
                  value={contact.socialLabel}
                />
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

      <ItemEditDialog
        open={adding}
        onOpenChange={setAdding}
        title="Nuevo contacto"
        fields={[
          { key: "icon", label: "Icono (phone, mail, mapPin, clock)", value: "phone" },
          { key: "label", label: "Etiqueta", value: "" },
          { key: "value", label: "Valor", value: "" },
          { key: "href", label: "Enlace (opcional)", value: "" },
        ]}
        onSave={handleAdd}
      />
    </EditableSection>
  )
}
