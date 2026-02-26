import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Que incluye la entrada general?",
    answer:
      "La entrada general incluye acceso completo a las piscinas para adultos y ninos, lago, areas naturales, juegos infantiles, canchas deportivas, areas de picnic y todas las zonas comunes del parque.",
  },
  {
    question: "Las excursiones incluyen comida?",
    answer:
      "Las excursiones de buggy y caballo no incluyen comida, pero puedes adquirir alimentos y bebidas en nuestros locales internos. El pasadia tampoco incluye comida, pero tenemos opciones deliciosas de comida tipica dominicana dentro del parque.",
  },
  {
    question: "Hay paquetes especiales?",
    answer:
      "Si, ofrecemos paquetes especiales para grupos, cumpleanos, eventos corporativos y celebraciones. Contactanos para obtener informacion personalizada sobre precios y disponibilidad.",
  },
  {
    question: "Actividades para ninos pequenos?",
    answer:
      "Contamos con piscina infantil, parque de juegos, areas verdes seguras y espacios de recreacion disenados especialmente para los mas pequenos de la familia.",
  },
  {
    question: "Cual es el horario de operacion?",
    answer:
      "Estamos abiertos todos los dias de 9:00 AM a 6:00 PM. Los fines de semana y dias feriados el parque puede extender su horario dependiendo de la demanda.",
  },
  {
    question: "Puedo llevar mi propia comida?",
    answer:
      "No se permite el ingreso de comida externa al parque. Sin embargo, contamos con una variedad de opciones gastronomicas internas a precios accesibles con comida tipica dominicana.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            {'Todo lo que necesitas saber'}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-background rounded-xl px-5 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
