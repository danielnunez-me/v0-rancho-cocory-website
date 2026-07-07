"use client"

import { useState } from "react"
import type { Experience } from "@rancho-cocory/shared"
import {
  AddItemButton,
  EditableText,
  ItemControls,
  ItemEditDialog,
} from "@/components/editor/editor-mode"
import { EditableSection } from "@/components/editor/editable-section"
import { useContent } from "@/components/content-provider"
import { getExperienceIcon } from "@/lib/icon-map"

function ExperienceCard({
  item,
  index,
  onDelete,
}: {
  item: Experience
  index: number
  onDelete: () => void
}) {
  const { updateField } = useContent()
  const [editOpen, setEditOpen] = useState(false)
  const Icon = getExperienceIcon(item.icon)
  const basePath = `experiences.items.${index}`

  async function handleSave(values: Record<string, string>) {
    await updateField(basePath, {
      ...item,
      icon: values.icon,
      title: values.title,
      description: values.description,
    })
    setEditOpen(false)
  }

  return (
    <>
      <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
        <ItemControls
          itemLabel={item.title}
          onEdit={() => setEditOpen(true)}
          onDelete={onDelete}
        />
        <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="size-7 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>

      <ItemEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Editar experiencia"
        fields={[
          {
            key: "icon",
            label: "Icono (Waves, TreePalm, Gamepad2, Trophy, Music, UtensilsCrossed)",
            value: item.icon,
          },
          { key: "title", label: "Título", value: item.title },
          {
            key: "description",
            label: "Descripción",
            value: item.description,
            multiline: true,
          },
        ]}
        onSave={handleSave}
      />
    </>
  )
}

export function Experiences() {
  const { content, updateField } = useContent()
  const { experiences } = content
  const [adding, setAdding] = useState(false)

  async function handleAdd(values: Record<string, string>) {
    const newItem: Experience = {
      id: `exp-${Date.now()}`,
      icon: values.icon || "Waves",
      title: values.title || "Nueva experiencia",
      description: values.description || "",
    }
    await updateField("experiences.items", [...experiences.items, newItem])
    setAdding(false)
  }

  async function handleDelete(index: number) {
    await updateField(
      "experiences.items",
      experiences.items.filter((_, i) => i !== index),
    )
  }

  return (
    <EditableSection
      sectionId="experiencias"
      stylePath="experiences.style"
      style={experiences.style}
      className="py-20 md:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            <EditableText path="experiences.eyebrow" value={experiences.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            <EditableText path="experiences.title" value={experiences.title} />
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            <EditableText
              path="experiences.subtitle"
              value={experiences.subtitle}
              multiline
            />
          </p>
          <AddItemButton
            label="Añadir Nueva Experiencia"
            onAdd={() => setAdding(true)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.items.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              onDelete={() => void handleDelete(index)}
            />
          ))}
        </div>
      </div>

      <ItemEditDialog
        open={adding}
        onOpenChange={setAdding}
        title="Nueva experiencia"
        fields={[
          { key: "icon", label: "Icono", value: "Waves" },
          { key: "title", label: "Título", value: "" },
          { key: "description", label: "Descripción", value: "", multiline: true },
        ]}
        onSave={handleAdd}
      />
    </EditableSection>
  )
}
