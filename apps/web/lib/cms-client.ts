import type {
  GoogleReviewsResponse,
  InstagramPost,
  PageContent,
  SupportedLocale,
} from "@rancho-cocory/shared"
import { DEFAULT_LOCALE, LOCALE_PARAM } from "@rancho-cocory/shared"

const CMS_BASE = "/api/cms"

async function cmsFetch<T>(
  path: string,
  init?: RequestInit & { cache?: RequestCache },
): Promise<T> {
  const res = await fetch(`${CMS_BASE}${path}`, {
    ...init,
    cache: init?.cache ?? "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`CMS API error: ${res.status}`)
  }

  return res.json() as Promise<T>
}

export async function getPageContent(
  locale: SupportedLocale = DEFAULT_LOCALE,
  options?: { editKey?: string },
): Promise<PageContent> {
  if (typeof window === "undefined") {
    const { unstable_noStore } = await import("next/cache")
    unstable_noStore()

    if (options?.editKey || locale === "es") {
      const { getPageContent: loadContent } = await import(
        "@rancho-cocory/cms-server"
      )
      return loadContent()
    }

    const { getLocalizedPageContent } = await import("@rancho-cocory/cms-server")
    return getLocalizedPageContent(locale)
  }

  const params = new URLSearchParams({ _: String(Date.now()) })
  if (locale !== DEFAULT_LOCALE) {
    params.set(LOCALE_PARAM, locale)
  }
  if (options?.editKey) {
    params.set("edit_key", options.editKey)
  }

  return cmsFetch<PageContent>(`/content?${params.toString()}`)
}

export async function getLocaleTranslations(
  locale: SupportedLocale = "en",
): Promise<Partial<PageContent>> {
  return cmsFetch<Partial<PageContent>>(
    `/translations?${LOCALE_PARAM}=${encodeURIComponent(locale)}`,
  )
}

export async function updateLocaleTranslation(
  path: string,
  value: unknown,
  locale: SupportedLocale = "en",
): Promise<Partial<PageContent>> {
  return cmsFetch<Partial<PageContent>>("/translations", {
    method: "PATCH",
    body: JSON.stringify({ lang: locale, path, value }),
  })
}

export async function updatePageContent(
  path: string,
  value: unknown,
): Promise<PageContent> {
  return cmsFetch<PageContent>("/content", {
    method: "PATCH",
    body: JSON.stringify({ path, value }),
  })
}

export async function loginEditor(
  password: string,
  editKey: string,
): Promise<void> {
  await cmsFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ password, editKey }),
  })
}

export async function logoutEditor(): Promise<void> {
  await cmsFetch("/auth/logout", { method: "POST" })
}

export interface AuthStatus {
  hasValidEditKey: boolean
  isAuthenticated: boolean
  canEdit: boolean
  firebaseSynced?: boolean
}

export async function getAuthStatus(editKey?: string): Promise<AuthStatus> {
  const query = editKey ? `?edit_key=${encodeURIComponent(editKey)}` : ""
  return cmsFetch<AuthStatus>(`/auth/me${query}`)
}

export async function getInstagramFeed(limit = 6): Promise<{
  posts: InstagramPost[]
  source: string
}> {
  return cmsFetch(`/instagram/feed?limit=${limit}`)
}

export async function getGoogleReviews(): Promise<
  GoogleReviewsResponse & { source: string }
> {
  return cmsFetch("/google/reviews")
}

export async function uploadMediaFile(file: File): Promise<{
  url: string
  asset: { id: string; url: string; name: string }
}> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${CMS_BASE}/media`, {
    method: "POST",
    credentials: "include",
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status}`)
  }

  return res.json()
}

export async function deleteMediaAsset(id: string): Promise<PageContent> {
  const res = await fetch(`${CMS_BASE}/media?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Delete failed: ${res.status}`)
  }

  const data = (await res.json()) as { content: PageContent }
  return data.content
}
