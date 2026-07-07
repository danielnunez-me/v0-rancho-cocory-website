"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Info, Share2 } from "lucide-react"
import { buildWhatsAppUrl, LOCALE_PARAM } from "@rancho-cocory/shared"
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
import { EditableSection } from "@/components/editor/editable-section"
import { useContent } from "@/components/content-provider"
import { toast } from "sonner"

function ActivityShareButton({
  serviceId,
  title,
}: {
  serviceId: string
  title: string
}) {
  const searchParams = useSearchParams()

  function buildShareUrl() {
    const params = new URLSearchParams()
    params.set("actividad", serviceId)
    const lang = searchParams.get(LOCALE_PARAM)
    if (lang) {
      params.set(LOCALE_PARAM, lang)
    }
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }

  async function handleShare() {
    const url = buildShareUrl()
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success("Enlace copiado al portapapeles")
      }
    } catch {
      await navigator.clipboard.writeText(url)
      toast.success("Enlace copiado al portapapeles")
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="rounded-full"
      onClick={() => void handleShare()}
    >
      <Share2 className="size-4" />
      Compartir
    </Button>
  )
}

function ServiceCard({
  service,
  index,
  onDelete,
  forceOpen,
  onForceOpenHandled,
}: {
  service: Service
  index: number
  onDelete: () => void
  forceOpen?: boolean
  onForceOpenHandled?: () => void
}) {
  const { content, updateField } = useContent()
  const [editOpen, setEditOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const basePath = `services.items.${index}`

  useEffect(() => {
    if (forceOpen) {
      setDetailOpen(true)
      onForceOpenHandled?.()
    }
  }, [forceOpen, onForceOpenHandled])

  const whatsappMessage =
    service.whatsappMessage?.trim() ||
    `${content.whatsapp.defaultMessage} — Actividad: ${service.title}`
  const whatsappUrl = buildWhatsAppUrl(
    content.whatsapp.phone,
    whatsappMessage,
  )

  async function handleSave(values: Record<string, string>) {
    await updateField(basePath, {
      ...service,
      title: values.title,
      image: values.image,
      priceLabel: values.priceLabel,
      priceDetail: values.priceDetail,
      description: values.description,
      whatsappMessage: values.whatsappMessage,
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
          {
            key: "image",
            label: "Imagen",
            value: service.image,
            type: "image",
          },
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
          {
            key: "whatsappMessage",
            label: "Mensaje de WhatsApp (wa.me)",
            value:
              service.whatsappMessage ??
              `${content.whatsapp.defaultMessage} — Actividad: ${service.title}`,
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
          <div className="mt-4 flex gap-2">
            <Button className="flex-1 rounded-full font-bold" asChild>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDetailOpen(false)}
              >
                Reservar ahora
              </a>
            </Button>
            <ActivityShareButton serviceId={service.id} title={service.title} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function ServiceCards() {
  const { content, updateField } = useContent()
  const { services } = content
  const searchParams = useSearchParams()
  const [adding, setAdding] = useState(false)
  const [deepLinkId, setDeepLinkId] = useState<string | null>(null)

  useEffect(() => {
    const activityId = searchParams.get("actividad")
    if (!activityId) return

    const exists = services.items.some((s) => s.id === activityId)
    if (exists) {
      setDeepLinkId(activityId)
      requestAnimationFrame(() => {
        document
          .getElementById("actividades")
          ?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [searchParams, services.items])

  async function handleAdd(values: Record<string, string>) {
    const title = values.title || "Nueva actividad"
    const newItem: Service = {
      id: `service-${Date.now()}`,
      title,
      image: values.image || "/images/pool.jpg",
      priceLabel: values.priceLabel || "Desde RD$0",
      priceDetail: values.priceDetail || "",
      description: values.description || "",
      whatsappMessage:
        values.whatsappMessage ||
        `${content.whatsapp.defaultMessage} — Actividad: ${title}`,
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
    <EditableSection
      sectionId="actividades"
      stylePath="services.style"
      style={services.style}
      className="py-20 md:py-28 px-4"
    >
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

        <div className="grid gap-6 justify-center [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] max-w-5xl mx-auto">
          {services.items.map((service, index) => (
            <div key={service.id} className="w-full max-w-xs mx-auto">
            <ServiceCard
              service={service}
              index={index}
              onDelete={() => void handleDelete(index)}
              forceOpen={deepLinkId === service.id}
              onForceOpenHandled={() => setDeepLinkId(null)}
            />
            </div>
          ))}
        </div>
      </div>

      <ItemEditDialog
        open={adding}
        onOpenChange={setAdding}
        title="Nueva actividad"
        fields={[
          { key: "title", label: "Título", value: "" },
          {
            key: "image",
            label: "Imagen",
            value: "/images/pool.jpg",
            type: "image",
          },
          { key: "priceLabel", label: "Precio", value: "Desde RD$0" },
          { key: "priceDetail", label: "Detalle de precio", value: "" },
          { key: "description", label: "Descripción", value: "", multiline: true },
          {
            key: "includes",
            label: "Incluye (una por línea)",
            value: "",
            multiline: true,
          },
          {
            key: "whatsappMessage",
            label: "Mensaje de WhatsApp (wa.me)",
            value: `${content.whatsapp.defaultMessage} — Actividad: `,
            multiline: true,
          },
        ]}
        onSave={handleAdd}
      />
    </EditableSection>
  )
}
