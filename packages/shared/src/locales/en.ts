import type { PageContent } from "../page-content"

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
  navbar: {
    address: "Autopista del Coral, Higuey, Dominican Republic",
    addressHref: "https://maps.app.goo.gl/3kFM8x6hnN7P3Xrc8",
    hours: "Mon - Sun: 9:00 AM - 6:00 PM",
    phone: "(829) 962-1367",
    phoneHref: "tel:+18299621367",
    whatsappHref:
      "https://wa.me/18299621367?text=Hi!%20I%27m%20interested%20in%20booking%20at%20Rancho%20Cocory.%20Could%20you%20share%20rates%20and%20availability?",
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
    ctaSecondary: "Book now",
    backgroundImage: "/images/hero-bg.jpg",
  },
  services: {
    eyebrow: "Our activities",
    title: "Tickets and experiences",
    subtitle:
      "Discover everything Rancho Cocory has to offer. From a relaxing day pass to adrenaline-filled adventures.",
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
          "Lake and natural areas access",
          "Games and children's playground",
          "Picnic areas",
          "Sports courts",
          "Common areas",
        ],
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
      },
      {
        id: "service-3",
        title: "Buggy Tour",
        image: "/images/buggy.jpg",
        priceLabel: "From USD$60",
        priceDetail: "per adult",
        description:
          "Explore Higuey's tropical landscapes on an exciting off-road buggy adventure.",
        includes: [
          "Off-road buggy",
          "Tour guide",
          "Safety equipment",
          "Natural trail route",
          "Photo stops",
        ],
      },
      {
        id: "service-4",
        title: "Horseback Riding",
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
      },
    ],
  },
  experiences: {
    eyebrow: "What makes us special",
    title: "Experiences and amenities",
    subtitle:
      "Everything you need for a perfect family day, surrounded by Dominican tropical nature.",
    items: [
      {
        id: "exp-1",
        icon: "Waves",
        title: "Pools",
        description: "Pools for adults and children with lounge areas.",
      },
      {
        id: "exp-2",
        icon: "TreePalm",
        title: "Lake and natural areas",
        description: "Green spaces and a beautiful lake surrounded by nature.",
      },
      {
        id: "exp-3",
        icon: "Gamepad2",
        title: "Games and playground",
        description: "Play area designed for the little ones to have fun.",
      },
      {
        id: "exp-4",
        icon: "Trophy",
        title: "Sports courts",
        description: "Courts for volleyball, basketball and other sports.",
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
        description: "On-site venues with typical Dominican food and beverages.",
      },
    ],
  },
  gallery: {
    eyebrow: "Our park",
    title: "Follow us on Instagram",
    subtitle:
      "See the latest photos and videos of the Rancho Cocory experience directly from our Instagram.",
    handle: "@ranchococory",
    profileBio: "Recreation Park · Higuey, DR",
    profileImage: "/images/logo.png",
    instagramUrl: "https://instagram.com/ranchococory",
    followLabel: "Follow on Instagram",
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
        alt: "Buggy tour",
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
    googlePlaceId: "ChIJ6eHmZkhIqowRNY9WuTsX2289",
    googleReviewsUrl:
      "https://search.google.com/local/reviews?placeid=ChIJ6eHmZkhIqowRNY9WuTsX2289",
    viewAllLabel: "View all reviews on Google",
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "Everything you need to know",
    items: [
      {
        id: "faq-1",
        question: "What does general admission include?",
        answer:
          "General admission includes full access to pools for adults and children, the lake, natural areas, children's playground, sports courts, picnic areas and all common areas of the park.",
      },
      {
        id: "faq-2",
        question: "Do excursions include food?",
        answer:
          "Buggy and horseback tours do not include food, but you can purchase food and drinks at our on-site venues. The day pass also does not include food, but we have delicious typical Dominican food options inside the park.",
      },
      {
        id: "faq-3",
        question: "Are there special packages?",
        answer:
          "Yes, we offer special packages for groups, birthdays, corporate events and celebrations. Contact us for personalized pricing and availability information.",
      },
      {
        id: "faq-4",
        question: "Activities for young children?",
        answer:
          "We have a children's pool, playground, safe green areas and recreation spaces designed especially for the youngest members of the family.",
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
          "Outside food is not allowed in the park. However, we have a variety of affordable on-site dining options with typical Dominican cuisine.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact and reservations",
    title: "Plan your visit",
    subtitle:
      "Contact us to book your day, request information about special packages or answer any questions.",
    socialLabel: "Follow us:",
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
      "Family recreation park in Higuey, Dominican Republic. The best destination for a day full of fun and nature.",
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
