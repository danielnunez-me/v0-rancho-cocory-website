"use client"

import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import { buildWhatsAppUrl } from "@rancho-cocory/shared"
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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useContent } from "@/components/content-provider"
import { useEditorMode } from "@/components/editor/editor-mode"

type LinkCtaProps = {
  mode: "link"
  label: string
  labelPath: string
  href: string
  hrefPath: string
  buttonClassName?: string
  buttonSize?: "default" | "sm" | "lg" | "icon"
  buttonVariant?: "default" | "outline" | "ghost"
  children?: React.ReactNode
}

type WhatsAppCtaProps = {
  mode: "whatsapp"
  label: string
  labelPath: string
  phone: string
  message: string
  href: string
  buttonClassName?: string
  buttonSize?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

type EditableCtaProps = LinkCtaProps | WhatsAppCtaProps

export function EditableCta(props: EditableCtaProps) {
  const { isEditorMode } = useEditorMode()
  const { updateField } = useContent()
  const [open, setOpen] = useState(false)
  const [draftLabel, setDraftLabel] = useState(props.label)
  const [draftHref, setDraftHref] = useState(
    props.mode === "link" ? props.href : "",
  )
  const [draftPhone, setDraftPhone] = useState(
    props.mode === "whatsapp" ? props.phone : "",
  )
  const [draftMessage, setDraftMessage] = useState(
    props.mode === "whatsapp" ? props.message : "",
  )

  useEffect(() => {
    setDraftLabel(props.label)
    if (props.mode === "link") {
      setDraftHref(props.href)
    } else {
      setDraftPhone(props.phone)
      setDraftMessage(props.message)
    }
  }, [props, open])

  const {
    label,
    buttonClassName,
    buttonSize = "default",
    children,
  } = props

  const buttonVariant =
    props.mode === "link" ? (props.buttonVariant ?? "default") : "default"

  async function handleSave() {
    if (props.mode === "link") {
      await Promise.all([
        updateField(props.labelPath, draftLabel),
        updateField(props.hrefPath, draftHref),
      ])
    } else {
      const href = buildWhatsAppUrl(draftPhone, draftMessage)
      await Promise.all([
        updateField(props.labelPath, draftLabel),
        updateField("whatsapp", {
          phone: draftPhone,
          defaultMessage: draftMessage,
        }),
        updateField("navbar.whatsappHref", href),
      ])
    }
    setOpen(false)
  }

  const resolvedHref =
    props.mode === "whatsapp"
      ? buildWhatsAppUrl(props.phone, props.message)
      : props.href

  if (isEditorMode) {
    return (
      <>
        <div className="relative inline-flex">
          <Button
            type="button"
            size={buttonSize}
            variant={buttonVariant}
            className={cn("relative inline-flex items-center gap-2", buttonClassName)}
            onClick={() => setOpen(true)}
          >
            {children}
            {label}
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute -top-2 -right-2 z-10 flex size-6 items-center justify-center rounded-full bg-foreground text-background shadow-md hover:scale-110 transition-transform"
            aria-label="Editar botón"
          >
            <Pencil className="size-3" />
          </button>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {props.mode === "whatsapp"
                  ? "Editar botón de WhatsApp"
                  : "Editar botón"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Texto del botón</Label>
                <Input
                  value={draftLabel}
                  onChange={(e) => setDraftLabel(e.target.value)}
                />
              </div>
              {props.mode === "link" ? (
                <div className="space-y-2">
                  <Label>Enlace (URL o ancla)</Label>
                  <Input
                    value={draftHref}
                    onChange={(e) => setDraftHref(e.target.value)}
                    placeholder="#actividades"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Teléfono (solo dígitos)</Label>
                    <Input
                      value={draftPhone}
                      onChange={(e) => setDraftPhone(e.target.value)}
                      placeholder="18299621367"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mensaje de WhatsApp</Label>
                    <Textarea
                      value={draftMessage}
                      onChange={(e) => setDraftMessage(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground break-all">
                    Vista previa:{" "}
                    {buildWhatsAppUrl(draftPhone, draftMessage)}
                  </p>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => void handleSave()}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <Button
      size={buttonSize}
      variant={buttonVariant}
      className={cn("inline-flex items-center gap-2", buttonClassName)}
      asChild
    >
      <a
        href={resolvedHref}
        {...(props.mode === "whatsapp"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
        {label}
      </a>
    </Button>
  )
}
