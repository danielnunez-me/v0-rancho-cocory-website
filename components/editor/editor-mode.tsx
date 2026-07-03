"use client"

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"
import { Pencil, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * NOTE: In a real application, `isEditorMode` would be derived from a secret
 * URL parameter instead of a hardcoded state. For example:
 *
 *   const searchParams = useSearchParams() // next/navigation
 *   const isEditorMode = searchParams.get("edit_key") === process.env.NEXT_PUBLIC_EDIT_KEY
 *
 * or with plain JS: new URLSearchParams(window.location.search).get("edit_key")
 */

interface EditorModeContextValue {
  isEditorMode: boolean
  setIsEditorMode: (value: boolean) => void
}

const EditorModeContext = createContext<EditorModeContextValue>({
  isEditorMode: false,
  setIsEditorMode: () => {},
})

export function useEditorMode() {
  return useContext(EditorModeContext)
}

export function EditorProvider({ children }: { children: ReactNode }) {
  // Simulated editor state — see the note above for real-world derivation.
  const [isEditorMode, setIsEditorMode] = useState(true)

  return (
    <EditorModeContext.Provider value={{ isEditorMode, setIsEditorMode }}>
      {children}
      <EditorFab />
    </EditorModeContext.Provider>
  )
}

/**
 * Floating action button (bottom-left) to toggle the editor mode.
 */
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
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isEditorMode && "ring-2 ring-primary ring-offset-2 ring-offset-background",
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
          Editar contenido
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/**
 * Inline pencil icon shown next to editable text (headings, prices, buttons).
 * Renders nothing when editor mode is off.
 */
export function EditPencil({ className }: { className?: string }) {
  const { isEditorMode } = useEditorMode()
  if (!isEditorMode) return null

  return (
    <Pencil
      className={cn(
        "ml-1.5 inline-block w-4 h-4 shrink-0 align-baseline opacity-60 text-inherit cursor-pointer hover:opacity-100 transition-opacity",
        className,
      )}
      aria-label="Editar este texto"
      role="button"
    />
  )
}

/**
 * Section-level "Add new item" button (e.g. "Añadir Nueva Actividad").
 * Renders nothing when editor mode is off.
 */
export function AddItemButton({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  const { isEditorMode } = useEditorMode()
  if (!isEditorMode) return null

  return (
    <div className={cn("flex justify-center mt-6", className)}>
      <Button size="sm" variant="outline" className="border-dashed border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-semibold bg-transparent">
        <Plus className="mr-1.5 w-4 h-4" aria-hidden="true" />
        {label}
      </Button>
    </div>
  )
}

/**
 * Per-item control cluster (edit + delete) for repeated list items like
 * activity cards. Position the parent as `relative`. Renders nothing when
 * editor mode is off.
 */
export function ItemControls({
  itemLabel,
  className,
}: {
  itemLabel: string
  className?: string
}) {
  const { isEditorMode } = useEditorMode()
  if (!isEditorMode) return null

  return (
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
      >
        <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`Eliminar ${itemLabel}`}
        className="flex size-7 items-center justify-center rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
