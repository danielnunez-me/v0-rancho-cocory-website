"use client"

import Image from "next/image"
import { MapPin, ChevronDown } from "lucide-react"
import { EditableText } from "@/components/editor/editor-mode"
import { EditableSection } from "@/components/editor/editable-section"
import { EditableCta } from "@/components/editor/editable-cta"
import { useContent } from "@/components/content-provider"

export function Hero() {
  const { content } = useContent()
  const { hero } = content

  return (
    <EditableSection
      sectionId="inicio"
      stylePath="hero.style"
      style={hero.style}
      linkedImagePath="hero.backgroundImage"
      linkedImage={hero.backgroundImage}
      editButtonClassName="top-20 md:top-24"
      className="relative isolate min-h-[100dvh] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 min-h-[100dvh]">
        <Image
          src={hero.backgroundImage}
          alt="Vista aerea del parque Rancho Cocory"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={75}
        />
      </div>

      <div
        className="absolute inset-0 z-[1] min-h-[100dvh] bg-gradient-to-t from-foreground/75 via-foreground/35 to-primary/10"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 pt-24 pb-20 text-center md:pt-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
          <h1 className="sr-only">Rancho Cocory</h1>

          <p className="mb-3 text-lg font-bold text-white/95 md:text-2xl">
            <EditableText path="hero.tagline" value={hero.tagline} />
          </p>

          <p className="mb-8 flex items-center justify-center gap-1.5 text-sm text-white/80 md:text-base">
            <MapPin className="size-4 shrink-0" />
            <EditableText path="hero.location" value={hero.location} />
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <EditableCta
              mode="link"
              label={hero.ctaPrimary}
              labelPath="hero.ctaPrimary"
              href={hero.ctaPrimaryHref}
              hrefPath="hero.ctaPrimaryHref"
              buttonSize="lg"
              buttonClassName="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground shadow-lg hover:bg-primary/90"
            />
            <EditableCta
              mode="link"
              label={hero.ctaSecondary}
              labelPath="hero.ctaSecondary"
              href={hero.ctaSecondaryHref}
              hrefPath="hero.ctaSecondaryHref"
              buttonSize="lg"
              buttonVariant="outline"
              buttonClassName="rounded-full border-white/30 bg-white/15 px-8 py-6 text-base font-bold text-white backdrop-blur-sm hover:bg-white/25 hover:text-white"
            />
          </div>
        </div>
      </div>

      <a
        href="#actividades"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white animate-bounce"
        aria-label="Ir a actividades"
      >
        <ChevronDown className="size-8" />
      </a>
    </EditableSection>
  )
}
