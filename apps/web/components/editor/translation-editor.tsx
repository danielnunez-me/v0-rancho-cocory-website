"use client"

import { useCallback, useEffect, useState } from "react"
import type { LocaleConfig, LocaleStrings, PageContent } from "@rancho-cocory/shared"
import {
  applyLocaleOverlay,
  getDefaultLocaleStrings,
  isValidLocaleCode,
} from "@rancho-cocory/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContent } from "@/components/content-provider"
import {
  addTranslationLocale,
  getLocaleConfig,
  getLocaleTranslations,
  removeTranslationLocale,
  updateLocaleTranslation,
} from "@/lib/cms-client"
import { toast } from "sonner"
import { Plus, Trash2 } from "lucide-react"

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
  const [localeConfig, setLocaleConfig] = useState<LocaleConfig>({ locales: [] })
  const [selectedLocale, setSelectedLocale] = useState("en")
  const [overlay, setOverlay] = useState<LocaleStrings>({})
  const [fallback, setFallback] = useState<LocaleStrings>({})
  const [loading, setLoading] = useState(true)
  const [newLocaleCode, setNewLocaleCode] = useState("")
  const [newLocaleLabel, setNewLocaleLabel] = useState("")
  const [addingLocale, setAddingLocale] = useState(false)

  const loadLocaleConfig = useCallback(async () => {
    return getLocaleConfig()
  }, [])

  const loadTranslations = useCallback(async () => {
    setLoading(true)
    try {
      const config = await loadLocaleConfig()
      setLocaleConfig(config)

      const locale =
        config.locales.find((entry) => entry.code === selectedLocale)?.code ??
        config.locales[0]?.code

      if (!locale) {
        setOverlay({})
        setFallback({})
        return
      }

      if (locale !== selectedLocale) {
        setSelectedLocale(locale)
      }

      const [translations, staticStrings] = await Promise.all([
        getLocaleTranslations(locale),
        getDefaultLocaleStrings(locale),
      ])
      setOverlay(translations)
      setFallback(staticStrings)
    } catch {
      toast.error("No se pudieron cargar las traducciones")
    } finally {
      setLoading(false)
    }
  }, [loadLocaleConfig, selectedLocale])

  useEffect(() => {
    void loadTranslations()
  }, [loadTranslations])

  const preview = applyLocaleOverlay(content, overlay, fallback)

  const translatedAt = useCallback(
    (path: string): string => {
      const value = getByPath(preview, path)
      return typeof value === "string" ? value : ""
    },
    [preview],
  )

  const saveField = useCallback(
    async (path: string, value: unknown) => {
      const updated = await updateLocaleTranslation(path, value, selectedLocale)
      setOverlay(updated)
    },
    [selectedLocale],
  )

  async function handleAddLocale() {
    const code = newLocaleCode.toLowerCase().trim()
    const label = newLocaleLabel.trim()

    if (!isValidLocaleCode(code) || code === "es") {
      toast.error("Código de idioma inválido (usa 2 letras, ej: en, fr)")
      return
    }
    if (!label) {
      toast.error("Ingresa un nombre para el idioma")
      return
    }

    setAddingLocale(true)
    try {
      const config = await addTranslationLocale(code, label)
      setLocaleConfig(config)
      setSelectedLocale(code)
      setNewLocaleCode("")
      setNewLocaleLabel("")
      toast.success(`Idioma ${label} añadido`)
    } catch {
      toast.error("No se pudo añadir el idioma")
    } finally {
      setAddingLocale(false)
    }
  }

  async function handleRemoveLocale(code: string) {
    if (!confirm(`¿Eliminar el idioma ${code}? Se borrarán sus traducciones.`)) {
      return
    }

    try {
      const config = await removeTranslationLocale(code)
      setLocaleConfig(config)
      if (selectedLocale === code) {
        setSelectedLocale(config.locales[0]?.code ?? "en")
      }
      toast.success("Idioma eliminado")
    } catch {
      toast.error("No se pudo eliminar el idioma")
    }
  }

  const selectedLocaleLabel =
    localeConfig.locales.find((locale) => locale.code === selectedLocale)
      ?.label ?? selectedLocale

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
        Edita solo los textos traducibles. Imágenes, URLs y estructura siempre
        provienen del contenido español en la base de datos.
      </p>

      <div className="space-y-3 border rounded-lg p-4">
        <Label>Idioma a editar</Label>
        {localeConfig.locales.length > 0 ? (
          <Select value={selectedLocale} onValueChange={setSelectedLocale}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un idioma" />
            </SelectTrigger>
            <SelectContent>
              {localeConfig.locales.map((locale) => (
                <SelectItem key={locale.code} value={locale.code}>
                  {locale.label} ({locale.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-muted-foreground">
            No hay idiomas configurados. Añade uno abajo.
          </p>
        )}

        <div className="space-y-2 pt-2 border-t">
          <Label className="text-xs text-muted-foreground">
            Idiomas del sitio
          </Label>
          <ul className="space-y-1">
            {localeConfig.locales.map((locale) => (
              <li
                key={locale.code}
                className="flex items-center justify-between text-sm gap-2"
              >
                <span>
                  {locale.label}{" "}
                  <span className="text-muted-foreground">({locale.code})</span>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => void handleRemoveLocale(locale.code)}
                  aria-label={`Eliminar ${locale.label}`}
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Input
              value={newLocaleCode}
              onChange={(e) => setNewLocaleCode(e.target.value)}
              placeholder="Código (ej: fr)"
              maxLength={2}
            />
            <Input
              value={newLocaleLabel}
              onChange={(e) => setNewLocaleLabel(e.target.value)}
              placeholder="Nombre (ej: Français)"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void handleAddLocale()}
            disabled={addingLocale}
          >
            <Plus className="size-4 mr-1" />
            Añadir idioma
          </Button>
        </div>
      </div>

      {localeConfig.locales.length === 0 ? null : (
        <>
          <p className="text-xs text-muted-foreground">
            Editando: <strong>{selectedLocaleLabel}</strong>
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
            englishValue={translatedAt("loader.loadingText")}
            onSave={(value) => saveField("loader.loadingText", value)}
          />
          <TranslationField
            label="Mensaje WhatsApp predeterminado"
            spanishValue={content.whatsapp.defaultMessage}
            englishValue={translatedAt("whatsapp.defaultMessage")}
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
              englishValue={translatedAt(path)}
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
            englishValue={translatedAt("navbar.address")}
            onSave={(value) => saveField("navbar.address", value)}
          />
          <TranslationField
            label="Horario"
            spanishValue={content.navbar.hours}
            englishValue={translatedAt("navbar.hours")}
            onSave={(value) => saveField("navbar.hours", value)}
          />
          <TranslationField
            label="Botón reservar"
            spanishValue={content.navbar.reserveLabel}
            englishValue={translatedAt("navbar.reserveLabel")}
            onSave={(value) => saveField("navbar.reserveLabel", value)}
          />
          {content.navbar.navLinks.map((link, index) => (
            <TranslationField
              key={link.href}
              label={`Enlace: ${link.label}`}
              spanishValue={link.label}
              englishValue={translatedAt(`navbar.navLinks.${index}.label`)}
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
              englishValue={translatedAt(path)}
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
            englishValue={translatedAt("services.eyebrow")}
            onSave={(value) => saveField("services.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.services.title}
            englishValue={translatedAt("services.title")}
            onSave={(value) => saveField("services.title", value)}
          />
          <TranslationField
            label="Subtítulo"
            spanishValue={content.services.subtitle}
            englishValue={translatedAt("services.subtitle")}
            multiline
            onSave={(value) => saveField("services.subtitle", value)}
          />
          {content.services.items.map((item, index) => (
            <div key={item.id} className="space-y-3 border-t pt-4">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <TranslationField
                label="Título"
                spanishValue={item.title}
                englishValue={translatedAt(`services.items.${index}.title`)}
                onSave={(value) =>
                  saveField(`services.items.${index}.title`, value)
                }
              />
              <TranslationField
                label="Precio"
                spanishValue={item.priceLabel}
                englishValue={translatedAt(`services.items.${index}.priceLabel`)}
                onSave={(value) =>
                  saveField(`services.items.${index}.priceLabel`, value)
                }
              />
              <TranslationField
                label="Detalle de precio"
                spanishValue={item.priceDetail}
                englishValue={translatedAt(`services.items.${index}.priceDetail`)}
                onSave={(value) =>
                  saveField(`services.items.${index}.priceDetail`, value)
                }
              />
              <TranslationField
                label="Descripción"
                spanishValue={item.description}
                englishValue={translatedAt(`services.items.${index}.description`)}
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
            englishValue={translatedAt("experiences.eyebrow")}
            onSave={(value) => saveField("experiences.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.experiences.title}
            englishValue={translatedAt("experiences.title")}
            onSave={(value) => saveField("experiences.title", value)}
          />
          <TranslationField
            label="Subtítulo"
            spanishValue={content.experiences.subtitle}
            englishValue={translatedAt("experiences.subtitle")}
            multiline
            onSave={(value) => saveField("experiences.subtitle", value)}
          />
          {content.experiences.items.map((item, index) => (
            <div key={item.id} className="space-y-3 border-t pt-4">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <TranslationField
                label="Título"
                spanishValue={item.title}
                englishValue={translatedAt(`experiences.items.${index}.title`)}
                onSave={(value) =>
                  saveField(`experiences.items.${index}.title`, value)
                }
              />
              <TranslationField
                label="Descripción"
                spanishValue={item.description}
                englishValue={translatedAt(
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
              englishValue={translatedAt(path)}
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
            englishValue={translatedAt("testimonials.eyebrow")}
            onSave={(value) => saveField("testimonials.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.testimonials.title}
            englishValue={translatedAt("testimonials.title")}
            onSave={(value) => saveField("testimonials.title", value)}
          />
          <TranslationField
            label="Ver todas las reseñas"
            spanishValue={content.testimonials.viewAllLabel}
            englishValue={translatedAt("testimonials.viewAllLabel")}
            onSave={(value) => saveField("testimonials.viewAllLabel", value)}
          />
        </div>
      )}

      {activeSection === "faq" && (
        <div className="space-y-4">
          <TranslationField
            label="Eyebrow"
            spanishValue={content.faq.eyebrow}
            englishValue={translatedAt("faq.eyebrow")}
            onSave={(value) => saveField("faq.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.faq.title}
            englishValue={translatedAt("faq.title")}
            onSave={(value) => saveField("faq.title", value)}
          />
          {content.faq.items.map((item, index) => (
            <div key={item.id} className="space-y-3 border-t pt-4">
              <TranslationField
                label={`Pregunta: ${item.question}`}
                spanishValue={item.question}
                englishValue={translatedAt(`faq.items.${index}.question`)}
                onSave={(value) =>
                  saveField(`faq.items.${index}.question`, value)
                }
              />
              <TranslationField
                label="Respuesta"
                spanishValue={item.answer}
                englishValue={translatedAt(`faq.items.${index}.answer`)}
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
            englishValue={translatedAt("contact.eyebrow")}
            onSave={(value) => saveField("contact.eyebrow", value)}
          />
          <TranslationField
            label="Título"
            spanishValue={content.contact.title}
            englishValue={translatedAt("contact.title")}
            onSave={(value) => saveField("contact.title", value)}
          />
          <TranslationField
            label="Subtítulo"
            spanishValue={content.contact.subtitle}
            englishValue={translatedAt("contact.subtitle")}
            multiline
            onSave={(value) => saveField("contact.subtitle", value)}
          />
          <TranslationField
            label="Etiqueta redes"
            spanishValue={content.contact.socialLabel}
            englishValue={translatedAt("contact.socialLabel")}
            onSave={(value) => saveField("contact.socialLabel", value)}
          />
          {content.contact.contactInfo.map((info, index) => (
            <TranslationField
              key={info.id}
              label={`${info.label} (etiqueta)`}
              spanishValue={info.label}
              englishValue={translatedAt(`contact.contactInfo.${index}.label`)}
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
            englishValue={translatedAt("footer.description")}
            multiline
            onSave={(value) => saveField("footer.description", value)}
          />
          <TranslationField
            label="Título enlaces"
            spanishValue={content.footer.linksTitle}
            englishValue={translatedAt("footer.linksTitle")}
            onSave={(value) => saveField("footer.linksTitle", value)}
          />
          <TranslationField
            label="Título contacto"
            spanishValue={content.footer.contactTitle}
            englishValue={translatedAt("footer.contactTitle")}
            onSave={(value) => saveField("footer.contactTitle", value)}
          />
          {content.footer.navLinks.map((link, index) => (
            <TranslationField
              key={link.href}
              label={`Enlace: ${link.label}`}
              spanishValue={link.label}
              englishValue={translatedAt(`footer.navLinks.${index}.label`)}
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
                  englishValue={translatedAt(`${path}.title`)}
                  onSave={(value) => saveField(`${path}.title`, value)}
                />
                <TranslationField
                  label="Última actualización"
                  spanishValue={doc.lastUpdated}
                  englishValue={translatedAt(`${path}.lastUpdated`)}
                  onSave={(value) => saveField(`${path}.lastUpdated`, value)}
                />
                <TranslationField
                  label="Contenido HTML"
                  spanishValue={doc.content.slice(0, 120) + "..."}
                  englishValue={translatedAt(`${path}.content`)}
                  multiline={8}
                  onSave={(value) => saveField(`${path}.content`, value)}
                />
              </div>
            )
          })}
        </div>
      )}
        </>
      )}
    </div>
  )
}
