import type { PageContent } from "../page-content"
import { buildWhatsAppUrl } from "../whatsapp"

const WHATSAPP_PHONE = "18299621367"
const WHATSAPP_MESSAGE =
  "Hi! I'm interested in booking at Rancho Cocory. Could you share rates and availability?"

const defaultMediaUrls = [
  "/images/hero-bg.jpg",
  "/images/pool.jpg",
  "/images/paintball.jpg",
  "/images/buggy.jpg",
  "/images/horseback.jpg",
  "/images/gallery-1.jpg",
  "/images/gallery-3.jpg",
  "/images/logo.png",
  "/loader-video.webm",
]

export const enPageContent: PageContent = {
  theme: {
    primary: "#29aae3",
    accent: "#f59e0b",
    foreground: "#1a1a2e",
    background: "#ffffff",
  },
  loader: {
    videoUrl: "/loader-video.webm",
    loadingText: "Loading...",
    progressGradientStart: "#7dd3fc",
    progressGradientEnd: "#38bdf8",
  },
  branding: {
    logoUrl: "/images/logo.png",
    faviconUrl: "/icon.svg",
    appleTouchIconUrl: "/images/logo.png",
  },
  seo: {
    title: "Rancho Cocory | Recreational Park in Higuey, Dominican Republic",
    description:
      "Rancho Cocory is the family recreational park in Higuey with pools, buggy excursions, horseback riding, paintball and much more. From RD$350 per adult.",
    openGraphTitle: "Rancho Cocory | Recreational Park in Higuey",
    openGraphDescription:
      "Family fun in Higuey. Pools, excursions, paintball and more.",
    openGraphImage: "/images/hero-bg.jpg",
    openGraphSiteName: "Rancho Cocory",
    openGraphUrl: "https://ranchococory.com",
    themeColor: "#29aae3",
  },
  whatsapp: {
    phone: WHATSAPP_PHONE,
    defaultMessage: WHATSAPP_MESSAGE,
  },
  mediaLibrary: defaultMediaUrls.map((url, index) => ({
    id: `media-${index + 1}`,
    url,
    name: url.split("/").pop() ?? url,
  })),
  legal: {
    privacyPolicy: {
      title: "Privacy Policy",
      lastUpdated: "February 2026",
      content: `<p>At Rancho Cocory, we are committed to protecting your privacy. This policy describes how we collect, use, and protect your personal information.</p>
<h3>Information we collect</h3>
<p>We may collect personal information when you contact us to make reservations, including your name, phone number, email address, and any additional information you voluntarily provide.</p>
<h3>Use of information</h3>
<p>We use your information exclusively to process your reservations, respond to your inquiries, send booking confirmations, and improve our services. We do not share your personal information with third parties without your consent.</p>
<h3>Data protection</h3>
<p>We implement reasonable security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
<h3>Contact</h3>
<p>If you have questions about this privacy policy, you can contact us at (829) 962-1367 or at ranchococory95@gmail.com.</p>`,
    },
    termsAndConditions: {
      title: "Terms and Conditions",
      lastUpdated: "February 2026",
      content: `<p>By visiting Rancho Cocory and using our facilities, you accept the following terms and conditions.</p>
<h3>Admission and access</h3>
<p>Entry to the park requires payment of the corresponding fee. Prices may vary depending on the day of the week and season. Children under a certain age may have reduced rates or free admission according to current policy.</p>
<h3>Park rules</h3>
<ul>
<li>Outside food or beverages are not allowed.</li>
<li>Appropriate attire is required in pool areas.</li>
<li>Minors must be accompanied by a responsible adult at all times.</li>
<li>Staff instructions must be followed in all activities.</li>
<li>Rancho Cocory is not responsible for lost or damaged items.</li>
</ul>
<h3>Activities and excursions</h3>
<p>Participation in activities such as paintball, buggy excursions, and horseback riding is at the participant's own risk. All participants must follow the safety instructions provided by instructors.</p>
<h3>Cancellations and reservations</h3>
<p>Reservations may be cancelled or modified with at least 24 hours notice. Contact our team for more details about our refund policy.</p>
<h3>Contact</h3>
<p>For any questions about these terms, contact us at (829) 962-1367 or at ranchococory95@gmail.com.</p>`,
    },
  },
  navbar: {
    address: "Autopista del Coral, Higuey, Dominican Republic",
    addressHref: "https://maps.app.goo.gl/3kFM8x6hnN7P3Xrc8",
    hours: "Mon - Sun: 9:00 AM - 6:00 PM",
    phone: "(829) 962-1367",
    phoneHref: "tel:+18299621367",
    whatsappHref: buildWhatsAppUrl(WHATSAPP_PHONE, WHATSAPP_MESSAGE),
    reserveLabel: "Book now",
    navLinks: [
      { label: "Home", href: "#inicio" },
      { label: "Activities", href: "#actividades" },
      { label: "Experiences", href: "#experiencias" },
      { label: "Gallery", href: "#galeria" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contacto" },
    ],
  },
  hero: {
    tagline: "Family fun in Higuey",
    location: "Autopista del Coral, Higuey, Dominican Republic",
    ctaPrimary: "Explore activities",
    ctaPrimaryHref: "#actividades",
    ctaSecondary: "Book now",
    ctaSecondaryHref: "#contacto",
    backgroundImage: "/images/hero-bg.jpg",
    style: {},
  },
  services: {
    eyebrow: "Our activities",
    title: "Admission and experiences",
    subtitle:
      "Discover everything Rancho Cocory has to offer. From a relaxing day pass to adrenaline-filled adventures.",
    style: {},
    items: [
      {
        id: "service-1",
        title: "Day Pass - General Admission",
        image: "/images/pool.jpg",
        priceLabel: "From RD$350",
        priceDetail:
          "per adult Monday-Friday. RD$450 Saturdays, Sundays and holidays.",
        description:
          "Enjoy a full day at our park with access to all common areas.",
        includes: [
          "Pools for adults and children",
          "Access to the lake and natural areas",
          "Games and children's playground",
          "Picnic areas",
          "Sports courts",
          "Common areas",
        ],
        whatsappMessage: `${WHATSAPP_MESSAGE} — Activity: Day Pass - General Admission`,
      },
      {
        id: "service-2",
        title: "Paintball",
        image: "/images/paintball.jpg",
        priceLabel: "From RD$250",
        priceDetail: "per person",
        description:
          "Experience the thrill of paintball on our tropical battlefield surrounded by nature.",
        includes: [
          "Full safety equipment",
          "Professional marker",
          "Ammunition included",
          "Dedicated instructor",
          "Rest area",
        ],
        whatsappMessage: `${WHATSAPP_MESSAGE} — Activity: Paintball`,
      },
      {
        id: "service-3",
        title: "Buggy Excursion",
        image: "/images/buggy.jpg",
        priceLabel: "From USD$60",
        priceDetail: "per adult",
        description:
          "Explore Higuey's tropical landscapes on an exciting off-road buggy adventure.",
        includes: [
          "Off-road buggy",
          "Tour guide",
          "Safety equipment",
          "Natural trail tour",
          "Photo stops",
        ],
        whatsappMessage: `${WHATSAPP_MESSAGE} — Activity: Buggy Excursion`,
      },
      {
        id: "service-4",
        title: "Horseback Excursion",
        image: "/images/horseback.jpg",
        priceLabel: "From USD$40",
        priceDetail: "per adult",
        description:
          "Ride through tropical trails on horseback and connect with Dominican nature.",
        includes: [
          "Trained horse",
          "Expert guide",
          "Trail ride",
          "Safety equipment",
          "Experience for all skill levels",
        ],
        whatsappMessage: `${WHATSAPP_MESSAGE} — Activity: Horseback Excursion`,
      },
    ],
  },
  experiences: {
    eyebrow: "What makes us special",
    title: "Experiences and amenities",
    subtitle:
      "Everything you need for a perfect family day, surrounded by Dominican tropical nature.",
    style: { backgroundColor: "hsl(var(--card))" },
    items: [
      {
        id: "exp-1",
        icon: "Waves",
        title: "Pools",
        description: "Pools for adults and children with rest areas.",
      },
      {
        id: "exp-2",
        icon: "TreePalm",
        title: "Lake and natural areas",
        description:
          "Green spaces and a beautiful lake surrounded by nature.",
      },
      {
        id: "exp-3",
        icon: "Gamepad2",
        title: "Games and playground",
        description:
          "Play area designed for the little ones' enjoyment.",
      },
      {
        id: "exp-4",
        icon: "Trophy",
        title: "Sports courts",
        description: "Courts for volleyball, basketball, and other sports.",
      },
      {
        id: "exp-5",
        icon: "Music",
        title: "Music and entertainment",
        description: "Lively atmosphere with music and recreational activities.",
      },
      {
        id: "exp-6",
        icon: "UtensilsCrossed",
        title: "Food and drinks",
        description:
          "On-site venues with typical Dominican food and beverages.",
      },
    ],
  },
  gallery: {
    eyebrow: "Our park",
    title: "Follow us on Instagram",
    subtitle:
      "See the latest photos and videos of the Rancho Cocory experience directly from our Instagram.",
    style: {},
    handle: "@ranchococory",
    profileBio: "Recreational Park · Higuey, DR",
    profileImage: "/images/logo.png",
    instagramUrl: "https://instagram.com/ranchococory",
    followLabel: "Follow on Instagram",
    elfsightAppId: "3f9c7761-e0fc-4572-951e-7561e3f31ded",
    fallbackPosts: [
      {
        id: "ig-fallback-1",
        image: "/images/pool.jpg",
        alt: "Rancho Cocory pools",
        likes: 342,
        comments: 28,
      },
      {
        id: "ig-fallback-2",
        image: "/images/buggy.jpg",
        alt: "Buggy excursion",
        likes: 517,
        comments: 45,
      },
      {
        id: "ig-fallback-3",
        image: "/images/gallery-1.jpg",
        alt: "Park green areas",
        likes: 289,
        comments: 19,
      },
      {
        id: "ig-fallback-4",
        image: "/images/horseback.jpg",
        alt: "Horseback riding",
        likes: 426,
        comments: 33,
      },
      {
        id: "ig-fallback-5",
        image: "/images/gallery-3.jpg",
        alt: "Family fun",
        likes: 398,
        comments: 41,
      },
      {
        id: "ig-fallback-6",
        image: "/images/paintball.jpg",
        alt: "Paintball field",
        likes: 275,
        comments: 22,
      },
    ],
  },
  testimonials: {
    eyebrow: "Our visitors",
    title: "What they say about us",
    style: {},
    googlePlaceId: "ChIJ6eHmZkhIqowRNY9WuTsX2289",
    googleReviewsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ6eHmZkhIqowRNY9WuTsX2289",
    viewAllLabel: "View all reviews on Google",
    minRating: 3,
    maxReviews: 6,
    fallbackReviews: [
      {
        id: "fallback-review-1",
        authorName: "Maria R.",
        rating: 5,
        text: "Excellent place to spend the day with family. The pools are very clean and the staff is very friendly. We will be back soon.",
        relativeTime: "2 months ago",
      },
      {
        id: "fallback-review-2",
        authorName: "Carlos M.",
        rating: 5,
        text: "We loved the buggy experience and the green areas. Highly recommended for tourists and locals alike.",
        relativeTime: "3 months ago",
      },
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "Everything you need to know",
    style: { backgroundColor: "hsl(var(--card))" },
    items: [
      {
        id: "faq-1",
        question: "What does general admission include?",
        answer:
          "General admission includes full access to pools for adults and children, the lake, natural areas, children's playground, sports courts, picnic areas, and all common areas of the park.",
      },
      {
        id: "faq-2",
        question: "Do excursions include food?",
        answer:
          "Buggy and horseback excursions do not include food, but you can purchase food and beverages at our on-site venues. The day pass also does not include food, but we have delicious typical Dominican food options inside the park.",
      },
      {
        id: "faq-3",
        question: "Are there special packages?",
        answer:
          "Yes, we offer special packages for groups, birthdays, corporate events, and celebrations. Contact us for personalized information about pricing and availability.",
      },
      {
        id: "faq-4",
        question: "Activities for young children?",
        answer:
          "We have a children's pool, playground, safe green areas, and recreation spaces designed especially for the youngest members of the family.",
      },
      {
        id: "faq-5",
        question: "What are the operating hours?",
        answer:
          "We are open every day from 9:00 AM to 6:00 PM. On weekends and holidays the park may extend its hours depending on demand.",
      },
      {
        id: "faq-6",
        question: "Can I bring my own food?",
        answer:
          "Outside food is not allowed in the park. However, we have a variety of on-site dining options at affordable prices with typical Dominican food.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact and reservations",
    title: "Plan your visit",
    subtitle:
      "Contact us to book your day, request information about special packages, or answer any questions.",
    socialLabel: "Follow us:",
    style: { backgroundColor: "hsl(var(--card))" },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4127.830709697052!2d-68.77664612480818!3d18.527819382567138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8b04866e6e1e9%3A0x6fdb173bb9568f35!2sRancho%20cocory!5e1!3m2!1sen!2sdo!4v1772148411008!5m2!1sen!2sdo",
    contactInfo: [
      {
        id: "contact-phone",
        icon: "phone",
        label: "Phone",
        value: "(829) 962-1367",
        href: "tel:+18299621367",
      },
      {
        id: "contact-email",
        icon: "mail",
        label: "Email",
        value: "ranchococory95@gmail.com",
        href: "mailto:ranchococory95@gmail.com",
      },
      {
        id: "contact-address",
        icon: "mapPin",
        label: "Address",
        value: "Autopista del Coral, Higuey, La Altagracia, Dominican Republic",
        href: "https://maps.app.goo.gl/3kFM8x6hnN7P3Xrc8",
      },
      {
        id: "contact-hours",
        icon: "clock",
        label: "Hours",
        value: "Every day: 9:00 AM - 5:40 PM",
      },
    ],
    socialLinks: [
      {
        id: "social-facebook",
        label: "Facebook",
        href: "https://facebook.com/ranchococory",
        platform: "facebook",
      },
      {
        id: "social-instagram",
        label: "Instagram",
        href: "https://instagram.com/ranchococory",
        platform: "instagram",
      },
      {
        id: "social-youtube",
        label: "YouTube",
        href: "https://youtube.com/@ranchococory",
        platform: "youtube",
      },
      {
        id: "social-tiktok",
        label: "TikTok",
        href: "https://tiktok.com/@ranchococory",
        platform: "tiktok",
      },
      {
        id: "social-tripadvisor",
        label: "TripAdvisor",
        href: "https://tripadvisor.com/",
        platform: "tripadvisor",
      },
    ],
  },
  footer: {
    description:
      "Family recreational park in Higuey, Dominican Republic. The best destination for a day full of fun and nature.",
    linksTitle: "Links",
    contactTitle: "Contact",
    addressLine1: "Autopista del Coral, Higuey",
    addressLine2: "La Altagracia, Dominican Republic",
    phone: "(829) 962-1367",
    phoneHref: "tel:+18299621367",
    email: "ranchococory95@gmail.com",
    emailHref: "mailto:ranchococory95@gmail.com",
    copyright: "© 2026 Rancho Cocory. Made with ❤️ by",
    creditName: "Daniel Nuñez",
    creditUrl: "https://danielnunez.me/",
    navLinks: [
      { label: "Home", href: "#inicio" },
      { label: "Activities", href: "#actividades" },
      { label: "Gallery", href: "#galeria" },
      { label: "Contact", href: "#contacto" },
    ],
  },
}
