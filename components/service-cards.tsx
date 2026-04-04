"use client"

import Image from "next/image"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useState } from "react"

interface ServiceData {
  title: string
  image: string
  priceLabel: string
  priceDetail: string
  description: string
  includes: string[]
}

const services: ServiceData[] = [
  {
    title: "Pasadia - Entrada General",
    image: "/images/pool.jpg",
    priceLabel: "Desde RD$350",
    priceDetail: "por adulto lunes-viernes. RD$450 sabados, domingos y feriados.",
    description:
      "Disfruta de un dia completo en nuestro parque con acceso a todas las areas comunes.",
    includes: [
      "Piscinas para adultos y ninos",
      "Acceso al lago y areas naturales",
      "Juegos y parque para ninos",
      "Areas de picnic",
      "Canchas deportivas",
      "Zonas comunes",
    ],
  },
  {
    title: "Paintball",
    image: "/images/paintball.jpg",
    priceLabel: "Desde RD$250",
    priceDetail: "por persona",
    description:
      "Vive la emocion del paintball en nuestro campo de batalla tropical rodeado de naturaleza.",
    includes: [
      "Equipo completo de seguridad",
      "Marcadora profesional",
      "Municiones incluidas",
      "Instructor dedicado",
      "Area de descanso",
    ],
  },
  {
    title: "Excursion en Buggy",
    image: "/images/buggy.jpg",
    priceLabel: "Desde USD$60",
    priceDetail: "por adulto",
    description:
      "Explora los paisajes tropicales de Higuey en una emocionante aventura en buggy todo terreno.",
    includes: [
      "Buggy todo terreno",
      "Guia turistico",
      "Equipo de seguridad",
      "Recorrido por caminos naturales",
      "Paradas fotograficas",
    ],
  },
  {
    title: "Excursion a Caballo",
    image: "/images/horseback.jpg",
    priceLabel: "Desde USD$40",
    priceDetail: "por adulto",
    description:
      "Recorre los senderos tropicales a caballo y conecta con la naturaleza dominicana.",
    includes: [
      "Caballo entrenado",
      "Guia experto",
      "Recorrido por senderos",
      "Equipo de seguridad",
      "Experiencia para todos los niveles",
    ],
  },
]

function ServiceCard({ service }: { service: ServiceData }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen(true)
          }
        }}
        aria-label={`Ver detalles de ${service.title}`}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold shadow-md">
            {service.priceLabel}
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-foreground">
            {service.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {service.priceLabel} {service.priceDetail}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full rounded-full font-bold"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(true)
            }}
          >
            <Info className="size-4" />
            Mas informacion
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {service.title}
            </DialogTitle>
            <DialogDescription>{service.description}</DialogDescription>
          </DialogHeader>
          <div className="relative h-48 rounded-lg overflow-hidden my-2">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3">
            <p className="font-bold text-primary">
              {service.priceLabel}{" "}
              <span className="text-muted-foreground font-normal">
                {service.priceDetail}
              </span>
            </p>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Incluye:</h4>
              <ul className="space-y-1.5">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Button
              className="w-full rounded-full font-bold"
              asChild
            >
              <a
                href="https://wa.me/18299621367?text=Hola,%20quiero%20reservar%20en%20Rancho%20Cocory"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Reservar ahora
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function ServiceCards() {
  return (
    <section
      id="actividades"
      className="py-20 md:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Nuestras actividades
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            {'Entradas y experiencias'}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {'Descubre todo lo que Rancho Cocory tiene para ofrecer. Desde un relajante pasadia hasta aventuras llenas de adrenalina.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
