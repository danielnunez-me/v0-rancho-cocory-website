"use client"

import Image from "next/image"
import { LegalLinks } from "@/components/legal-modals"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image
                src="/images/logo.png"
                alt="Rancho Cocory"
                width={140}
                height={70}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              Parque recreativo familiar en Higuey, Republica Dominicana. El
              mejor destino para un dia lleno de diversión y naturaleza.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-background/80">
              Enlaces
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Actividades", href: "#actividades" },
                { label: "Galeria", href: "#galeria" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-background/80">
              Contacto
            </h3>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <p>Autopista del Coral, Higuey</p>
              <p>La Altagracia, Rep. Dominicana</p>
              <a
                href="tel:+18299621367"
                className="hover:text-background transition-colors"
              >
                (829) 962-1367
              </a>
              <a
                href="mailto:ranchococory95@gmail.com"
                className="hover:text-background transition-colors"
              >
                ranchococory95@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            {'© 2026 Rancho Cocory. Todos los derechos reservados.'}
          </p>
          <div className="flex gap-4">
            <LegalLinks />
          </div>
        </div>
      </div>
    </footer>
  )
}
