import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria G.",
    text: "Un lugar increible para pasar el dia en familia. Los ninos disfrutaron muchisimo de las piscinas y los juegos. Definitivamente volveremos!",
    rating: 5,
  },
  {
    name: "Carlos R.",
    text: "La excursion en buggy fue lo mejor! El recorrido por los caminos naturales es espectacular. Muy buena organizacion y atencion del personal.",
    rating: 5,
  },
  {
    name: "Ana M.",
    text: "Excelente lugar para celebrar cumpleanos. El ambiente es tropical y muy bonito. La comida estuvo deliciosa. Se lo recomiendo a todos!",
    rating: 4,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Nuestros visitantes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            Lo que dicen de nosotros
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
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
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-4 text-sm">
                {`"${t.text}"`}
              </p>
              <p className="font-bold text-foreground text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
