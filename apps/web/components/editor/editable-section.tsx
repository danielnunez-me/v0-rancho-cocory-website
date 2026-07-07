"use client"

import { useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SectionStyle } from "@rancho-cocory/shared"
import { cn } from "@/lib/utils"
import { useContent } from "@/components/content-provider"
import { useEditorMode } from "@/components/editor/editor-mode"
import { ImagePicker } from "@/components/editor/image-picker"

function sectionStyleToCss(style?: SectionStyle): CSSProperties {
  if (!style) return {}
  const css: CSSProperties = {}
  if (style.backgroundColor) css.backgroundColor = style.backgroundColor
  if (style.backgroundImage) {
    css.backgroundImage = `url(${style.backgroundImage})`
    css.backgroundSize = "cover"
    css.backgroundPosition = "center"
  }
  return css
}

export function EditableSection({
  sectionId,
  stylePath,
  style,
  className,
  children,
  linkedImagePath,
  linkedImage,
  editButtonClassName,
}: {
  sectionId: string
  stylePath: string
  style?: SectionStyle
  className?: string
  children: ReactNode
  linkedImagePath?: string
  linkedImage?: string
  editButtonClassName?: string
}) {
  const { isEditorMode } = useEditorMode()
  const { updateField } = useContent()
  const [open, setOpen] = useState(false)
  const [draftColor, setDraftColor] = useState(style?.backgroundColor ?? "")
  const [draftImage, setDraftImage] = useState(
    linkedImage ?? style?.backgroundImage ?? "",
  )

  const inlineStyle = useMemo(() => sectionStyleToCss(style), [style])

  function openEditor() {
    setDraftColor(style?.backgroundColor ?? "")
    setDraftImage(linkedImage ?? style?.backgroundImage ?? "")
    setOpen(true)
  }

  async function handleSave() {
    await updateField(stylePath, {
      backgroundColor: draftColor || undefined,
      backgroundImage: draftImage || undefined,
    })
    if (linkedImagePath && draftImage) {
      await updateField(linkedImagePath, draftImage)
    }
    setOpen(false)
  }

  return (
    <section
      id={sectionId}
      className={cn("relative", className)}
      style={inlineStyle}
    >
      {isEditorMode && (
        <button
          type="button"
          onClick={openEditor}
          className={cn(
            "absolute top-4 right-4 z-30 flex items-center gap-1.5 rounded-full bg-foreground/80 px-3 py-1.5 text-xs text-background shadow-lg hover:bg-foreground transition-colors",
            editButtonClassName,
          )}
        >
          <Paintbrush className="size-3.5" />
          Editar fondo
        </button>
      )}
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar fondo de sección</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Color de fondo</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={draftColor || "#ffffff"}
                  onChange={(e) => setDraftColor(e.target.value)}
                  className="h-10 w-14 p-1"
                />
                <Input
                  value={draftColor}
                  onChange={(e) => setDraftColor(e.target.value)}
                  placeholder="hsl(var(--card)) o #ffffff"
                />
              </div>
            </div>
            <ImagePicker
              label="Imagen de fondo"
              value={draftImage}
              onChange={setDraftImage}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => void handleSave()}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export { sectionStyleToCss }
