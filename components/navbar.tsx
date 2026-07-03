"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Actividades", href: "#actividades" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Galeria", href: "#galeria" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-primary text-primary-foreground text-sm">
        <div className="flex items-center gap-4">
          <a
            href="https://maps.app.goo.gl/3kFM8x6hnN7P3Xrc8"
            className="flex items-center gap-1.5 hover:underline"
          >
            <MapPin className="size-3.5" />
            Autopista del Coral, Higuey, Rep. Dominicana
          </a>
        </div>
        <a
          href="tel:+18299621367"
          className="flex items-center gap-1.5 hover:underline"
        >
          <Phone className="size-3.5" />
          (829) 962-1367
        </a>
      </div>

      {/* Main nav */}
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Rancho Cocory"
            width={160}
            height={80}
            className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-110 active:scale-110"
            priority
          />
        </a>

        {/* Desktop / tablet links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button className="rounded-full font-bold h-9 px-4 lg:h-11 lg:px-6" asChild>
            <a href="#contacto">Reservar ahora</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 border-t border-border/50" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4 bg-card">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors py-2.5 px-3 rounded-lg hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="mt-2 rounded-full font-bold" asChild>
            <a href="#contacto" onClick={() => setIsOpen(false)}>
              Reservar ahora
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
