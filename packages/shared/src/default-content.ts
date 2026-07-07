import type { PageContent } from "./page-content"
import { buildWhatsAppUrl } from "./whatsapp"

const WHATSAPP_PHONE = "18299621367"
const WHATSAPP_MESSAGE =
  "¡Hola! Me interesa reservar en Rancho Cocory. ¿Me comparten tarifas y disponibilidad?"

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

export const defaultPageContent: PageContent = {
  theme: {
    primary: "#29aae3",
    accent: "#f59e0b",
    foreground: "#1a1a2e",
    background: "#ffffff",
  },
  loader: {
    videoUrl: "/loader-video.webm",
    loadingText: "Cargando...",
    progressGradientStart: "#7dd3fc",
    progressGradientEnd: "#38bdf8",
  },
  branding: {
    logoUrl: "/images/logo.png",
    faviconUrl: "/icon.svg",
    appleTouchIconUrl: "/images/logo.png",
  },
  seo: {
    title: "Rancho Cocory | Parque Recreativo en Higuey, Republica Dominicana",
    description:
      "Rancho Cocory es el parque recreativo familiar en Higuey con piscinas, excursiones en buggy, paseos a caballo, paintball y mucho mas. Desde RD$350 por adulto.",
    openGraphTitle: "Rancho Cocory | Parque Recreativo en Higuey",
    openGraphDescription:
      "Diversión familiar en Higuey. Piscinas, excursiones, paintball y mas.",
    openGraphImage: "/images/hero-bg.jpg",
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
      title: "Politica de Privacidad",
      lastUpdated: "Febrero 2026",
      content: `<p>En Rancho Cocory, nos comprometemos a proteger su privacidad. Esta politica describe como recopilamos, usamos y protegemos su informacion personal.</p>
<h3>Informacion que recopilamos</h3>
<p>Podemos recopilar informacion personal cuando usted nos contacta para hacer reservaciones, incluyendo su nombre, numero de telefono, correo electronico y cualquier informacion adicional que proporcione voluntariamente.</p>
<h3>Uso de la informacion</h3>
<p>Utilizamos su informacion exclusivamente para procesar sus reservaciones, responder a sus consultas, enviar confirmaciones de reserva y mejorar nuestros servicios. No compartimos su informacion personal con terceros sin su consentimiento.</p>
<h3>Proteccion de datos</h3>
<p>Implementamos medidas de seguridad razonables para proteger su informacion personal contra acceso no autorizado, alteracion, divulgacion o destruccion.</p>
<h3>Contacto</h3>
<p>Si tiene preguntas sobre esta politica de privacidad, puede contactarnos al (829) 962-1367 o al correo ranchococory95@gmail.com.</p>`,
    },
    termsAndConditions: {
      title: "Terminos y Condiciones",
      lastUpdated: "Febrero 2026",
      content: `<p>Al visitar Rancho Cocory y utilizar nuestras instalaciones, usted acepta los siguientes terminos y condiciones.</p>
<h3>Entrada y acceso</h3>
<p>La entrada al parque requiere el pago de la tarifa correspondiente. Los precios pueden variar segun el dia de la semana y temporada. Los ninos menores de cierta edad pueden tener tarifas reducidas o entrada gratuita segun la politica vigente.</p>
<h3>Reglas del parque</h3>
<ul>
<li>No se permite el ingreso de comida o bebidas externas.</li>
<li>Se requiere el uso de vestimenta adecuada en las areas de piscina.</li>
<li>Los menores de edad deben estar acompanados por un adulto responsable en todo momento.</li>
<li>Se deben respetar las instrucciones del personal en todas las actividades.</li>
<li>Rancho Cocory no se hace responsable por objetos perdidos o danados.</li>
</ul>
<h3>Actividades y excursiones</h3>
<p>La participacion en actividades como paintball, excursiones en buggy y paseos a caballo es bajo la responsabilidad del participante. Todos los participantes deben seguir las instrucciones de seguridad proporcionadas por los instructores.</p>
<h3>Cancelaciones y reservas</h3>
<p>Las reservaciones pueden ser canceladas o modificadas con al menos 24 horas de anticipacion. Consulte con nuestro equipo para mas detalles sobre nuestra politica de reembolsos.</p>
<h3>Contacto</h3>
<p>Para cualquier consulta sobre estos terminos, contactenos al (829) 962-1367 o al correo ranchococory95@gmail.com.</p>`,
    },
  },
  navbar: {
    address: "Autopista del Coral, Higuey, Rep. Dominicana",
    addressHref: "https://maps.app.goo.gl/3kFM8x6hnN7P3Xrc8",
    hours: "Lun - Dom: 9:00 AM - 6:00 PM",
    phone: "(829) 962-1367",
    phoneHref: "tel:+18299621367",
    whatsappHref: buildWhatsAppUrl(WHATSAPP_PHONE, WHATSAPP_MESSAGE),
    reserveLabel: "Reservar ahora",
    navLinks: [
      { label: "Inicio", href: "#inicio" },
      { label: "Actividades", href: "#actividades" },
      { label: "Experiencias", href: "#experiencias" },
      { label: "Galeria", href: "#galeria" },
      { label: "FAQ", href: "#faq" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  hero: {
    tagline: "Diversión familiar en Higüey",
    location: "Autopista del Coral, Higüey, República Dominicana",
    ctaPrimary: "Explorar actividades",
    ctaSecondary: "Reservar ahora",
    backgroundImage: "/images/hero-bg.jpg",
    style: {},
  },
  services: {
    eyebrow: "Nuestras actividades",
    title: "Entradas y experiencias",
    subtitle:
      "Descubre todo lo que Rancho Cocory tiene para ofrecer. Desde un relajante pasadia hasta aventuras llenas de adrenalina.",
    style: {},
    items: [
      {
        id: "service-1",
        title: "Pasadia - Entrada General",
        image: "/images/pool.jpg",
        priceLabel: "Desde RD$350",
        priceDetail:
          "por adulto lunes-viernes. RD$450 sabados, domingos y feriados.",
        description:
          "Disfruta de un dia completo en nuestro parque con acceso a todas las areas comunes.",
        includes: [
          "Piscinas para adultos y ninos",
          "Acceso al lago y areas naturales",
          "Juegos y parque para ninos",
          "Areas de picnic",
          "Canchas deportivas",
          "Zonas comunes",
        ],
      },
      {
        id: "service-2",
        title: "Paintball",
        image: "/images/paintball.jpg",
        priceLabel: "Desde RD$250",
        priceDetail: "por persona",
        description:
          "Vive la emocion del paintball en nuestro campo de batalla tropical rodeado de naturaleza.",
        includes: [
          "Equipo completo de seguridad",
          "Marcadora profesional",
          "Municiones incluidas",
          "Instructor dedicado",
          "Area de descanso",
        ],
      },
      {
        id: "service-3",
        title: "Excursion en Buggy",
        image: "/images/buggy.jpg",
        priceLabel: "Desde USD$60",
        priceDetail: "por adulto",
        description:
          "Explora los paisajes tropicales de Higuey en una emocionante aventura en buggy todo terreno.",
        includes: [
          "Buggy todo terreno",
          "Guia turistico",
          "Equipo de seguridad",
          "Recorrido por caminos naturales",
          "Paradas fotograficas",
        ],
      },
      {
        id: "service-4",
        title: "Excursion a Caballo",
        image: "/images/horseback.jpg",
        priceLabel: "Desde USD$40",
        priceDetail: "por adulto",
        description:
          "Recorre los senderos tropicales a caballo y conecta con la naturaleza dominicana.",
        includes: [
          "Caballo entrenado",
          "Guia experto",
          "Recorrido por senderos",
          "Equipo de seguridad",
          "Experiencia para todos los niveles",
        ],
      },
    ],
  },
  experiences: {
    eyebrow: "Lo que nos hace especiales",
    title: "Experiencias y amenidades",
    subtitle:
      "Todo lo que necesitas para un dia perfecto en familia, rodeado de la naturaleza tropical dominicana.",
    style: { backgroundColor: "hsl(var(--card))" },
    items: [
      {
        id: "exp-1",
        icon: "Waves",
        title: "Piscinas",
        description: "Piscinas para adultos y ninos con areas de descanso.",
      },
      {
        id: "exp-2",
        icon: "TreePalm",
        title: "Lago y areas naturales",
        description:
          "Espacios verdes y un hermoso lago rodeado de naturaleza.",
      },
      {
        id: "exp-3",
        icon: "Gamepad2",
        title: "Juegos y parque infantil",
        description:
          "Area de juegos disenada para la diversion de los mas pequenos.",
      },
      {
        id: "exp-4",
        icon: "Trophy",
        title: "Canchas deportivas",
        description: "Canchas para voleibol, baloncesto y otros deportes.",
      },
      {
        id: "exp-5",
        icon: "Music",
        title: "Musica y entretenimiento",
        description: "Ambiente animado con musica y actividades recreativas.",
      },
      {
        id: "exp-6",
        icon: "UtensilsCrossed",
        title: "Comida y bebidas",
        description:
          "Locales internos con comida tipica dominicana y bebidas.",
      },
    ],
  },
  gallery: {
    eyebrow: "Nuestro parque",
    title: "Siguenos en Instagram",
    subtitle:
      "Mira las ultimas fotos y videos de la experiencia Rancho Cocory directamente desde nuestro Instagram.",
    style: {},
    handle: "@ranchococory",
    profileBio: "Parque Recreativo · Higuey, RD",
    profileImage: "/images/logo.png",
    instagramUrl: "https://instagram.com/ranchococory",
    followLabel: "Seguir en Instagram",
    fallbackPosts: [
      {
        id: "ig-fallback-1",
        image: "/images/pool.jpg",
        alt: "Piscinas de Rancho Cocory",
        likes: 342,
        comments: 28,
      },
      {
        id: "ig-fallback-2",
        image: "/images/buggy.jpg",
        alt: "Excursion en buggy",
        likes: 517,
        comments: 45,
      },
      {
        id: "ig-fallback-3",
        image: "/images/gallery-1.jpg",
        alt: "Areas verdes del parque",
        likes: 289,
        comments: 19,
      },
      {
        id: "ig-fallback-4",
        image: "/images/horseback.jpg",
        alt: "Paseo a caballo",
        likes: 426,
        comments: 33,
      },
      {
        id: "ig-fallback-5",
        image: "/images/gallery-3.jpg",
        alt: "Diversion familiar",
        likes: 398,
        comments: 41,
      },
      {
        id: "ig-fallback-6",
        image: "/images/paintball.jpg",
        alt: "Cancha de paintball",
        likes: 275,
        comments: 22,
      },
    ],
  },
  testimonials: {
    eyebrow: "Nuestros visitantes",
    title: "Lo que dicen de nosotros",
    style: {},
    googlePlaceId: "ChIJ6eHmZkhIqowRNY9WuTsX2289",
    googleReviewsUrl:
      "https://search.google.com/local/reviews?placeid=ChIJ6eHmZkhIqowRNY9WuTsX2289",
    viewAllLabel: "Ver todas las resenas en Google",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Todo lo que necesitas saber",
    style: { backgroundColor: "hsl(var(--card))" },
    items: [
      {
        id: "faq-1",
        question: "Que incluye la entrada general?",
        answer:
          "La entrada general incluye acceso completo a las piscinas para adultos y ninos, lago, areas naturales, juegos infantiles, canchas deportivas, areas de picnic y todas las zonas comunes del parque.",
      },
      {
        id: "faq-2",
        question: "Las excursiones incluyen comida?",
        answer:
          "Las excursiones de buggy y caballo no incluyen comida, pero puedes adquirir alimentos y bebidas en nuestros locales internos. El pasadia tampoco incluye comida, pero tenemos opciones deliciosas de comida tipica dominicana dentro del parque.",
      },
      {
        id: "faq-3",
        question: "Hay paquetes especiales?",
        answer:
          "Si, ofrecemos paquetes especiales para grupos, cumpleanos, eventos corporativos y celebraciones. Contactanos para obtener informacion personalizada sobre precios y disponibilidad.",
      },
      {
        id: "faq-4",
        question: "Actividades para ninos pequenos?",
        answer:
          "Contamos con piscina infantil, parque de juegos, areas verdes seguras y espacios de recreacion disenados especialmente para los mas pequenos de la familia.",
      },
      {
        id: "faq-5",
        question: "Cual es el horario de operacion?",
        answer:
          "Estamos abiertos todos los dias de 9:00 AM a 6:00 PM. Los fines de semana y dias feriados el parque puede extender su horario dependiendo de la demanda.",
      },
      {
        id: "faq-6",
        question: "Puedo llevar mi propia comida?",
        answer:
          "No se permite el ingreso de comida externa al parque. Sin embargo, contamos con una variedad de opciones gastronomicas internas a precios accesibles con comida tipica dominicana.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto y reservas",
    title: "Planifica tu visita",
    subtitle:
      "Contactanos para reservar tu dia, solicitar informacion sobre paquetes especiales o resolver cualquier duda.",
    socialLabel: "Siguenos:",
    style: { backgroundColor: "hsl(var(--card))" },
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4127.830709697052!2d-68.77664612480818!3d18.527819382567138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8b04866e6e1e9%3A0x6fdb173bb9568f35!2sRancho%20cocory!5e1!3m2!1sen!2sdo!4v1772148411008!5m2!1sen!2sdo",
    contactInfo: [
      {
        id: "contact-phone",
        icon: "phone",
        label: "Telefono",
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
        label: "Direccion",
        value: "Autopista del Coral, Higuey, La Altagracia, Rep. Dominicana",
        href: "https://maps.app.goo.gl/3kFM8x6hnN7P3Xrc8",
      },
      {
        id: "contact-hours",
        icon: "clock",
        label: "Horario",
        value: "Todos los dias: 9:00 AM - 5:40 PM",
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
      "Parque recreativo familiar en Higuey, Republica Dominicana. El mejor destino para un dia lleno de diversión y naturaleza.",
    linksTitle: "Enlaces",
    contactTitle: "Contacto",
    addressLine1: "Autopista del Coral, Higuey",
    addressLine2: "La Altagracia, Rep. Dominicana",
    phone: "(829) 962-1367",
    phoneHref: "tel:+18299621367",
    email: "ranchococory95@gmail.com",
    emailHref: "mailto:ranchococory95@gmail.com",
    copyright: "© 2026 Rancho Cocory. Hecho con ❤️ por",
    creditName: "Daniel Nuñez",
    creditUrl: "https://danielnunez.me/",
    navLinks: [
      { label: "Inicio", href: "#inicio" },
      { label: "Actividades", href: "#actividades" },
      { label: "Galeria", href: "#galeria" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
}
