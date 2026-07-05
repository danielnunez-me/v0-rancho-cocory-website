import type {
  GoogleReviewsResponse,
  InstagramPost,
  PageContent,
} from "@rancho-cocory/shared"

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "/api/cms"
  }
  return process.env.CMS_API_URL ?? "http://localhost:3001"
}

async function cmsFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
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
