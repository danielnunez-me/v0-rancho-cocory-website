/**
 * Parses Accept-Language header into ordered language tags (highest priority first).
 * Example: "en-US,en;q=0.9,es;q=0.8" → ["en", "en", "es"]
 */
export function parseAcceptLanguage(header: string): string[] {
  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const qParam = params.find((p) => p.trim().startsWith("q="))
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1
      const base = tag.split("-")[0]?.toLowerCase() ?? ""
      return { base, q }
    })
    .filter((entry) => entry.base.length > 0)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.base)
}
