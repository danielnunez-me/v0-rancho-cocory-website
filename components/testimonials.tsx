"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  EditPencil,
  AddItemButton,
  ItemControls,
} from "@/components/editor/editor-mode"

const reviews = [
  {
    name: "Maria Fernanda Castillo",
    initials: "MC",
    date: "Hace 2 semanas",
    rating: 5,
    text: "Excelente lugar para pasar el dia en familia. Las piscinas estan muy limpias y el personal es super amable. Los ninos disfrutaron muchisimo el paseo a caballo. ¡Volveremos pronto!",
    color: "bg-primary",
  },
  {
    name: "Jose Rodriguez",
    initials: "JR",
    date: "Hace 1 mes",
    rating: 5,
    text: "La excursion en buggy fue increible, los guias muy profesionales y las rutas hermosas. La comida criolla del restaurante esta deliciosa. 100% recomendado si visitas Higuey.",
    color: "bg-accent",
  },
  {
    name: "Ana Lucia Perez",
    initials: "AP",
    date: "Hace 1 mes",
    rating: 5,
    text: "Celebramos el cumpleanos de mi hijo aqui y todo salio perfecto. Buenos precios, mucha seguridad y areas verdes espectaculares. El paintball fue el favorito de los adolescentes.",
    color: "bg-primary",
  },
  {
    name: "Carlos Martinez",
    initials: "CM",
    date: "Hace 2 meses",
    rating: 4,
    text: "Muy buen ambiente familiar y excelente atencion. El parque es grande y hay actividades para todas las edades. Solo recomiendo llegar temprano los fines de semana porque se llena rapido.",
    color: "bg-accent",
  },
  {
    name: "Yokasta Guerrero",
    initials: "YG",
    date: "Hace 2 meses",
    rating: 5,
    text: "Un paraiso escondido en Higuey. Pasamos un pasadia maravilloso con toda la familia. Las piscinas son amplias y el area de ninos esta muy bien cuidada. ¡Gracias Rancho Cocory!",
    color: "bg-primary",
  },
  {
    name: "Luis Alberto Santana",
    initials: "LS",
    date: "Hace 3 meses",
    rating: 5,
    text: "Fuimos en grupo de la iglesia y la pasamos genial. Precios accesibles, buena musica y el personal siempre pendiente de todo. El paseo a caballo por los senderos es una experiencia unica.",
    color: "bg-accent",
  },
]

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`size-4 ${s <= rating ? "fill-accent text-accent" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="pt-0 pb-20 md:pb-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Nuestros visitantes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            Lo que dicen de nosotros
            <EditPencil />
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <GoogleLogo className="size-5" />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-5 ${s <= 4 ? "fill-accent text-accent" : "fill-accent/50 text-accent/50"}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm font-semibold">
              4.5 en Google Reviews
              <EditPencil className="w-3.5 h-3.5" />
            </span>
          </div>
          <AddItemButton label="Añadir Nueva Reseña" />
        </div>

        {/* Google-style review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <ItemControls
                itemLabel={`reseña de ${review.name}`}
                className="top-auto -bottom-3 left-auto right-3"
              />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${review.color} text-primary-foreground text-sm font-bold`}
                    aria-hidden="true"
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <GoogleLogo className="size-4 shrink-0 mt-1" />
              </div>
              <ReviewStars rating={review.rating} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.text}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href="https://search.google.com/local/reviews?placeid=ChIJ6eHmZkhIqowRNY9WuTsX2289"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="size-5" />
              Ver todas las resenas en Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
