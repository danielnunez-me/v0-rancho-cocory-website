import type {
  GoogleReviewsResponse,
  InstagramPost,
  PageContent,
} from "@rancho-cocory/shared"

const CMS_BASE = "/api/cms"

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${CMS_BASE}${path}`, {
    ...init,
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

export async function getPageContent(): Promise<PageContent> {
  if (typeof window === "undefined") {
    const { getPageContent: loadContent } = await import(
      "@rancho-cocory/cms-server"
    )
    return loadContent()
  }

  return cmsFetch<PageContent>("/content")
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
