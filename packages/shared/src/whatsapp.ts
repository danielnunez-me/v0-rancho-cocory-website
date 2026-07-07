export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "")
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${digits}?text=${encoded}`
}

export function parseWhatsAppUrl(href: string): {
  phone: string
  message: string
} | null {
  try {
    const url = new URL(href)
    if (!url.hostname.includes("wa.me") && !url.hostname.includes("whatsapp")) {
      return null
    }
    const phone = url.pathname.replace(/^\//, "").split("/")[0] ?? ""
    const message = url.searchParams.get("text") ?? ""
    return { phone, message: decodeURIComponent(message) }
  } catch {
    return null
  }
}
