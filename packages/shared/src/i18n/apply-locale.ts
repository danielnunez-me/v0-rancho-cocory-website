import type { PageContent } from "../page-content"
import { buildWhatsAppUrl } from "../whatsapp"
import {
  findByIdOrIndex,
  pickString,
  pickStringArray,
  type LocaleStrings,
} from "./locale-strings"

function localizeWhatsAppLinks(content: PageContent): PageContent {
  const { phone, defaultMessage } = content.whatsapp

  return {
    ...content,
    navbar: {
      ...content.navbar,
      whatsappHref: buildWhatsAppUrl(phone, defaultMessage),
    },
    services: {
      ...content.services,
      items: content.services.items.map((item) => ({
        ...item,
        whatsappMessage: `${defaultMessage} — Activity: ${item.title}`,
      })),
    },
  }
}

/**
 * Applies text-only translations onto Spanish canonical content.
 * Structure (images, URLs, hrefs, IDs) always comes from `base`.
 */
export function applyLocaleOverlay(
  base: PageContent,
  overlay: LocaleStrings | null | undefined,
  fallback: LocaleStrings,
): PageContent {
  const o = overlay ?? {}
  const f = fallback

  const result: PageContent = {
    ...base,
    loader: {
      ...base.loader,
      loadingText: pickString(
        base.loader.loadingText,
        o.loader?.loadingText,
        f.loader?.loadingText,
      ),
    },
    seo: {
      ...base.seo,
      title: pickString(base.seo.title, o.seo?.title, f.seo?.title),
      description: pickString(
        base.seo.description,
        o.seo?.description,
        f.seo?.description,
      ),
      openGraphTitle: pickString(
        base.seo.openGraphTitle,
        o.seo?.openGraphTitle,
        f.seo?.openGraphTitle,
      ),
      openGraphDescription: pickString(
        base.seo.openGraphDescription,
        o.seo?.openGraphDescription,
        f.seo?.openGraphDescription,
      ),
      openGraphSiteName: pickString(
        base.seo.openGraphSiteName,
        o.seo?.openGraphSiteName,
        f.seo?.openGraphSiteName,
      ),
    },
    whatsapp: {
      ...base.whatsapp,
      defaultMessage: pickString(
        base.whatsapp.defaultMessage,
        o.whatsapp?.defaultMessage,
        f.whatsapp?.defaultMessage,
      ),
    },
    navbar: {
      ...base.navbar,
      address: pickString(
        base.navbar.address,
        o.navbar?.address,
        f.navbar?.address,
      ),
      hours: pickString(base.navbar.hours, o.navbar?.hours, f.navbar?.hours),
      reserveLabel: pickString(
        base.navbar.reserveLabel,
        o.navbar?.reserveLabel,
        f.navbar?.reserveLabel,
      ),
      navLinks: base.navbar.navLinks.map((link, index) => ({
        ...link,
        label: pickString(
          link.label,
          o.navbar?.navLinks?.[index]?.label,
          f.navbar?.navLinks?.[index]?.label,
        ),
      })),
    },
    hero: {
      ...base.hero,
      tagline: pickString(base.hero.tagline, o.hero?.tagline, f.hero?.tagline),
      location: pickString(
        base.hero.location,
        o.hero?.location,
        f.hero?.location,
      ),
      ctaPrimary: pickString(
        base.hero.ctaPrimary,
        o.hero?.ctaPrimary,
        f.hero?.ctaPrimary,
      ),
      ctaSecondary: pickString(
        base.hero.ctaSecondary,
        o.hero?.ctaSecondary,
        f.hero?.ctaSecondary,
      ),
    },
    services: {
      ...base.services,
      eyebrow: pickString(
        base.services.eyebrow,
        o.services?.eyebrow,
        f.services?.eyebrow,
      ),
      title: pickString(
        base.services.title,
        o.services?.title,
        f.services?.title,
      ),
      subtitle: pickString(
        base.services.subtitle,
        o.services?.subtitle,
        f.services?.subtitle,
      ),
      items: base.services.items.map((item) => {
        const oItem = findByIdOrIndex(o.services?.items, item.id, -1)
        const fItem = findByIdOrIndex(f.services?.items, item.id, -1)
        return {
          ...item,
          title: pickString(item.title, oItem?.title, fItem?.title),
          priceLabel: pickString(
            item.priceLabel,
            oItem?.priceLabel,
            fItem?.priceLabel,
          ),
          priceDetail: pickString(
            item.priceDetail,
            oItem?.priceDetail,
            fItem?.priceDetail,
          ),
          description: pickString(
            item.description,
            oItem?.description,
            fItem?.description,
          ),
          includes: pickStringArray(
            item.includes,
            oItem?.includes,
            fItem?.includes,
          ),
        }
      }),
    },
    experiences: {
      ...base.experiences,
      eyebrow: pickString(
        base.experiences.eyebrow,
        o.experiences?.eyebrow,
        f.experiences?.eyebrow,
      ),
      title: pickString(
        base.experiences.title,
        o.experiences?.title,
        f.experiences?.title,
      ),
      subtitle: pickString(
        base.experiences.subtitle,
        o.experiences?.subtitle,
        f.experiences?.subtitle,
      ),
      items: base.experiences.items.map((item) => {
        const oItem = findByIdOrIndex(o.experiences?.items, item.id, -1)
        const fItem = findByIdOrIndex(f.experiences?.items, item.id, -1)
        return {
          ...item,
          title: pickString(item.title, oItem?.title, fItem?.title),
          description: pickString(
            item.description,
            oItem?.description,
            fItem?.description,
          ),
        }
      }),
    },
    gallery: {
      ...base.gallery,
      eyebrow: pickString(
        base.gallery.eyebrow,
        o.gallery?.eyebrow,
        f.gallery?.eyebrow,
      ),
      title: pickString(
        base.gallery.title,
        o.gallery?.title,
        f.gallery?.title,
      ),
      subtitle: pickString(
        base.gallery.subtitle,
        o.gallery?.subtitle,
        f.gallery?.subtitle,
      ),
      profileBio: pickString(
        base.gallery.profileBio,
        o.gallery?.profileBio,
        f.gallery?.profileBio,
      ),
      followLabel: pickString(
        base.gallery.followLabel,
        o.gallery?.followLabel,
        f.gallery?.followLabel,
      ),
      fallbackPosts: base.gallery.fallbackPosts.map((post) => {
        const oPost = findByIdOrIndex(o.gallery?.fallbackPosts, post.id, -1)
        const fPost = findByIdOrIndex(f.gallery?.fallbackPosts, post.id, -1)
        return {
          ...post,
          alt: pickString(post.alt, oPost?.alt, fPost?.alt),
        }
      }),
    },
    testimonials: {
      ...base.testimonials,
      eyebrow: pickString(
        base.testimonials.eyebrow,
        o.testimonials?.eyebrow,
        f.testimonials?.eyebrow,
      ),
      title: pickString(
        base.testimonials.title,
        o.testimonials?.title,
        f.testimonials?.title,
      ),
      viewAllLabel: pickString(
        base.testimonials.viewAllLabel,
        o.testimonials?.viewAllLabel,
        f.testimonials?.viewAllLabel,
      ),
      fallbackReviews: base.testimonials.fallbackReviews.map((review) => {
        const oReview = findByIdOrIndex(
          o.testimonials?.fallbackReviews,
          review.id,
          -1,
        )
        const fReview = findByIdOrIndex(
          f.testimonials?.fallbackReviews,
          review.id,
          -1,
        )
        return {
          ...review,
          text: pickString(review.text, oReview?.text, fReview?.text),
          relativeTime: pickString(
            review.relativeTime,
            oReview?.relativeTime,
            fReview?.relativeTime,
          ),
        }
      }),
    },
    faq: {
      ...base.faq,
      eyebrow: pickString(base.faq.eyebrow, o.faq?.eyebrow, f.faq?.eyebrow),
      title: pickString(base.faq.title, o.faq?.title, f.faq?.title),
      items: base.faq.items.map((item) => {
        const oItem = findByIdOrIndex(o.faq?.items, item.id, -1)
        const fItem = findByIdOrIndex(f.faq?.items, item.id, -1)
        return {
          ...item,
          question: pickString(item.question, oItem?.question, fItem?.question),
          answer: pickString(item.answer, oItem?.answer, fItem?.answer),
        }
      }),
    },
    contact: {
      ...base.contact,
      eyebrow: pickString(
        base.contact.eyebrow,
        o.contact?.eyebrow,
        f.contact?.eyebrow,
      ),
      title: pickString(
        base.contact.title,
        o.contact?.title,
        f.contact?.title,
      ),
      subtitle: pickString(
        base.contact.subtitle,
        o.contact?.subtitle,
        f.contact?.subtitle,
      ),
      socialLabel: pickString(
        base.contact.socialLabel,
        o.contact?.socialLabel,
        f.contact?.socialLabel,
      ),
      contactInfo: base.contact.contactInfo.map((info) => {
        const oInfo = findByIdOrIndex(o.contact?.contactInfo, info.id, -1)
        const fInfo = findByIdOrIndex(f.contact?.contactInfo, info.id, -1)
        return {
          ...info,
          label: pickString(info.label, oInfo?.label, fInfo?.label),
          value: pickString(info.value, oInfo?.value, fInfo?.value),
        }
      }),
      socialLinks: base.contact.socialLinks.map((link) => {
        const oLink = findByIdOrIndex(o.contact?.socialLinks, link.id, -1)
        const fLink = findByIdOrIndex(f.contact?.socialLinks, link.id, -1)
        return {
          ...link,
          label: pickString(link.label, oLink?.label, fLink?.label),
        }
      }),
    },
    footer: {
      ...base.footer,
      description: pickString(
        base.footer.description,
        o.footer?.description,
        f.footer?.description,
      ),
      linksTitle: pickString(
        base.footer.linksTitle,
        o.footer?.linksTitle,
        f.footer?.linksTitle,
      ),
      contactTitle: pickString(
        base.footer.contactTitle,
        o.footer?.contactTitle,
        f.footer?.contactTitle,
      ),
      addressLine1: pickString(
        base.footer.addressLine1,
        o.footer?.addressLine1,
        f.footer?.addressLine1,
      ),
      addressLine2: pickString(
        base.footer.addressLine2,
        o.footer?.addressLine2,
        f.footer?.addressLine2,
      ),
      copyright: pickString(
        base.footer.copyright,
        o.footer?.copyright,
        f.footer?.copyright,
      ),
      creditName: pickString(
        base.footer.creditName,
        o.footer?.creditName,
        f.footer?.creditName,
      ),
      navLinks: base.footer.navLinks.map((link, index) => ({
        ...link,
        label: pickString(
          link.label,
          o.footer?.navLinks?.[index]?.label,
          f.footer?.navLinks?.[index]?.label,
        ),
      })),
    },
    legal: {
      privacyPolicy: {
        ...base.legal.privacyPolicy,
        title: pickString(
          base.legal.privacyPolicy.title,
          o.legal?.privacyPolicy?.title,
          f.legal?.privacyPolicy?.title,
        ),
        lastUpdated: pickString(
          base.legal.privacyPolicy.lastUpdated,
          o.legal?.privacyPolicy?.lastUpdated,
          f.legal?.privacyPolicy?.lastUpdated,
        ),
        content: pickString(
          base.legal.privacyPolicy.content,
          o.legal?.privacyPolicy?.content,
          f.legal?.privacyPolicy?.content,
        ),
      },
      termsAndConditions: {
        ...base.legal.termsAndConditions,
        title: pickString(
          base.legal.termsAndConditions.title,
          o.legal?.termsAndConditions?.title,
          f.legal?.termsAndConditions?.title,
        ),
        lastUpdated: pickString(
          base.legal.termsAndConditions.lastUpdated,
          o.legal?.termsAndConditions?.lastUpdated,
          f.legal?.termsAndConditions?.lastUpdated,
        ),
        content: pickString(
          base.legal.termsAndConditions.content,
          o.legal?.termsAndConditions?.content,
          f.legal?.termsAndConditions?.content,
        ),
      },
    },
  }

  return localizeWhatsAppLinks(result)
}
