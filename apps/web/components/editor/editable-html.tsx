"use client"

import { useEffect, useMemo, useState } from "react"
import DOMPurify from "isomorphic-dompurify"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useContent } from "@/components/content-provider"
import { useEditorMode } from "@/components/editor/editor-mode"

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: ["a", "strong", "p", "br", "ul", "ol", "li", "h3", "em"],
  ALLOWED_ATTR: ["href", "target", "rel"],
}

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, SANITIZE_CONFIG)
}

export function EditableHtml({
  path,
  value,
  className,
}: {
  path: string
  value: string
  className?: string
}) {
  const { isEditorMode } = useEditorMode()
  const { updateField } = useContent()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)

  useEffect(() => setDraft(value), [value, open])

  const sanitized = useMemo(() => sanitizeHtml(value), [value])

  return (
    <>
      <div
        className={cn("prose prose-sm max-w-none", className)}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
      {isEditorMode && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
        >
          <Pencil className="size-3" />
          Editar contenido
        </button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar contenido HTML</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Contenido (HTML permitido: p, a, strong, ul, li, h3)</Label>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={16}
              className="font-mono text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                void updateField(path, draft).then(() => setOpen(false))
              }}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
