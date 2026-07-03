import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ServiceCards } from "@/components/service-cards"
import { Experiences } from "@/components/experiences"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { EditorProvider } from "@/components/editor/editor-mode"

export default function Home() {
  return (
    <EditorProvider>
      <Navbar />
      <main>
        <Hero />
        <ServiceCards />
        <Experiences />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </EditorProvider>
  )
}
