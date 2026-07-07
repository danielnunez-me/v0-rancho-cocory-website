import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({
  rating,
  sizeClass = "size-5",
  className,
}: {
  rating: number
  sizeClass?: string
  className?: string
}) {
  return (
    <div
      className={cn("flex gap-0.5", className)}
      aria-label={`${rating.toFixed(1)} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercent = Math.max(0, Math.min(1, rating - star + 1)) * 100

        return (
          <span key={star} className="relative inline-flex">
            <Star className={cn(sizeClass, "fill-muted text-muted")} />
            {fillPercent > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star className={cn(sizeClass, "fill-accent text-accent")} />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
