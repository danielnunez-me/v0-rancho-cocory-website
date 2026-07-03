"use client"

import Image from "next/image"
import { Instagram, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  EditPencil,
  AddItemButton,
  ItemControls,
} from "@/components/editor/editor-mode"

const instagramPosts = [
  {
    image: "/images/pool.jpg",
    alt: "Piscinas de Rancho Cocory",
    likes: 342,
    comments: 28,
  },
  {
    image: "/images/buggy.jpg",
    alt: "Excursion en buggy",
    likes: 517,
    comments: 45,
  },
  {
    image: "/images/gallery-1.jpg",
    alt: "Areas verdes del parque",
    likes: 289,
    comments: 19,
  },
  {
    image: "/images/horseback.jpg",
    alt: "Paseo a caballo",
    likes: 426,
    comments: 33,
  },
  {
    image: "/images/gallery-3.jpg",
    alt: "Diversion familiar",
    likes: 398,
    comments: 41,
  },
  {
    image: "/images/paintball.jpg",
    alt: "Cancha de paintball",
    likes: 275,
    comments: 22,
  },
]

export function Gallery() {
  return (
    <section id="galeria" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Nuestro parque
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            Siguenos en Instagram
            <EditPencil />
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {'Mira las ultimas fotos y videos de la experiencia Rancho Cocory directamente desde nuestro Instagram.'}
            <EditPencil />
          </p>
          <AddItemButton label="Añadir Nueva Foto" />
        </div>

        {/* Instagram feed mockup */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          {/* Profile header */}
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border">
            <a
              href="https://instagram.com/ranchococory"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="rounded-full p-0.5 bg-primary">
                <div className="rounded-full bg-card p-0.5">
                  <Image
                    src="/images/logo.png"
                    alt="Rancho Cocory en Instagram"
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-contain bg-secondary"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  @ranchococory
                </p>
                <p className="text-xs text-muted-foreground">
                  Parque Recreativo · Higuey, RD
                </p>
              </div>
            </a>
            <Instagram className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
            {instagramPosts.map((post) => (
              <a
                key={post.image}
                href="https://instagram.com/ranchococory"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden"
              >
                <ItemControls itemLabel={post.alt} />
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay with likes/comments */}
                <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
                  <span className="flex items-center gap-1.5 text-background font-bold text-sm">
                    <Heart className="size-4 fill-current" aria-hidden="true" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-background font-bold text-sm">
                    <MessageCircle className="size-4 fill-current" aria-hidden="true" />
                    {post.comments}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href="https://instagram.com/ranchococory"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5" />
              Seguir en Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
