import { Phone, Mail, MapPin, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    label: "Telefono",
    value: "(829) 962-1367",
    href: "tel:+18299621367",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ranchococory95@gmail.com",
    href: "mailto:ranchococory95@gmail.com",
  },
  {
    icon: MapPin,
    label: "Direccion",
    value: "Autopista del Coral, Higuey, La Altagracia, Rep. Dominicana",
    href: "https://maps.app.goo.gl/3kFM8x6hnN7P3Xrc8",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Todos los dias: 9:00 AM - 5:40 PM",
    href: undefined,
  },
]

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/ranchococory",
    svg: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ranchococory",
    svg: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@ranchococory",
    svg: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@ranchococory",
    svg: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
      </svg>
    ),
  },
  {
    label: "TripAdvisor",
    href: "https://tripadvisor.com/",
    svg: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M12 4.34c2.42 0 4.65.72 6.53 1.94H24a11.3 11.3 0 00-1.76 2.61 6.66 6.66 0 011.44 4.14 6.7 6.7 0 01-11.68 4.5L12 19.66l-1.99-2.13A6.7 6.7 0 01.32 13.03c0-1.57.54-3.01 1.44-4.14A11.3 11.3 0 000 6.28h5.47A11.94 11.94 0 0112 4.34zm-5 4.16a4.53 4.53 0 100 9.06 4.53 4.53 0 000-9.06zm10 0a4.53 4.53 0 100 9.06 4.53 4.53 0 000-9.06zm-10 2.16a2.37 2.37 0 110 4.74 2.37 2.37 0 010-4.74zm10 0a2.37 2.37 0 110 4.74 2.37 2.37 0 010-4.74zM7 11.84a1.19 1.19 0 100 2.38 1.19 1.19 0 000-2.38zm10 0a1.19 1.19 0 100 2.38 1.19 1.19 0 000-2.38zM12 6.06c-1.5 0-2.93.31-4.22.86a6.7 6.7 0 014.22 4.6 6.7 6.7 0 014.22-4.6A10.13 10.13 0 0012 6.06z" />
      </svg>
    ),
  },
]

export function Contact() {
  return (
    <section id="contacto" className="py-20 md:py-28 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Contacto y reservas
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
            {'Planifica tu visita'}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {'Contactanos para reservar tu dia, solicitar informacion sobre paquetes especiales o resolver cualquier duda.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50"
              >
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-foreground font-semibold hover:text-primary transition-colors text-sm"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-semibold text-sm">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links + WhatsApp button side by side */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Siguenos:
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors"
                  aria-label={link.label}
                >
                  {link.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4127.830709697052!2d-68.77664612480818!3d18.527819382567138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea8b04866e6e1e9%3A0x6fdb173bb9568f35!2sRancho%20cocory!5e1!3m2!1sen!2sdo!4v1772148411008!5m2!1sen!2sdo"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicacion de Rancho Cocory en Higuey"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
