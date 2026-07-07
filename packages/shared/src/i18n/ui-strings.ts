import type { Locale } from "./config"

export interface UiStrings {
  contentLoadError: string
  contentSaved: string
  contentSaveError: string
  openMenu: string
  closeMenu: string
}

const uiStrings: Record<Locale, UiStrings> = {
  es: {
    contentLoadError: "No se pudo cargar el contenido",
    contentSaved: "Contenido guardado",
    contentSaveError: "Error al guardar",
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
  },
  en: {
    contentLoadError: "Could not load content",
    contentSaved: "Content saved",
    contentSaveError: "Failed to save",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
}

export function getUiStrings(locale: Locale): UiStrings {
  return uiStrings[locale]
}
