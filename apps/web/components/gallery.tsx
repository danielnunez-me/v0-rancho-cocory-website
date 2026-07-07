"use client"

import Image from "next/image"
import Script from "next/script"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditableText } from "@/components/editor/editor-mode"
import { EditableSection } from "@/components/editor/editable-section"
import { useContent } from "@/components/content-provider"
import { useEditorMode } from "@/components/editor/editor-mode"

export function Gallery() {
  const { content } = useContent()
  const { gallery } = content
  const { isEditorMode } = useEditorMode()

  return (
    <EditableSection
      sectionId="galeria"
      stylePath="gallery.style"
      style={gallery.style}
      className="py-20 md:py-28 px-4"
    >
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            <EditableText path="gallery.eyebrow" value={gallery.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            <EditableText path="gallery.title" value={gallery.title} />
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            <EditableText
              path="gallery.subtitle"
              value={gallery.subtitle}
              multiline
            />
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-border">
            <a
              href={gallery.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="rounded-full p-0.5 bg-primary">
                <div className="rounded-full bg-card p-0.5">
                  <Image
                    src={gallery.profileImage}
                    alt="Rancho Cocory en Instagram"
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-contain bg-secondary"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  <EditableText path="gallery.handle" value={gallery.handle} />
                </p>
                <p className="text-xs text-muted-foreground">
                  <EditableText
                    path="gallery.profileBio"
                    value={gallery.profileBio}
                  />
                </p>
              </div>
            </a>
            <Instagram
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
          </div>

          <div className="elfsight-feed-wrapper w-full min-h-[320px]">
            <div
              className={`elfsight-app-${gallery.elfsightAppId}`}
              data-elfsight-app-lazy
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href={gallery.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5" />
              <EditableText
                path="gallery.followLabel"
                value={gallery.followLabel}
              />
            </a>
          </Button>
        </div>

        {isEditorMode && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Widget Elfsight ID:{" "}
            <EditableText
              path="gallery.elfsightAppId"
              value={gallery.elfsightAppId}
            />
          </p>
        )}
      </div>
    </EditableSection>
  )
}
