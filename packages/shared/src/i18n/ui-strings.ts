import type { SupportedLocale } from "./config"

export interface UiStrings {
  toastLoadError: string
  toastSaveSuccess: string
  toastSaveError: string
  menuOpen: string
  menuClose: string
}

const uiStrings: Record<SupportedLocale, UiStrings> = {
  es: {
    toastLoadError: "No se pudo cargar el contenido",
    toastSaveSuccess: "Contenido guardado",
    toastSaveError: "Error al guardar",
    menuOpen: "Abrir menu",
    menuClose: "Cerrar menu",
  },
  en: {
    toastLoadError: "Could not load content",
    toastSaveSuccess: "Content saved",
    toastSaveError: "Error saving",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
}

export function getUiStrings(locale: SupportedLocale): UiStrings {
  return uiStrings[locale]
}
