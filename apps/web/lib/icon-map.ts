import {
  Gamepad2,
  Music,
  TreePalm,
  Trophy,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react"

export const experienceIconMap: Record<string, LucideIcon> = {
  Waves,
  TreePalm,
  Gamepad2,
  Trophy,
  Music,
  UtensilsCrossed,
}

export function getExperienceIcon(name: string): LucideIcon {
  return experienceIconMap[name] ?? Waves
}
