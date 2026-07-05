"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EditableText } from "@/components/editor/editor-mode"
import { useContent } from "@/components/content-provider"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Navbar() {
  const { content } = useContent()
  const { navbar } = content
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-primary text-primary-foreground text-sm">
        <div className="flex items-center gap-4">
          <a
            href={navbar.addressHref}
            className="flex items-center gap-1.5 hover:underline"
          >
            <MapPin className="size-3.5" />
            <EditableText path="navbar.address" value={navbar.address} />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 border-r border-primary-foreground/50 pr-4">
            <Clock className="size-3.5" />
            <EditableText path="navbar.hours" value={navbar.hours} />
          </span>
          <a
            href={navbar.phoneHref}
            className="flex items-center gap-1.5 hover:underline"
          >
            <Phone className="size-3.5" />
            <EditableText path="navbar.phone" value={navbar.phone} />
          </a>
        </div>
      </div>

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

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navbar.navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              <EditableText
                path={`navbar.navLinks.${index}.label`}
                value={link.label}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button className="rounded-full font-bold h-9 px-4 lg:h-11 lg:px-6" asChild>
            <a href={navbar.whatsappHref} target="_blank">
              <WhatsAppIcon className="size-4" />
              <EditableText path="navbar.reserveLabel" value={navbar.reserveLabel} />
            </a>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button size="sm" className="rounded-full font-bold h-9 px-3 text-xs" asChild>
            <a href={navbar.whatsappHref} target="_blank">
              <WhatsAppIcon className="size-4" />
              Reservar
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 border-t border-border/50" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4 bg-card">
          {navbar.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors py-2.5 px-3 rounded-lg hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
