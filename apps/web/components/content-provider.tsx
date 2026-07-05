"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { PageContent } from "@rancho-cocory/shared"
import { defaultPageContent } from "@rancho-cocory/shared"
import { getPageContent, updatePageContent } from "@/lib/cms-client"
import { toast } from "sonner"

interface ContentContextValue {
  content: PageContent
  isLoading: boolean
  updateField: (path: string, value: unknown) => Promise<void>
  refreshContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultPageContent,
  isLoading: true,
  updateField: async () => {},
  refreshContent: async () => {},
})

export function useContent() {
  return useContext(ContentContext)
}

export function ContentProvider({
  children,
  initialContent,
}: {
  children: ReactNode
  initialContent?: PageContent
}) {
  const [content, setContent] = useState<PageContent>(
    initialContent ?? defaultPageContent,
  )
  const [isLoading, setIsLoading] = useState(!initialContent)

  const refreshContent = useCallback(async () => {
    try {
      const data = await getPageContent()
      setContent(data)
    } catch {
      toast.error("No se pudo cargar el contenido")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!initialContent) {
      void refreshContent()
    }
  }, [initialContent, refreshContent])

  const updateField = useCallback(async (path: string, value: unknown) => {
    try {
      const updated = await updatePageContent(path, value)
      setContent(updated)
      toast.success("Contenido guardado")
    } catch {
      toast.error("Error al guardar")
      throw new Error("Save failed")
    }
  }, [])

  const themeStyles = useMemo(
    () =>
      ({
        "--primary": content.theme.primary,
        "--accent": content.theme.accent,
        "--foreground": content.theme.foreground,
        "--background": content.theme.background,
      }) as React.CSSProperties,
    [content.theme],
  )

  return (
    <ContentContext.Provider
      value={{ content, isLoading, updateField, refreshContent }}
    >
      <div style={themeStyles}>{children}</div>
    </ContentContext.Provider>
  )
}
