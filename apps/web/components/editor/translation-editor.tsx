"use client"

import { useCallback, useEffect, useState } from "react"
import type { PageContent } from "@rancho-cocory/shared"
import { applyLocaleOverlay, getLocaleContent } from "@rancho-cocory/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useContent } from "@/components/content-provider"
import {
  getLocaleTranslations,
  updateLocaleTranslation,
} from "@/lib/cms-client"
import { toast } from "sonner"

const SECTIONS = [
  { id: "loader", label: "Carga" },
  { id: "seo", label: "SEO" },
  { id: "navbar", label: "Navegación" },
  { id: "hero", label: "Hero" },
  { id: "services", label: "Actividades" },
  { id: "experiences", label: "Experiencias" },
  { id: "gallery", label: "Galería" },
  { id: "testimonials", label: "Testimonios" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contacto" },
  { id: "footer", label: "Footer" },
  { id: "legal", label: "Legal" },
] as const

type SectionId = (typeof SECTIONS)[number]["id"]

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined) return undefined
    if (Array.isArray(acc)) {
      const index = Number(key)
      return Number.isNaN(index) ? undefined : acc[index]
    }
    if (typeof acc === "object") {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function TranslationField({
  label,
  spanishValue,
  englishValue,
  multiline,
  onSave,
}: {
  label: string
  spanishValue: string
  englishValue: string
  multiline?: boolean
  onSave: (value: string) => Promise<void>
}) {
  const [draft, setDraft] = useState(englishValue)
  const [saving, setSaving] = useState(false)

  useEffect(() => setDraft(englishValue), [englishValue])

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(draft)
      toast.success("Traducción guardada")
    } catch {
      toast.error("Error al guardar traducción")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-2 border rounded-lg p-3">
      <Label className="font-medium">{label}</Label>
      <p className="text-xs text-muted-foreground">
        ES: <span className="text-foreground">{spanishValue || "—"}</span>
      </p>
      {multiline ? (
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={multiline === true ? 3 : multiline}
        />
      ) : (
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} />
      )}
      <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
        {saving ? "Guardando..." : "Guardar traducción"}
      </Button>
    </div>
  )
}

function IncludesTranslationField({
  label,
  spanishValues,
  englishValues,
  path,
  onSaveArray,
}: {
  label: string
  spanishValues: string[]
  englishValues: string[]
  path: string
  onSaveArray: (path: string, value: string[]) => Promise<void>
}) {
  const [draft, setDraft] = useState(englishValues.join("\n"))
  const [saving, setSaving] = useState(false)

  useEffect(() => setDraft(englishValues.join("\n")), [englishValues])

  async function handleSave() {
    setSaving(true)
    try {
      const lines = draft
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
      await onSaveArray(path, lines)
      toast.success("Traducción guardada")
    } catch {
      toast.error("Error al guardar traducción")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-2 border rounded-lg p-3">
      <Label className="font-medium">{label}</Label>
      <p className="text-xs text-muted-foreground">
        ES: {spanishValues.join(" · ") || "—"}
      </p>
      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        placeholder="Un ítem por línea"
      />
      <Button size="sm" onClick={() => void handleSave()} disabled={saving}>
        {saving ? "Guardando..." : "Guardar traducción"}
      </Button>
    </div>
  )
}

export function TranslationEditor() {
  const { content } = useContent()
  const [activeSection, setActiveSection] = useState<SectionId>("navbar")
  const [overlay, setOverlay] = useState<Partial<PageContent>>({})
  const [fallback, setFallback] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)

  const loadTranslations = useCallback(async () => {
    setLoading(true)
    try {
      const [translations, staticEn] = await Promise.all([
        getLocaleTranslations("en"),
        getLocaleContent("en"),
      ])
      setOverlay(translations)
      setFallback(staticEn)
    } catch {
      toast.error("No se pudieron cargar las traducciones")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadTranslations()
  }, [loadTranslations])

  const preview =
    fallback !== null
      ? applyLocaleOverlay(content, overlay, fallback)
      : content

  const englishAt = useCallback(
    (path: string): string => {
      const value = getByPath(preview, path)
      return typeof value === "string" ? value : ""
    },
    [preview],
  )

  const saveField = useCallback(async (path: string, value: unknown) => {
    const updated = await updateLocaleTranslation(path, value, "en")
    setOverlay(updated)
  }, [])

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        Cargando traducciones...
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Edita las traducciones al inglés. El contenido en español se gestiona
        inline en la página; aquí solo se guardan los textos en inglés sobre la
        estructura real del sitio.
      </p>

      <div className="flex flex-wrap gap-1">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveSection(section.id)}
            className={`text-xs px-2.5 py-1.5 rounded-md border transition-colors ${
              activeSection === section.id
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:bg-muted"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {activeSection === "loader" && (
        <>
          <TranslationField
            label="Texto de carga"
            spanishValue={content.loader.loadingText}
            englishValue={englishAt("loader.loadingText")}
            onSave={(value) => saveField("loader.loadingText", value)}
          />
          <TranslationField
            label="Mensaje WhatsApp predeterminado"
            spanishValue={content.whatsapp.defaultMessage}
            englishValue={englishAt("whatsapp.defaultMessage")}
            multiline
            onSave={(value) => saveField("whatsapp.defaultMessage", value)}
          />
        </>
      )}

      {activeSection === "seo" && (
        <div className="space-y-3">
          {(
            [
              ["seo.title", "Título del sitio"],
              ["seo.description", "Descripción", true],
              ["seo.openGraphTitle", "OpenGraph título"],
              ["seo.openGraphDescription", "OpenGraph descripción", true],
              ["seo.openGraphSiteName", "OpenGraph site name"],
            ] as const
          ).map(([path, label, multiline]) => (
            <TranslationField
              key={path}
              label={label}
              spanishValue={String(getByPath(content, path) ?? "")}
              englishValue={englishAt(path)}
              multiline={multiline}
              onSave={(value) => saveField(path, value)}
            />
          ))}
        </div>
      )}

      {activeSection === "navbar" && (
        <div className="space-y-3">
          <TranslationField
            label="Dirección"
            spanishValue={content.navbar.address}
            englishValue={englishAt("navbar.address")}
            onSave={(value) => saveField("navbar.address", value)}
          />
          <TranslationField
            label="Horario"
            spanishValue={content.navbar.hours}
            englishValue={englishAt("navbar.hours")}
            onSave={(value) => saveField("navbar.hours", value)}
          />
          <TranslationField
            label="Botón reservar"
            spanishValue={content.navbar.reserveLabel}
            englishValue={englishAt("navbar.reserveLabel")}
            onSave={(value) => saveField("navbar.reserveLabel", value)}
          />
          {content.navbar.navLinks.map((link, index) => (
            <TranslationField
              key={link.href}
              label={`Enlace: ${link.label}`}
              spanishValue={link.label}
              englishValue={englishAt(`navbar.navLinks.${index}.label`)}
              onSave={(value) =>
                saveField(`navbar.navLinks.${index}.label`, value)
              }
            />
          ))}
        </div>
      )}

      {activeSection === "hero" && (
        <div className="space-y-3">
          {(
            [
              ["hero.tagline", "Tagline"],
              ["hero.location", "Ubicación"],
              ["hero.ctaPrimary", "CTA primario"],
              ["hero.ctaSecondary", "CTA secundario"],
            ] as const
          ).map(([path, label]) => (
            <TranslationField
              key={path}
              label={label}
              spanishValue={String(getByPath(content, path) ?? "")}
              englishValue={englishAt(path)}
              onSave={(value) => saveField(path, value)}
            />
          ))}
        </div>
      )}

      {activeSection === "services" && (
        <div className="space-y-4">
          <TranslationField
            label="Eyebrow"
            spanishValue={content.services.eyebrow}
            englishValue={englishAt("services.eyebrow")}
            onSave={(value) => saveField("services.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.services.title}
            englishValue={englishAt("services.title")}
            onSave={(value) => saveField("services.title", value)}
          />
          <TranslationField
            label="Subtítulo"
            spanishValue={content.services.subtitle}
            englishValue={englishAt("services.subtitle")}
            multiline
            onSave={(value) => saveField("services.subtitle", value)}
          />
          {content.services.items.map((item, index) => (
            <div key={item.id} className="space-y-3 border-t pt-4">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <TranslationField
                label="Título"
                spanishValue={item.title}
                englishValue={englishAt(`services.items.${index}.title`)}
                onSave={(value) =>
                  saveField(`services.items.${index}.title`, value)
                }
              />
              <TranslationField
                label="Precio"
                spanishValue={item.priceLabel}
                englishValue={englishAt(`services.items.${index}.priceLabel`)}
                onSave={(value) =>
                  saveField(`services.items.${index}.priceLabel`, value)
                }
              />
              <TranslationField
                label="Detalle de precio"
                spanishValue={item.priceDetail}
                englishValue={englishAt(`services.items.${index}.priceDetail`)}
                onSave={(value) =>
                  saveField(`services.items.${index}.priceDetail`, value)
                }
              />
              <TranslationField
                label="Descripción"
                spanishValue={item.description}
                englishValue={englishAt(`services.items.${index}.description`)}
                multiline
                onSave={(value) =>
                  saveField(`services.items.${index}.description`, value)
                }
              />
              <IncludesTranslationField
                label="Incluye"
                spanishValues={item.includes}
                englishValues={
                  (getByPath(preview, `services.items.${index}.includes`) as
                    | string[]
                    | undefined) ?? []
                }
                path={`services.items.${index}.includes`}
                onSaveArray={saveField}
              />
            </div>
          ))}
        </div>
      )}

      {activeSection === "experiences" && (
        <div className="space-y-4">
          <TranslationField
            label="Eyebrow"
            spanishValue={content.experiences.eyebrow}
            englishValue={englishAt("experiences.eyebrow")}
            onSave={(value) => saveField("experiences.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.experiences.title}
            englishValue={englishAt("experiences.title")}
            onSave={(value) => saveField("experiences.title", value)}
          />
          <TranslationField
            label="Subtítulo"
            spanishValue={content.experiences.subtitle}
            englishValue={englishAt("experiences.subtitle")}
            multiline
            onSave={(value) => saveField("experiences.subtitle", value)}
          />
          {content.experiences.items.map((item, index) => (
            <div key={item.id} className="space-y-3 border-t pt-4">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <TranslationField
                label="Título"
                spanishValue={item.title}
                englishValue={englishAt(`experiences.items.${index}.title`)}
                onSave={(value) =>
                  saveField(`experiences.items.${index}.title`, value)
                }
              />
              <TranslationField
                label="Descripción"
                spanishValue={item.description}
                englishValue={englishAt(
                  `experiences.items.${index}.description`,
                )}
                multiline
                onSave={(value) =>
                  saveField(`experiences.items.${index}.description`, value)
                }
              />
            </div>
          ))}
        </div>
      )}

      {activeSection === "gallery" && (
        <div className="space-y-3">
          {(
            [
              ["gallery.eyebrow", "Eyebrow"],
              ["gallery.title", "Título"],
              ["gallery.subtitle", "Subtítulo", true],
              ["gallery.profileBio", "Bio del perfil"],
              ["gallery.followLabel", "Botón seguir"],
            ] as const
          ).map(([path, label, multiline]) => (
            <TranslationField
              key={path}
              label={label}
              spanishValue={String(getByPath(content, path) ?? "")}
              englishValue={englishAt(path)}
              multiline={multiline}
              onSave={(value) => saveField(path, value)}
            />
          ))}
        </div>
      )}

      {activeSection === "testimonials" && (
        <div className="space-y-3">
          <TranslationField
            label="Eyebrow"
            spanishValue={content.testimonials.eyebrow}
            englishValue={englishAt("testimonials.eyebrow")}
            onSave={(value) => saveField("testimonials.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.testimonials.title}
            englishValue={englishAt("testimonials.title")}
            onSave={(value) => saveField("testimonials.title", value)}
          />
          <TranslationField
            label="Ver todas las reseñas"
            spanishValue={content.testimonials.viewAllLabel}
            englishValue={englishAt("testimonials.viewAllLabel")}
            onSave={(value) => saveField("testimonials.viewAllLabel", value)}
          />
        </div>
      )}

      {activeSection === "faq" && (
        <div className="space-y-4">
          <TranslationField
            label="Eyebrow"
            spanishValue={content.faq.eyebrow}
            englishValue={englishAt("faq.eyebrow")}
            onSave={(value) => saveField("faq.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.faq.title}
            englishValue={englishAt("faq.title")}
            onSave={(value) => saveField("faq.title", value)}
          />
          {content.faq.items.map((item, index) => (
            <div key={item.id} className="space-y-3 border-t pt-4">
              <TranslationField
                label={`Pregunta: ${item.question}`}
                spanishValue={item.question}
                englishValue={englishAt(`faq.items.${index}.question`)}
                onSave={(value) =>
                  saveField(`faq.items.${index}.question`, value)
                }
              />
              <TranslationField
                label="Respuesta"
                spanishValue={item.answer}
                englishValue={englishAt(`faq.items.${index}.answer`)}
                multiline
                onSave={(value) =>
                  saveField(`faq.items.${index}.answer`, value)
                }
              />
            </div>
          ))}
        </div>
      )}

      {activeSection === "contact" && (
        <div className="space-y-3">
          <TranslationField
            label="Eyebrow"
            spanishValue={content.contact.eyebrow}
            englishValue={englishAt("contact.eyebrow")}
            onSave={(value) => saveField("contact.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.contact.title}
            englishValue={englishAt("contact.title")}
            onSave={(value) => saveField("contact.title", value)}
          />
          <TranslationField
            label="Subtítulo"
            spanishValue={content.contact.subtitle}
            englishValue={englishAt("contact.subtitle")}
            multiline
            onSave={(value) => saveField("contact.subtitle", value)}
          />
          <TranslationField
            label="Etiqueta redes"
            spanishValue={content.contact.socialLabel}
            englishValue={englishAt("contact.socialLabel")}
            onSave={(value) => saveField("contact.socialLabel", value)}
          />
          {content.contact.contactInfo.map((info, index) => (
            <TranslationField
              key={info.id}
              label={`${info.label} (etiqueta)`}
              spanishValue={info.label}
              englishValue={englishAt(`contact.contactInfo.${index}.label`)}
              onSave={(value) =>
                saveField(`contact.contactInfo.${index}.label`, value)
              }
            />
          ))}
        </div>
      )}

      {activeSection === "footer" && (
        <div className="space-y-3">
          <TranslationField
            label="Descripción"
            spanishValue={content.footer.description}
            englishValue={englishAt("footer.description")}
            multiline
            onSave={(value) => saveField("footer.description", value)}
          />
          <TranslationField
            label="Título enlaces"
            spanishValue={content.footer.linksTitle}
            englishValue={englishAt("footer.linksTitle")}
            onSave={(value) => saveField("footer.linksTitle", value)}
          />
          <TranslationField
            label="Título contacto"
            spanishValue={content.footer.contactTitle}
            englishValue={englishAt("footer.contactTitle")}
            onSave={(value) => saveField("footer.contactTitle", value)}
          />
          {content.footer.navLinks.map((link, index) => (
            <TranslationField
              key={link.href}
              label={`Enlace: ${link.label}`}
              spanishValue={link.label}
              englishValue={englishAt(`footer.navLinks.${index}.label`)}
              onSave={(value) =>
                saveField(`footer.navLinks.${index}.label`, value)
              }
            />
          ))}
        </div>
      )}

      {activeSection === "legal" && (
        <div className="space-y-4">
          {(
            [
              ["legal.privacyPolicy", "Política de privacidad"],
              ["legal.termsAndConditions", "Términos y condiciones"],
            ] as const
          ).map(([path, sectionLabel]) => {
            const doc = getByPath(content, path) as {
              title: string
              lastUpdated: string
              content: string
            }
            return (
              <div key={path} className="space-y-3 border rounded-lg p-4">
                <h4 className="font-semibold">{sectionLabel}</h4>
                <TranslationField
                  label="Título"
                  spanishValue={doc.title}
                  englishValue={englishAt(`${path}.title`)}
                  onSave={(value) => saveField(`${path}.title`, value)}
                />
                <TranslationField
                  label="Última actualización"
                  spanishValue={doc.lastUpdated}
                  englishValue={englishAt(`${path}.lastUpdated`)}
                  onSave={(value) => saveField(`${path}.lastUpdated`, value)}
                />
                <TranslationField
                  label="Contenido HTML"
                  spanishValue={doc.content.slice(0, 120) + "..."}
                  englishValue={englishAt(`${path}.content`)}
                  multiline={8}
                  onSave={(value) => saveField(`${path}.content`, value)}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
