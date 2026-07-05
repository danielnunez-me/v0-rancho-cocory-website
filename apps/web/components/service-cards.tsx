"use client"

import { useState } from "react"
import Image from "next/image"
import { Info } from "lucide-react"
import type { Service } from "@rancho-cocory/shared"
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
import {
  AddItemButton,
  EditableText,
  ItemControls,
  ItemEditDialog,
} from "@/components/editor/editor-mode"
import { useContent } from "@/components/content-provider"

function ServiceCard({
  service,
  index,
  onDelete,
}: {
  service: Service
  index: number
  onDelete: () => void
}) {
  const { updateField } = useContent()
  const [editOpen, setEditOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const basePath = `services.items.${index}`

  async function handleSave(values: Record<string, string>) {
    await updateField(basePath, {
      ...service,
      title: values.title,
      image: values.image,
      priceLabel: values.priceLabel,
      priceDetail: values.priceDetail,
      description: values.description,
      includes: values.includes
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    })
    setEditOpen(false)
  }

  return (
    <>
      <Card
        className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card cursor-pointer"
        onClick={() => setDetailOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setDetailOpen(true)
          }
        }}
        aria-label={`Ver detalles de ${service.title}`}
      >
        <div className="relative h-56 overflow-hidden">
          <ItemControls
            itemLabel={service.title}
            onEdit={() => setEditOpen(true)}
            onDelete={onDelete}
          />
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
              setDetailOpen(true)
            }}
          >
            <Info className="size-4" />
            Mas informacion
          </Button>
        </CardFooter>
      </Card>

      <ItemEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Editar actividad"
        fields={[
          { key: "title", label: "Título", value: service.title },
          { key: "image", label: "Imagen (URL)", value: service.image },
          { key: "priceLabel", label: "Precio", value: service.priceLabel },
          {
            key: "priceDetail",
            label: "Detalle de precio",
            value: service.priceDetail,
          },
          {
            key: "description",
            label: "Descripción",
            value: service.description,
            multiline: true,
          },
          {
            key: "includes",
            label: "Incluye (una por línea)",
            value: service.includes.join("\n"),
            multiline: true,
          },
        ]}
        onSave={handleSave}
      />

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
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
            <Button className="w-full rounded-full font-bold" asChild>
              <a
                href="https://wa.me/18299621367?text=Hola,%20quiero%20reservar%20en%20Rancho%20Cocory"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDetailOpen(false)}
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
  const { content, updateField } = useContent()
  const { services } = content
  const [adding, setAdding] = useState(false)

  async function handleAdd(values: Record<string, string>) {
    const newItem: Service = {
      id: `service-${Date.now()}`,
      title: values.title || "Nueva actividad",
      image: values.image || "/images/pool.jpg",
      priceLabel: values.priceLabel || "Desde RD$0",
      priceDetail: values.priceDetail || "",
      description: values.description || "",
      includes: values.includes
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    }
    await updateField("services.items", [...services.items, newItem])
    setAdding(false)
  }

  async function handleDelete(index: number) {
    await updateField(
      "services.items",
      services.items.filter((_, i) => i !== index),
    )
  }

  return (
    <section id="actividades" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            <EditableText path="services.eyebrow" value={services.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            <EditableText path="services.title" value={services.title} />
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            <EditableText
              path="services.subtitle"
              value={services.subtitle}
              multiline
            />
          </p>
          <AddItemButton
            label="Añadir Nueva Actividad"
            onAdd={() => setAdding(true)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.items.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onDelete={() => void handleDelete(index)}
            />
          ))}
        </div>
      </div>

      <ItemEditDialog
        open={adding}
        onOpenChange={setAdding}
        title="Nueva actividad"
        fields={[
          { key: "title", label: "Título", value: "" },
          { key: "image", label: "Imagen (URL)", value: "/images/pool.jpg" },
          { key: "priceLabel", label: "Precio", value: "Desde RD$0" },
          { key: "priceDetail", label: "Detalle de precio", value: "" },
          { key: "description", label: "Descripción", value: "", multiline: true },
          {
            key: "includes",
            label: "Incluye (una por línea)",
            value: "",
            multiline: true,
          },
        ]}
        onSave={handleAdd}
      />
    </section>
  )
}
