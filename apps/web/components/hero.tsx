"use client"

import Image from "next/image"
import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditableText, EditableImage } from "@/components/editor/editor-mode"
import { useContent } from "@/components/content-provider"

export function Hero() {
  const { content } = useContent()
  const { hero } = content

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt="Vista aerea del parque Rancho Cocory"
          fill
          className="object-cover"
          priority
          quality={75}
        />
        <EditableImage
          path="hero.backgroundImage"
          src={hero.backgroundImage}
          alt="Hero background"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/35 to-primary/10" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 pt-24 md:pt-28 pb-20 text-center max-w-3xl mx-auto">
        <h1 className="sr-only">Rancho Cocory</h1>

        <p className="text-lg md:text-2xl font-bold text-white/95 mb-3">
          <EditableText path="hero.tagline" value={hero.tagline} />
        </p>

        <p className="flex items-center justify-center gap-1.5 text-white/80 mb-8 text-sm md:text-base">
          <MapPin className="size-4 shrink-0" />
          <EditableText path="hero.location" value={hero.location} />
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full text-base px-8 py-6 font-bold shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="#actividades">
              <EditableText path="hero.ctaPrimary" value={hero.ctaPrimary} />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full text-base px-8 py-6 font-bold bg-white/15 text-white border-white/30 hover:bg-white/25 hover:text-white backdrop-blur-sm"
            asChild
          >
            <a href="#contacto">
              <EditableText path="hero.ctaSecondary" value={hero.ctaSecondary} />
            </a>
          </Button>
        </div>
      </div>

      <a
        href="#actividades"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce z-10"
        aria-label="Ir a actividades"
      >
        <ChevronDown className="size-8" />
      </a>
    </section>
  )
}
