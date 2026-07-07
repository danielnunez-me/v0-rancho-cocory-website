"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { EditableText } from "@/components/editor/editor-mode"
import { EditableSection } from "@/components/editor/editable-section"
import { useContent } from "@/components/content-provider"
import { useGoogleReviews } from "@/lib/hooks/use-google-reviews"

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`size-4 ${s <= rating ? "fill-accent text-accent" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  )
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function Testimonials() {
  const { content } = useContent()
  const { testimonials } = content
  const { data, isLoading } = useGoogleReviews()

  const rating = data.rating || 4.5
  const reviewCount = data.userRatingCount || 0
  const reviews = data.reviews.slice(0, 6)

  return (
    <EditableSection
      sectionId="testimonios"
      stylePath="testimonials.style"
      style={testimonials.style}
      className="pt-0 pb-20 md:pb-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            <EditableText path="testimonials.eyebrow" value={testimonials.eyebrow} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            <EditableText path="testimonials.title" value={testimonials.title} />
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <GoogleLogo className="size-5" />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-5 ${s <= Math.round(rating) ? "fill-accent text-accent" : "fill-accent/50 text-accent/50"}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm font-semibold">
              {rating.toFixed(1)} en Google Reviews
              {reviewCount > 0 && ` (${reviewCount})`}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((review, index) => (
              <article
                key={review.id}
                className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {review.profilePhotoUrl ? (
                      <Image
                        src={review.profilePhotoUrl}
                        alt={review.authorName}
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${index % 2 === 0 ? "bg-primary" : "bg-accent"} text-primary-foreground text-sm font-bold`}
                        aria-hidden="true"
                      >
                        {getInitials(review.authorName)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {review.authorName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.relativeTime}
                      </p>
                    </div>
                  </div>
                  <GoogleLogo className="size-4 shrink-0 mt-1" />
                </div>
                <ReviewStars rating={review.rating} />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Las reseñas de Google se mostrarán cuando configures GOOGLE_PLACES_API_KEY.
          </p>
        )}

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <a
              href={testimonials.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="size-5" />
              <EditableText
                path="testimonials.viewAllLabel"
                value={testimonials.viewAllLabel}
              />
            </a>
          </Button>
        </div>
      </div>
    </EditableSection>
  )
}
