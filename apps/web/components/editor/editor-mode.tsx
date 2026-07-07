"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useSearchParams } from "next/navigation"
import { Pencil, Palette, Plus, Trash2, X } from "lucide-react"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { toast } from "sonner"
import { getAuthStatus, loginEditor } from "@/lib/cms-client"
import { useContent } from "@/components/content-provider"

interface EditorModeContextValue {
  isEditorMode: boolean
  canEdit: boolean
  setIsEditorMode: (value: boolean) => void
}

const EditorModeContext = createContext<EditorModeContextValue>({
  isEditorMode: false,
  canEdit: false,
  setIsEditorMode: () => {},
})

export function useEditorMode() {
  return useContext(EditorModeContext)
}

function EditorLoginDialog({
  open,
  editKey,
  onSuccess,
}: {
  open: boolean
  editKey: string
  onSuccess: () => void
}) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await loginEditor(password, editKey)
      onSuccess()
      setPassword("")
    } catch {
      setError("Contraseña incorrecta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Acceso de editor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="editor-password">Contraseña</Label>
            <Input
              id="editor-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading || !password}>
              {loading ? "Verificando..." : "Entrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditorFab() {
  const { isEditorMode, setIsEditorMode } = useEditorMode()

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setIsEditorMode(!isEditorMode)}
            aria-label="Editar contenido"
            aria-pressed={isEditorMode}
            className={cn(
              "fixed bottom-6 left-6 z-50 flex size-13 items-center justify-center rounded-full",
              "bg-foreground/80 text-background shadow-xl backdrop-blur-md border border-background/20",
              "transition-all duration-200 hover:scale-110 hover:bg-foreground",
              isEditorMode &&
                "ring-2 ring-primary ring-offset-2 ring-offset-background",
            )}
          >
            {isEditorMode ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Pencil className="size-5" aria-hidden="true" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {isEditorMode ? "Salir del modo edición" : "Editar contenido"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function ThemeEditorFab() {
  const { isEditorMode } = useEditorMode()
  const { content, updateField } = useContent()
  const [open, setOpen] = useState(false)

  if (!isEditorMode) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Editar colores"
        className="fixed bottom-6 left-24 z-50 flex size-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl border border-background/20 hover:scale-110 transition-transform"
      >
        <Palette className="size-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Colores del sitio</DialogTitle>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </>
  )
}

function EditorProviderInner({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const editKey = searchParams.get("edit_key") ?? ""
  const { refreshContent } = useContent()
  const [canEdit, setCanEdit] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isEditorMode, setIsEditorMode] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!editKey) {
      setCanEdit(false)
      setChecked(true)
      return
    }

    getAuthStatus(editKey)
      .then(async (status) => {
        if (status.firebaseSynced) {
          await refreshContent()
          toast.success("Contenido sincronizado con Firebase")
        }

        if (status.canEdit) {
          setCanEdit(true)
          setIsEditorMode(true)
        } else if (status.hasValidEditKey) {
          setShowLogin(true)
        }
      })
      .finally(() => setChecked(true))
  }, [editKey, refreshContent])

  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false)
    setCanEdit(true)
    setIsEditorMode(true)
  }, [])

  if (!checked) return <>{children}</>

  return (
    <EditorModeContext.Provider
      value={{ isEditorMode: canEdit && isEditorMode, canEdit, setIsEditorMode }}
    >
      {children}
      {canEdit && <EditorFab />}
      {canEdit && <ThemeEditorFab />}
      <EditorLoginDialog
        open={showLogin}
        editKey={editKey}
        onSuccess={handleLoginSuccess}
      />
    </EditorModeContext.Provider>
  )
}

export function EditorProvider({ children }: { children: ReactNode }) {
  return <EditorProviderInner>{children}</EditorProviderInner>
}

function TextEditDialog({
  open,
  onOpenChange,
  path,
  value,
  multiline,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  path: string
  value: string
  multiline?: boolean
}) {
  const { updateField } = useContent()
  const [draft, setDraft] = useState(value)

  useEffect(() => setDraft(value), [value, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar texto</DialogTitle>
        </DialogHeader>
        {multiline ? (
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
          />
        ) : (
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} />
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              void updateField(path, draft).then(() => onOpenChange(false))
            }}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function EditableText({
  path,
  value,
  multiline = false,
  className,
  children,
}: {
  path: string
  value: string
  multiline?: boolean
  className?: string
  children?: ReactNode
}) {
  const { isEditorMode } = useEditorMode()
  const [open, setOpen] = useState(false)

  return (
    <>
      <span className={className}>
        {children ?? value}
        {isEditorMode && (
          <Pencil
            className="ml-1.5 inline-block w-4 h-4 shrink-0 align-baseline opacity-60 cursor-pointer hover:opacity-100 transition-opacity"
            aria-label="Editar este texto"
            role="button"
            onClick={() => setOpen(true)}
          />
        )}
      </span>
      <TextEditDialog
        open={open}
        onOpenChange={setOpen}
        path={path}
        value={value}
        multiline={multiline}
      />
    </>
  )
}

export function EditPencil({
  path,
  value,
  multiline,
  className,
}: {
  path: string
  value: string
  multiline?: boolean
  className?: string
}) {
  const { isEditorMode } = useEditorMode()
  const [open, setOpen] = useState(false)

  if (!isEditorMode) return null

  return (
    <>
      <Pencil
        className={cn(
          "ml-1.5 inline-block w-4 h-4 shrink-0 align-baseline opacity-60 text-inherit cursor-pointer hover:opacity-100 transition-opacity",
          className,
        )}
        aria-label="Editar este texto"
        role="button"
        onClick={() => setOpen(true)}
      />
      <TextEditDialog
        open={open}
        onOpenChange={setOpen}
        path={path}
        value={value}
        multiline={multiline}
      />
    </>
  )
}

export function EditableImage({
  path,
  src,
  alt,
  className,
}: {
  path: string
  src: string
  alt: string
  className?: string
}) {
  const { isEditorMode } = useEditorMode()
  const { updateField } = useContent()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(src)

  useEffect(() => setDraft(src), [src])

  if (!isEditorMode) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "absolute top-2 right-2 z-20 rounded-full bg-foreground/80 p-2 text-background",
          className,
        )}
        aria-label={`Editar imagen: ${alt}`}
      >
        <Pencil className="size-4" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar imagen</DialogTitle>
          </DialogHeader>
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="/images/ejemplo.jpg"
          />
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

export function AddItemButton({
  label,
  className,
  onAdd,
}: {
  label: string
  className?: string
  onAdd?: () => void
}) {
  const { isEditorMode } = useEditorMode()
  if (!isEditorMode) return null

  return (
    <div className={cn("flex justify-center mt-6", className)}>
      <Button
        size="sm"
        variant="outline"
        className="border-dashed border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-semibold bg-transparent"
        onClick={onAdd}
      >
        <Plus className="mr-1.5 w-4 h-4" aria-hidden="true" />
        {label}
      </Button>
    </div>
  )
}

export function ItemControls({
  itemLabel,
  className,
  onEdit,
  onDelete,
}: {
  itemLabel: string
  className?: string
  onEdit?: () => void
  onDelete?: () => void
}) {
  const { isEditorMode } = useEditorMode()
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!isEditorMode) return null

  return (
    <>
      <div
        className={cn(
          "absolute top-2 left-2 z-20 flex items-center gap-0.5 rounded-lg",
          "bg-foreground/80 backdrop-blur-md border border-background/20 p-1 shadow-lg",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        role="toolbar"
        aria-label={`Controles de edición: ${itemLabel}`}
      >
        <button
          type="button"
          aria-label={`Editar ${itemLabel}`}
          className="flex size-7 items-center justify-center rounded-md text-background/80 hover:text-background hover:bg-background/15 transition-colors"
          onClick={onEdit}
        >
          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={`Eliminar ${itemLabel}`}
          className="flex size-7 items-center justify-center rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar {itemLabel}?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete?.()
                setConfirmDelete(false)
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function ItemEditDialog({
  open,
  onOpenChange,
  title,
  fields,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  fields: Array<{
    key: string
    label: string
    value: string
    multiline?: boolean
  }>
  onSave: (values: Record<string, string>) => void | Promise<void>
}) {
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    setValues(Object.fromEntries(fields.map((f) => [f.key, f.value])))
  }, [fields, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>
              {field.multiline ? (
                <Textarea
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  rows={4}
                />
              ) : (
                <Input
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => void onSave(values)}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
