/** Text-only overlay for a locale. Never includes URLs, images, IDs, or structural data. */

export interface LocaleNavLinkStrings {
  label?: string
}

export interface LocaleServiceItemStrings {
  id?: string
  title?: string
  priceLabel?: string
  priceDetail?: string
  description?: string
  includes?: string[]
}

export interface LocaleExperienceItemStrings {
  id?: string
  title?: string
  description?: string
}

export interface LocaleGalleryPostStrings {
  id?: string
  alt?: string
}

export interface LocaleReviewStrings {
  id?: string
  text?: string
  relativeTime?: string
}

export interface LocaleFaqItemStrings {
  id?: string
  question?: string
  answer?: string
}

export interface LocaleContactInfoStrings {
  id?: string
  label?: string
  value?: string
}

export interface LocaleSocialLinkStrings {
  id?: string
  label?: string
}

export interface LocaleLegalDocStrings {
  title?: string
  lastUpdated?: string
  content?: string
}

export interface LocaleStrings {
  loader?: { loadingText?: string }
  seo?: {
    title?: string
    description?: string
    openGraphTitle?: string
    openGraphDescription?: string
    openGraphSiteName?: string
  }
  whatsapp?: { defaultMessage?: string }
  navbar?: {
    address?: string
    hours?: string
    reserveLabel?: string
    navLinks?: LocaleNavLinkStrings[]
  }
  hero?: {
    tagline?: string
    location?: string
    ctaPrimary?: string
    ctaSecondary?: string
  }
  services?: {
    eyebrow?: string
    title?: string
    subtitle?: string
    items?: LocaleServiceItemStrings[]
  }
  experiences?: {
    eyebrow?: string
    title?: string
    subtitle?: string
    items?: LocaleExperienceItemStrings[]
  }
  gallery?: {
    eyebrow?: string
    title?: string
    subtitle?: string
    profileBio?: string
    followLabel?: string
    fallbackPosts?: LocaleGalleryPostStrings[]
  }
  testimonials?: {
    eyebrow?: string
    title?: string
    viewAllLabel?: string
    fallbackReviews?: LocaleReviewStrings[]
  }
  faq?: {
    eyebrow?: string
    title?: string
    items?: LocaleFaqItemStrings[]
  }
  contact?: {
    eyebrow?: string
    title?: string
    subtitle?: string
    socialLabel?: string
    contactInfo?: LocaleContactInfoStrings[]
    socialLinks?: LocaleSocialLinkStrings[]
  }
  footer?: {
    description?: string
    linksTitle?: string
    contactTitle?: string
    addressLine1?: string
    addressLine2?: string
    copyright?: string
    creditName?: string
    navLinks?: LocaleNavLinkStrings[]
  }
  legal?: {
    privacyPolicy?: LocaleLegalDocStrings
    termsAndConditions?: LocaleLegalDocStrings
  }
}

export interface LocaleEntry {
  code: string
  label: string
}

export interface LocaleConfig {
  locales: LocaleEntry[]
}

export const DEFAULT_TRANSLATION_LOCALES: LocaleEntry[] = [
  { code: "en", label: "English" },
]

export function isValidLocaleCode(code: string): boolean {
  return /^[a-z]{2}$/.test(code)
}

function hasId(value: unknown): value is { id: string } {
  return typeof value === "object" && value !== null && "id" in value
}

export function findById<T extends { id?: string }>(
  items: T[] | undefined,
  id: string,
): T | undefined {
  return items?.find((item) => item.id === id)
}

export function findByIdOrIndex<T>(
  items: T[] | undefined,
  id: string | undefined,
  index: number,
): T | undefined {
  if (!items?.length) return undefined
  if (id) {
    const byId = items.find(
      (item) => hasId(item) && item.id === id,
    ) as T | undefined
    if (byId) return byId
  }
  return items[index]
}

/** overlay → static fallback → Spanish CMS */
export function pickString(
  spanish: string,
  overlay?: string,
  fallback?: string,
): string {
  if (overlay !== undefined && overlay !== "") return overlay
  if (fallback !== undefined && fallback !== "") return fallback
  return spanish
}

export function pickStringArray(
  spanish: string[],
  overlay?: string[],
  fallback?: string[],
): string[] {
  if (overlay !== undefined && overlay.length > 0) return overlay
  if (fallback !== undefined && fallback.length > 0) return fallback
  return spanish
}
