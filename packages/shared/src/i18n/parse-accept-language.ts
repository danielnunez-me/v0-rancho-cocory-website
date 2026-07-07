import { normalizeLocaleTag } from "./config"

export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (!header) return []

  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const qParam = params.find((param) => param.trim().startsWith("q="))
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1

      return {
        tag: normalizeLocaleTag(tag),
        q: Number.isFinite(q) ? q : 0,
      }
    })
    .filter((entry) => entry.tag.length > 0 && entry.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.tag)
}
