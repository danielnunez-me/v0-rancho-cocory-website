"use client"

import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
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
import { useContent } from "@/components/content-provider"
import { useEditorMode } from "@/components/editor/editor-mode"

export function EditableLink({
  hrefPath,
  textPath,
  href,
  value,
  className,
  target,
  rel,
  children,
}: {
  hrefPath: string
  textPath: string
  href: string
  value: string
  className?: string
  target?: string
  rel?: string
  children?: React.ReactNode
}) {
  const { isEditorMode } = useEditorMode()
  const { updateField } = useContent()
  const [open, setOpen] = useState(false)
  const [draftText, setDraftText] = useState(value)
  const [draftHref, setDraftHref] = useState(href)

  useEffect(() => {
    setDraftText(value)
    setDraftHref(href)
  }, [value, href, open])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isEditorMode) return
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
  }

  return (
    <>
      <a
        href={isEditorMode ? undefined : href}
        className={className}
        target={isEditorMode ? undefined : target}
        rel={isEditorMode ? undefined : rel}
        onClick={handleClick}
      >
        {children ?? value}
        {isEditorMode && (
          <Pencil
            className="ml-1.5 inline-block w-3.5 h-3.5 shrink-0 align-baseline opacity-60 cursor-pointer hover:opacity-100 transition-opacity"
            aria-hidden="true"
          />
        )}
      </a>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar enlace</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Texto</Label>
              <Input
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={draftHref}
                onChange={(e) => setDraftHref(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                void Promise.all([
                  updateField(textPath, draftText),
                  updateField(hrefPath, draftHref),
                ]).then(() => setOpen(false))
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
