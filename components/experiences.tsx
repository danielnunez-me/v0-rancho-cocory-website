import {
  Waves,
  TreePalm,
  Gamepad2,
  Trophy,
  Music,
  UtensilsCrossed,
} from "lucide-react"

const amenities = [
  {
    icon: Waves,
    title: "Piscinas",
    description: "Piscinas para adultos y ninos con areas de descanso.",
  },
  {
    icon: TreePalm,
    title: "Lago y areas naturales",
    description: "Espacios verdes y un hermoso lago rodeado de naturaleza.",
  },
  {
    icon: Gamepad2,
    title: "Juegos y parque infantil",
    description: "Area de juegos disenada para la diversion de los mas pequenos.",
  },
  {
    icon: Trophy,
    title: "Canchas deportivas",
    description: "Canchas para voleibol, baloncesto y otros deportes.",
  },
  {
    icon: Music,
    title: "Musica y entretenimiento",
    description: "Ambiente animado con musica y actividades recreativas.",
  },
  {
    icon: UtensilsCrossed,
    title: "Comida y bebidas",
    description: "Locales internos con comida tipica dominicana y bebidas.",
  },
]

export function Experiences() {
  return (
    <section
      id="experiencias"
      className="py-20 md:py-28 px-4 bg-card"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Lo que nos hace especiales
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            {'Experiencias y amenidades'}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {'Todo lo que necesitas para un dia perfecto en familia, rodeado de la naturaleza tropical dominicana.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="size-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
