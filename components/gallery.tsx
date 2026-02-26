"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Familias disfrutando de la piscina" },
  { src: "/images/gallery-2.jpg", alt: "Lago natural rodeado de vegetacion" },
  { src: "/images/gallery-3.jpg", alt: "Area de juegos para ninos" },
  { src: "/images/gallery-4.jpg", alt: "Area de picnic con cabanas" },
  { src: "/images/gallery-5.jpg", alt: "Canchas deportivas" },
  { src: "/images/gallery-6.jpg", alt: "Area de comida y bebidas" },
]

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="galeria" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Nuestro parque
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            Galeria de fotos
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {'Conoce nuestras instalaciones y vive la experiencia Rancho Cocory.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setSelected(i)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Ver foto: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={() => setSelected(null)}
      >
        <DialogContent className="max-w-3xl p-0 bg-foreground/95 border-0 overflow-hidden">
          {selected !== null && (
            <div className="relative aspect-video">
              <Image
                src={galleryImages[selected].src}
                alt={galleryImages[selected].alt}
                fill
                className="object-contain"
              />
            </div>
          )}
          <DialogClose className="absolute top-3 right-3 bg-card/80 rounded-full p-1.5 hover:bg-card transition-colors">
            <X className="size-5 text-foreground" />
            <span className="sr-only">Cerrar</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  )
}
