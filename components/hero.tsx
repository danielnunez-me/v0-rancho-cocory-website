import Image from "next/image"
import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Vista aerea del parque Rancho Cocory"
        fill
        className="object-cover"
        priority
        quality={75}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-32 pt-8">
        <h1 className="sr-only">Rancho Cocory</h1>

        <p className="text-lg md:text-2xl font-bold text-white/95 mb-3">
          {'Diversión familiar en Higüey'}
        </p>

        <p className="flex items-center justify-center gap-1.5 text-white/80 mb-8 text-sm md:text-base">
          <MapPin className="size-4 shrink-0" />
          {'Autopista del Coral, Higüey, República Dominicana'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full text-base px-8 py-6 font-bold shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="#actividades">Explorar actividades</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full text-base px-8 py-6 font-bold bg-white/15 text-white border-white/30 hover:bg-white/25 hover:text-white backdrop-blur-sm"
            asChild
          >
            <a href="#contacto">Reservar ahora</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#actividades"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="Ir a actividades"
      >
        <ChevronDown className="size-8" />
      </a>
    </section>
  )
}
