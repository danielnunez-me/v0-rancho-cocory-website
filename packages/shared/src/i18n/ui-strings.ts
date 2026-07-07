import type { Locale } from "./config"

export const uiStrings = {
  es: {
    loadError: "No se pudo cargar el contenido",
    saveSuccess: "Contenido guardado",
    saveError: "Error al guardar",
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
    loaderSrOnly: "Cargando Rancho Cocory",
  },
  en: {
    loadError: "Could not load content",
    saveSuccess: "Content saved",
    saveError: "Error saving",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    loaderSrOnly: "Loading Rancho Cocory",
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UiStrings = (typeof uiStrings)[Locale]

export function getUiStrings(locale: string): UiStrings {
  return uiStrings[locale as Locale] ?? uiStrings.es
}
