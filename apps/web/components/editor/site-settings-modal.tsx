"use client"

import { useEffect, useState } from "react"
import { Settings } from "lucide-react"
import type { SocialLink } from "@rancho-cocory/shared"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { cn } from "@/lib/utils"
import { useContent } from "@/components/content-provider"
import { useEditorMode } from "@/components/editor/editor-mode"
import { ImagePicker } from "@/components/editor/image-picker"
import { TranslationEditor } from "@/components/editor/translation-editor"
import { Plus, Trash2 } from "lucide-react"

const TABS = [
  { id: "colors", label: "Colores" },
  { id: "brand", label: "Marca" },
  { id: "loader", label: "Carga" },
  { id: "seo", label: "SEO" },
  { id: "social", label: "Redes" },
  { id: "map", label: "Mapa" },
  { id: "legal", label: "Legal" },
  { id: "translations", label: "Traducciones" },
] as const

type TabId = (typeof TABS)[number]["id"]

let openSiteSettingsHandler: ((tab: TabId) => void) | null = null

export function openSiteSettings(tab: TabId = "colors") {
  openSiteSettingsHandler?.(tab)
}

export function SiteSettingsFab() {
  const { isEditorMode } = useEditorMode()
  const { content, updateField } = useContent()
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>("colors")

  useEffect(() => {
    openSiteSettingsHandler = (tab) => {
      setActiveTab(tab)
      setOpen(true)
    }
    return () => {
      openSiteSettingsHandler = null
    }
  }, [])

  if (!isEditorMode) return null

  async function updateSocialLinks(links: SocialLink[]) {
    await updateField("contact.socialLinks", links)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Configuración del sitio"
        className="fixed bottom-6 left-24 z-50 flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl border border-background/20 hover:scale-110 transition-transform"
      >
        <Settings className="size-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Configuración del sitio</DialogTitle>
          </DialogHeader>
          <div className="flex flex-1 min-h-0 flex-col sm:flex-row">
            <nav className="flex sm:flex-col gap-1 px-4 sm:px-2 pb-2 sm:pb-0 sm:w-40 shrink-0 overflow-x-auto sm:overflow-y-auto sm:border-r border-b sm:border-b-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "text-left text-sm px-3 py-2 rounded-md whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted text-muted-foreground",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
              {activeTab === "colors" && (
                <>
                  <p className="text-sm text-muted-foreground">Colores del tema</p>
                  <div className="grid grid-cols-2 gap-4">
                    {(
                      [
                        ["primary", "Primario"],
                        ["accent", "Acento"],
                        ["foreground", "Texto"],
                        ["background", "Fondo"],
                      ] as const
                    ).map(([key, label]) => (
                      <div key={key} className="space-y-2">
                        <Label>{label}</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={content.theme[key]}
                            onChange={(e) =>
                              void updateField(`theme.${key}`, e.target.value)
                            }
                            className="h-10 w-14 p-1"
                          />
                          <Input
                            value={content.theme[key]}
                            onChange={(e) =>
                              void updateField(`theme.${key}`, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <Label>Gradiente loader (inicio)</Label>
                      <Input
                        type="color"
                        value={content.loader.progressGradientStart}
                        onChange={(e) =>
                          void updateField(
                            "loader.progressGradientStart",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gradiente loader (fin)</Label>
                      <Input
                        type="color"
                        value={content.loader.progressGradientEnd}
                        onChange={(e) =>
                          void updateField(
                            "loader.progressGradientEnd",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "brand" && (
                <>
                  <ImagePicker
                    label="Logo"
                    value={content.branding.logoUrl}
                    onChange={(url) => void updateField("branding.logoUrl", url)}
                  />
                  <ImagePicker
                    label="Favicon"
                    value={content.branding.faviconUrl}
                    onChange={(url) => void updateField("branding.faviconUrl", url)}
                  />
                  <ImagePicker
                    label="Apple Touch Icon"
                    value={content.branding.appleTouchIconUrl ?? ""}
                    onChange={(url) =>
                      void updateField("branding.appleTouchIconUrl", url)
                    }
                  />
                </>
              )}

              {activeTab === "loader" && (
                <>
                  <div className="space-y-2">
                    <Label>Video del loader (URL)</Label>
                    <Input
                      value={content.loader.videoUrl}
                      onChange={(e) =>
                        void updateField("loader.videoUrl", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Texto de carga</Label>
                    <Input
                      value={content.loader.loadingText}
                      onChange={(e) =>
                        void updateField("loader.loadingText", e.target.value)
                      }
                    />
                  </div>
                </>
              )}

              {activeTab === "seo" && (
                <>
                  <div className="space-y-2">
                    <Label>Título del sitio</Label>
                    <Input
                      value={content.seo.title}
                      onChange={(e) =>
                        void updateField("seo.title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Descripción</Label>
                    <Textarea
                      value={content.seo.description}
                      onChange={(e) =>
                        void updateField("seo.description", e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OpenGraph título</Label>
                    <Input
                      value={content.seo.openGraphTitle}
                      onChange={(e) =>
                        void updateField("seo.openGraphTitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OpenGraph descripción</Label>
                    <Textarea
                      value={content.seo.openGraphDescription}
                      onChange={(e) =>
                        void updateField(
                          "seo.openGraphDescription",
                          e.target.value,
                        )
                      }
                      rows={2}
                    />
                  </div>
                  <ImagePicker
                    label="OpenGraph imagen"
                    value={content.seo.openGraphImage}
                    onChange={(url) =>
                      void updateField("seo.openGraphImage", url)
                    }
                  />
                  <div className="space-y-2">
                    <Label>OpenGraph site name (og:site_name)</Label>
                    <Input
                      value={content.seo.openGraphSiteName}
                      onChange={(e) =>
                        void updateField(
                          "seo.openGraphSiteName",
                          e.target.value,
                        )
                      }
                      placeholder="Rancho Cocory"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OpenGraph URL (og:url)</Label>
                    <Input
                      value={content.seo.openGraphUrl}
                      onChange={(e) =>
                        void updateField("seo.openGraphUrl", e.target.value)
                      }
                      placeholder="https://ranchococory.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Theme color</Label>
                    <Input
                      type="color"
                      value={content.seo.themeColor}
                      onChange={(e) =>
                        void updateField("seo.themeColor", e.target.value)
                      }
                    />
                  </div>
                </>
              )}

              {activeTab === "social" && (
                <SocialLinksEditor
                  links={content.contact.socialLinks}
                  onChange={(links) => void updateSocialLinks(links)}
                />
              )}

              {activeTab === "map" && (
                <div className="space-y-2">
                  <Label>URL embed del mapa (Google Maps iframe)</Label>
                  <Textarea
                    value={content.contact.mapEmbedUrl}
                    onChange={(e) =>
                      void updateField("contact.mapEmbedUrl", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              )}

              {activeTab === "legal" && (
                <>
                  <LegalDocEditor
                    title="Política de privacidad"
                    doc={content.legal.privacyPolicy}
                    onSave={(doc) =>
                      void updateField("legal.privacyPolicy", doc)
                    }
                  />
                  <LegalDocEditor
                    title="Términos y condiciones"
                    doc={content.legal.termsAndConditions}
                    onSave={(doc) =>
                      void updateField("legal.termsAndConditions", doc)
                    }
                  />
                </>
              )}

              {activeTab === "translations" && <TranslationEditor />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function LegalDocEditor({
  title,
  doc,
  onSave,
}: {
  title: string
  doc: { title: string; lastUpdated: string; content: string }
  onSave: (doc: { title: string; lastUpdated: string; content: string }) => void
}) {
  const [draft, setDraft] = useState(doc)

  useEffect(() => setDraft(doc), [doc])

  return (
    <div className="space-y-3 border rounded-lg p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="space-y-2">
        <Label>Título del documento</Label>
        <Input
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Última actualización</Label>
        <Input
          value={draft.lastUpdated}
          onChange={(e) => setDraft({ ...draft, lastUpdated: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Contenido (HTML)</Label>
        <Textarea
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
          rows={8}
          className="font-mono text-sm"
        />
      </div>
      <Button size="sm" onClick={() => onSave(draft)}>
        Guardar {title.toLowerCase()}
      </Button>
    </div>
  )
}

function SocialLinksEditor({
  links,
  onChange,
}: {
  links: SocialLink[]
  onChange: (links: SocialLink[]) => void
}) {
  function updateLink(index: number, patch: Partial<SocialLink>) {
    const next = links.map((link, i) =>
      i === index ? { ...link, ...patch } : link,
    )
    onChange(next)
  }

  function addLink() {
    onChange([
      ...links,
      {
        id: `social-${Date.now()}`,
        label: "Nueva red",
        href: "https://",
        platform: "instagram",
      },
    ])
  }

  function removeLink(index: number) {
    onChange(links.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <div key={link.id} className="border rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{link.label}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeLink(index)}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          <Input
            value={link.label}
            onChange={(e) => updateLink(index, { label: e.target.value })}
            placeholder="Etiqueta"
          />
          <Input
            value={link.href}
            onChange={(e) => updateLink(index, { href: e.target.value })}
            placeholder="https://..."
          />
          <Select
            value={link.platform}
            onValueChange={(value) =>
              updateLink(index, {
                platform: value as SocialLink["platform"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(
                [
                  "facebook",
                  "instagram",
                  "youtube",
                  "tiktok",
                  "tripadvisor",
                ] as const
              ).map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addLink}>
        <Plus className="size-4 mr-1" />
        Añadir red social
      </Button>
    </div>
  )
}
