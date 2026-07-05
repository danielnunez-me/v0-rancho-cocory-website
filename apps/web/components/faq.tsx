"use client"

import { useState } from "react"
import type { FaqItem } from "@rancho-cocory/shared"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AddItemButton,
  EditableText,
  ItemControls,
  ItemEditDialog,
} from "@/components/editor/editor-mode"
import { useContent } from "@/components/content-provider"

function FaqCard({
  faq,
  index,
  onDelete,
}: {
  faq: FaqItem
  index: number
  onDelete: () => void
}) {
  const { updateField } = useContent()
  const [editOpen, setEditOpen] = useState(false)
  const basePath = `faq.items.${index}`

  async function handleSave(values: Record<string, string>) {
    await updateField(basePath, {
      ...faq,
      question: values.question,
      answer: values.answer,
    })
    setEditOpen(false)
  }

  return (
    <>
      <AccordionItem
        value={`item-${index}`}
        className="relative border-b-0 bg-background rounded-xl px-5 border border-border/50 hover:border-primary/30 transition-colors"
      >
        <ItemControls
          itemLabel={faq.question}
          className="top-1/2 -translate-y-1/2 left-auto -right-3"
          onEdit={() => setEditOpen(true)}
          onDelete={onDelete}
        />
        <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground leading-relaxed">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>

      <ItemEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Editar pregunta"
        fields={[
          { key: "question", label: "Pregunta", value: faq.question },
          {
            key: "answer",
            label: "Respuesta",
            value: faq.answer,
            multiline: true,
          },
        ]}
        onSave={handleSave}
      />
    </>
  )
}

export function FAQ() {
  const { content, updateField } = useContent()
  const { faq } = content
  const [adding, setAdding] = useState(false)

  async function handleAdd(values: Record<string, string>) {
    const newItem: FaqItem = {
      id: `faq-${Date.now()}`,
      question: values.question || "Nueva pregunta",
      answer: values.answer || "",
    }
    await updateField("faq.items", [...faq.items, newItem])
    setAdding(false)
  }

  async function handleDelete(index: number) {
    await updateField(
      "faq.items",
      faq.items.filter((_, i) => i !== index),
    )
  }

  return (
    <section id="faq" className="py-20 md:py-28 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            <EditableText path="faq.eyebrow" value={faq.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            <EditableText path="faq.title" value={faq.title} />
          </h2>
          <AddItemButton
            label="Añadir Nueva Pregunta"
            onAdd={() => setAdding(true)}
          />
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faq.items.map((item, index) => (
            <FaqCard
              key={item.id}
              faq={item}
              index={index}
              onDelete={() => void handleDelete(index)}
            />
          ))}
        </Accordion>
      </div>

      <ItemEditDialog
        open={adding}
        onOpenChange={setAdding}
        title="Nueva pregunta"
        fields={[
          { key: "question", label: "Pregunta", value: "" },
          { key: "answer", label: "Respuesta", value: "", multiline: true },
        ]}
        onSave={handleAdd}
      />
    </section>
  )
}
