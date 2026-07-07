import { z } from "zod"

export const themeSchema = z.object({
  primary: z.string(),
  accent: z.string(),
  foreground: z.string(),
  background: z.string(),
})

export const loaderSchema = z.object({
  videoUrl: z.string(),
  loadingText: z.string(),
  progressGradientStart: z.string(),
  progressGradientEnd: z.string(),
})

export const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const navbarSchema = z.object({
  address: z.string(),
  addressHref: z.string(),
  hours: z.string(),
  phone: z.string(),
  phoneHref: z.string(),
  whatsappHref: z.string(),
  reserveLabel: z.string(),
  navLinks: z.array(navLinkSchema),
})

export const sectionStyleSchema = z.object({
  backgroundColor: z.string().optional(),
  backgroundImage: z.string().optional(),
})

export const heroSchema = z.object({
  tagline: z.string(),
  location: z.string(),
  ctaPrimary: z.string(),
  ctaSecondary: z.string(),
  backgroundImage: z.string(),
  style: sectionStyleSchema.optional(),
})

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  priceLabel: z.string(),
  priceDetail: z.string(),
  description: z.string(),
  includes: z.array(z.string()),
})

export const servicesSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  style: sectionStyleSchema.optional(),
  items: z.array(serviceSchema),
})

export const experienceSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
})

export const experiencesSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  style: sectionStyleSchema.optional(),
  items: z.array(experienceSchema),
})

export const galleryFallbackPostSchema = z.object({
  id: z.string(),
  image: z.string(),
  alt: z.string(),
  likes: z.number(),
  comments: z.number(),
  permalink: z.string().optional(),
})

export const gallerySectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  handle: z.string(),
  profileBio: z.string(),
  profileImage: z.string(),
  instagramUrl: z.string(),
  followLabel: z.string(),
  elfsightAppId: z.string(),
  style: sectionStyleSchema.optional(),
  fallbackPosts: z.array(galleryFallbackPostSchema),
})

export const testimonialsSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  googlePlaceId: z.string(),
  googleReviewsUrl: z.string(),
  viewAllLabel: z.string(),
  minRating: z.number(),
  maxReviews: z.number(),
  displayRating: z.number().optional(),
  ratingSummary: z.string().optional(),
  style: sectionStyleSchema.optional(),
})

export const faqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
})

export const faqSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  style: sectionStyleSchema.optional(),
  items: z.array(faqItemSchema),
})

export const contactInfoSchema = z.object({
  id: z.string(),
  icon: z.enum(["phone", "mail", "mapPin", "clock"]),
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
})

export const socialLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  platform: z.enum([
    "facebook",
    "instagram",
    "youtube",
    "tiktok",
    "tripadvisor",
  ]),
})

export const contactSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  socialLabel: z.string(),
  mapEmbedUrl: z.string(),
  style: sectionStyleSchema.optional(),
  contactInfo: z.array(contactInfoSchema),
  socialLinks: z.array(socialLinkSchema),
})

export const footerSchema = z.object({
  description: z.string(),
  linksTitle: z.string(),
  contactTitle: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  phone: z.string(),
  phoneHref: z.string(),
  email: z.string(),
  emailHref: z.string(),
  copyright: z.string(),
  creditName: z.string(),
  creditUrl: z.string(),
  navLinks: z.array(navLinkSchema),
})

export const siteBrandingSchema = z.object({
  logoUrl: z.string(),
  faviconUrl: z.string(),
  appleTouchIconUrl: z.string().optional(),
})

export const siteSeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  openGraphTitle: z.string(),
  openGraphDescription: z.string(),
  openGraphImage: z.string(),
  themeColor: z.string(),
})

export const whatsappSchema = z.object({
  phone: z.string(),
  defaultMessage: z.string(),
})

export const mediaAssetSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  createdAt: z.string().optional(),
})

export const legalDocumentSchema = z.object({
  title: z.string(),
  lastUpdated: z.string(),
  content: z.string(),
})

export const legalSchema = z.object({
  privacyPolicy: legalDocumentSchema,
  termsAndConditions: legalDocumentSchema,
})

export const pageContentSchema = z.object({
  theme: themeSchema,
  loader: loaderSchema,
  branding: siteBrandingSchema,
  seo: siteSeoSchema,
  whatsapp: whatsappSchema,
  mediaLibrary: z.array(mediaAssetSchema),
  legal: legalSchema,
  navbar: navbarSchema,
  hero: heroSchema,
  services: servicesSectionSchema,
  experiences: experiencesSectionSchema,
  gallery: gallerySectionSchema,
  testimonials: testimonialsSectionSchema,
  faq: faqSectionSchema,
  contact: contactSectionSchema,
  footer: footerSchema,
})

export type Theme = z.infer<typeof themeSchema>
export type Loader = z.infer<typeof loaderSchema>
export type NavLink = z.infer<typeof navLinkSchema>
export type Navbar = z.infer<typeof navbarSchema>
export type SectionStyle = z.infer<typeof sectionStyleSchema>
export type Hero = z.infer<typeof heroSchema>
export type Service = z.infer<typeof serviceSchema>
export type ServicesSection = z.infer<typeof servicesSectionSchema>
export type Experience = z.infer<typeof experienceSchema>
export type ExperiencesSection = z.infer<typeof experiencesSectionSchema>
export type GalleryFallbackPost = z.infer<typeof galleryFallbackPostSchema>
export type GallerySection = z.infer<typeof gallerySectionSchema>
export type TestimonialsSection = z.infer<typeof testimonialsSectionSchema>
export type FaqItem = z.infer<typeof faqItemSchema>
export type FaqSection = z.infer<typeof faqSectionSchema>
export type ContactInfo = z.infer<typeof contactInfoSchema>
export type SocialLink = z.infer<typeof socialLinkSchema>
export type ContactSection = z.infer<typeof contactSectionSchema>
export type Footer = z.infer<typeof footerSchema>
export type SiteBranding = z.infer<typeof siteBrandingSchema>
export type SiteSeo = z.infer<typeof siteSeoSchema>
export type WhatsappConfig = z.infer<typeof whatsappSchema>
export type MediaAsset = z.infer<typeof mediaAssetSchema>
export type LegalDocument = z.infer<typeof legalDocumentSchema>
export type Legal = z.infer<typeof legalSchema>
export type PageContent = z.infer<typeof pageContentSchema>

export const instagramPostSchema = z.object({
  id: z.string(),
  mediaType: z.enum(["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]),
  mediaUrl: z.string(),
  thumbnailUrl: z.string().optional(),
  permalink: z.string(),
  caption: z.string().optional(),
  likes: z.number(),
  comments: z.number(),
})

export type InstagramPost = z.infer<typeof instagramPostSchema>

export const googleReviewSchema = z.object({
  id: z.string(),
  authorName: z.string(),
  rating: z.number(),
  text: z.string(),
  relativeTime: z.string(),
  profilePhotoUrl: z.string().optional(),
  reviewUrl: z.string().optional(),
})

export type GoogleReview = z.infer<typeof googleReviewSchema>

export const googleReviewsResponseSchema = z.object({
  rating: z.number(),
  userRatingCount: z.number(),
  displayName: z.string(),
  reviews: z.array(googleReviewSchema),
})

export type GoogleReviewsResponse = z.infer<typeof googleReviewsResponseSchema>

export const contentPatchSchema = z.object({
  path: z.string(),
  value: z.unknown(),
})

export type ContentPatch = z.infer<typeof contentPatchSchema>

export { defaultPageContent } from "./default-content"
