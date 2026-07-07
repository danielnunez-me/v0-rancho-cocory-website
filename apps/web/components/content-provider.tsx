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
import type { Locale, PageContent } from "@rancho-cocory/shared"
import {
  defaultPageContent,
  enPageContent,
  getUiStrings,
} from "@rancho-cocory/shared"
import { getPageContent, updatePageContent } from "@/lib/cms-client"
import { toast } from "sonner"

function getFallbackContent(locale: Locale): PageContent {
  return locale === "en" ? enPageContent : defaultPageContent
}

interface ContentContextValue {
  content: PageContent
  locale: Locale
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
  locale: Locale
  initialContent?: PageContent
}) {
  const strings = getUiStrings(locale)
  const fallback = getFallbackContent(locale)

  const [content, setContent] = useState<PageContent>(
    initialContent ?? fallback,
  )
  const [isLoading, setIsLoading] = useState(!initialContent)

  const refreshContent = useCallback(async () => {
    try {
      const data = await getPageContent(locale)
      setContent(data)
    } catch {
      toast.error(strings.loadError)
    } finally {
      setIsLoading(false)
    }
  }, [locale, strings.loadError])

  useEffect(() => {
    if (!initialContent) {
      void refreshContent()
    }
  }, [initialContent, refreshContent])

  const updateField = useCallback(
    async (path: string, value: unknown) => {
      try {
        const updated = await updatePageContent(path, value)
        setContent(updated)
        toast.success(strings.saveSuccess)
      } catch {
        toast.error(strings.saveError)
        throw new Error("Save failed")
      }
    },
    [strings.saveError, strings.saveSuccess],
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
