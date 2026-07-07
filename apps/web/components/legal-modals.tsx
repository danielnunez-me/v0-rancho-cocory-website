"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { EditableHtml } from "@/components/editor/editable-html"
import { openSiteSettings } from "@/components/editor/site-settings-modal"
import { useContent } from "@/components/content-provider"
import { useEditorMode } from "@/components/editor/editor-mode"

export function PrivacyPolicyModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { content } = useContent()
  const doc = content.legal.privacyPolicy

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{doc.title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Ultima actualizacion:</strong>{" "}
          {doc.lastUpdated}
        </p>
        <EditableHtml
          path="legal.privacyPolicy.content"
          value={doc.content}
          className="text-sm text-muted-foreground leading-relaxed"
        />
        <DialogClose className="absolute top-3 right-3 rounded-full p-1.5 hover:bg-muted transition-colors">
          <X className="size-4 text-muted-foreground" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function TermsConditionsModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { content } = useContent()
  const doc = content.legal.termsAndConditions

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{doc.title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Ultima actualizacion:</strong>{" "}
          {doc.lastUpdated}
        </p>
        <EditableHtml
          path="legal.termsAndConditions.content"
          value={doc.content}
          className="text-sm text-muted-foreground leading-relaxed"
        />
        <DialogClose className="absolute top-3 right-3 rounded-full p-1.5 hover:bg-muted transition-colors">
          <X className="size-4 text-muted-foreground" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function LegalLinks() {
  const { isEditorMode } = useEditorMode()
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setPrivacyOpen(true)}
        className="text-xs text-background/40 hover:text-background/60 transition-colors cursor-pointer"
      >
        Politica de privacidad
      </button>
      <button
        onClick={() => setTermsOpen(true)}
        className="text-xs text-background/40 hover:text-background/60 transition-colors cursor-pointer"
      >
        Terminos y condiciones
      </button>
      {isEditorMode && (
        <button
          onClick={() => openSiteSettings("legal")}
          className="text-xs text-primary hover:underline cursor-pointer"
        >
          Editar legal
        </button>
      )}
      <PrivacyPolicyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <TermsConditionsModal open={termsOpen} onOpenChange={setTermsOpen} />
    </>
  )
}
