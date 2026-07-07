"use client"

import Image from "next/image"
import { Instagram, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { EditableText } from "@/components/editor/editor-mode"
import { EditableSection } from "@/components/editor/editable-section"
import { useContent } from "@/components/content-provider"
import { useInstagramFeed } from "@/lib/hooks/use-instagram-feed"
import type { GalleryFallbackPost, InstagramPost } from "@rancho-cocory/shared"

function PostGrid({
  posts,
  instagramUrl,
}: {
  posts: Array<
    | InstagramPost
    | (GalleryFallbackPost & { mediaUrl?: string; permalink?: string })
  >
  instagramUrl: string
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
      {posts.map((post) => {
        const imageUrl =
          "mediaUrl" in post && post.mediaUrl
            ? post.mediaUrl
            : "image" in post
              ? post.image
              : "/placeholder.svg"
        const alt =
          "caption" in post && post.caption
            ? post.caption.slice(0, 80)
            : "alt" in post
              ? post.alt
              : "Instagram post"
        const likes = "likes" in post ? post.likes : 0
        const comments = "comments" in post ? post.comments : 0
        const href =
          "permalink" in post && post.permalink
            ? post.permalink
            : instagramUrl

        return (
          <a
            key={"id" in post ? post.id : imageUrl}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
              <span className="flex items-center gap-1.5 text-background font-bold text-sm">
                <Heart className="size-4 fill-current" aria-hidden="true" />
                {likes}
              </span>
              <span className="flex items-center gap-1.5 text-background font-bold text-sm">
                <MessageCircle className="size-4 fill-current" aria-hidden="true" />
                {comments}
              </span>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export function Gallery() {
  const { content } = useContent()
  const { gallery } = content
  const { posts: livePosts, isLoading } = useInstagramFeed(6)

  const displayPosts =
    livePosts.length > 0
      ? livePosts
      : gallery.fallbackPosts.map((p) => ({
          ...p,
          mediaUrl: p.image,
          permalink: p.permalink ?? gallery.instagramUrl,
        }))

  return (
    <EditableSection
      sectionId="galeria"
      stylePath="gallery.style"
      style={gallery.style}
      className="py-20 md:py-28 px-4"
    >
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
                  <EditableText path="gallery.profileBio" value={gallery.profileBio} />
                </p>
              </div>
            </a>
            <Instagram className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-none" />
              ))}
            </div>
          ) : (
            <PostGrid posts={displayPosts} instagramUrl={gallery.instagramUrl} />
          )}
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
              <EditableText path="gallery.followLabel" value={gallery.followLabel} />
            </a>
          </Button>
        </div>
      </div>
    </EditableSection>
  )
}
