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
import type { PageContent, SupportedLocale } from "@rancho-cocory/shared"
import { defaultPageContent, getUiStrings } from "@rancho-cocory/shared"
import { getPageContent, updatePageContent } from "@/lib/cms-client"
import { toast } from "sonner"

interface ContentContextValue {
  content: PageContent
  locale: SupportedLocale
  isLoading: boolean
  updateField: (path: string, value: unknown) => Promise<void>
  refreshContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultPageContent,
  locale: "es",
  isLoading: true,
  updateField: async () => {},
  refreshContent: async () => {},
})

export function useContent() {
  return useContext(ContentContext)
}

export function ContentProvider({
  children,
  locale,
  initialContent,
}: {
  children: ReactNode
  locale: SupportedLocale
  initialContent?: PageContent
}) {
  const [content, setContent] = useState<PageContent>(
    initialContent ?? defaultPageContent,
  )
  const [isLoading, setIsLoading] = useState(!initialContent)
  const ui = useMemo(() => getUiStrings(locale), [locale])

  const refreshContent = useCallback(async () => {
    try {
      const data = await getPageContent(locale)
      setContent(data)
    } catch {
      toast.error(ui.toastLoadError)
    } finally {
      setIsLoading(false)
    }
  }, [locale, ui.toastLoadError])

  useEffect(() => {
    void refreshContent()
  }, [refreshContent])

  const updateField = useCallback(
    async (path: string, value: unknown) => {
      try {
        const updated = await updatePageContent(path, value)
        setContent(updated)
        toast.success(ui.toastSaveSuccess)
      } catch {
        toast.error(ui.toastSaveError)
        throw new Error("Save failed")
      }
    },
    [ui.toastSaveError, ui.toastSaveSuccess],
  )

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
      value={{ content, locale, isLoading, updateField, refreshContent }}
    >
      <div style={themeStyles}>{children}</div>
    </ContentContext.Provider>
  )
}
