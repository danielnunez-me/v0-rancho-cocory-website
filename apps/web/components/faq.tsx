"use client"

import { useState, type ReactNode } from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import type { FaqItem } from "@rancho-cocory/shared"
import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import {
  AddItemButton,
  EditableText,
  ItemControls,
  ItemEditDialog,
} from "@/components/editor/editor-mode"
import { EditableSection } from "@/components/editor/editable-section"
import { useContent } from "@/components/content-provider"

function FaqAccordionItem({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: ReactNode
}) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className={cn("rounded-xl border border-border/50", className)}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

function FaqAccordionTrigger({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-semibold text-foreground transition-all outline-none hover:no-underline focus-visible:ring-[3px] focus-visible:ring-ring/50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function FaqAccordionContent({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
      <div className={cn("pb-4 text-muted-foreground leading-relaxed", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

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
      <FaqAccordionItem
        value={`item-${index}`}
        className="relative bg-background px-5 hover:border-primary/30 transition-colors"
      >
        <ItemControls
          itemLabel={faq.question}
          className="top-1/2 -translate-y-1/2 left-auto -right-3"
          onEdit={() => setEditOpen(true)}
          onDelete={onDelete}
        />
        <FaqAccordionTrigger>{faq.question}</FaqAccordionTrigger>
        <FaqAccordionContent>{faq.answer}</FaqAccordionContent>
      </FaqAccordionItem>

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
    <EditableSection
      sectionId="faq"
      stylePath="faq.style"
      style={faq.style}
      className="py-20 md:py-28 px-4"
    >
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
    </EditableSection>
  )
}
