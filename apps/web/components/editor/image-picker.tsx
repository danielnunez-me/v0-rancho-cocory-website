"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Loader2, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { useContent } from "@/components/content-provider"
import { deleteMediaAsset, uploadMediaFile } from "@/lib/cms-client"
import { toast } from "sonner"

export function ImagePicker({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (url: string) => void
  label?: string
}) {
  const { content, refreshContent } = useContent()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [manualUrl, setManualUrl] = useState(value)

  async function handleUpload(file: File) {
    setUploading(true)
    try {
      const result = await uploadMediaFile(file)
      await refreshContent()
      onChange(result.url)
      setManualUrl(result.url)
      toast.success("Imagen subida")
    } catch {
      toast.error("Error al subir imagen")
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMediaAsset(id)
      await refreshContent()
      toast.success("Imagen eliminada")
    } catch {
      toast.error("Error al eliminar imagen")
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      {value && (
        <div className="relative h-32 w-full rounded-lg overflow-hidden border">
          <Image src={value} alt="Seleccionada" fill className="object-cover" />
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          placeholder="/images/ejemplo.jpg"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange(manualUrl)}
        >
          Usar URL
        </Button>
      </div>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void handleUpload(file)
            e.target.value = ""
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="size-4 animate-spin mr-1" />
          ) : (
            <Upload className="size-4 mr-1" />
          )}
          Subir imagen
        </Button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
        {content.mediaLibrary.map((asset) => (
          <div
            key={asset.id}
            className={cn(
              "relative aspect-square rounded-md overflow-hidden border-2 cursor-pointer group",
              value === asset.url ? "border-primary" : "border-transparent",
            )}
            onClick={() => {
              onChange(asset.url)
              setManualUrl(asset.url)
            }}
          >
            <Image
              src={asset.url}
              alt={asset.name}
              fill
              className="object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 p-1 rounded bg-destructive/90 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                setDeleteId(asset.id)
              }}
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará de la biblioteca de medios.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && void handleDelete(deleteId)}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
