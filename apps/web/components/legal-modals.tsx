"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

export function PrivacyPolicyModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Politica de Privacidad
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Ultima actualizacion:</strong>{" "}
            Febrero 2026
          </p>
          <p>
            En Rancho Cocory, nos comprometemos a proteger su privacidad. Esta
            politica describe como recopilamos, usamos y protegemos su
            informacion personal.
          </p>
          <h3 className="font-semibold text-foreground">
            Informacion que recopilamos
          </h3>
          <p>
            Podemos recopilar informacion personal cuando usted nos contacta
            para hacer reservaciones, incluyendo su nombre, numero de telefono,
            correo electronico y cualquier informacion adicional que proporcione
            voluntariamente.
          </p>
          <h3 className="font-semibold text-foreground">
            Uso de la informacion
          </h3>
          <p>
            Utilizamos su informacion exclusivamente para procesar sus
            reservaciones, responder a sus consultas, enviar confirmaciones de
            reserva y mejorar nuestros servicios. No compartimos su informacion
            personal con terceros sin su consentimiento.
          </p>
          <h3 className="font-semibold text-foreground">
            Proteccion de datos
          </h3>
          <p>
            Implementamos medidas de seguridad razonables para proteger su
            informacion personal contra acceso no autorizado, alteracion,
            divulgacion o destruccion.
          </p>
          <h3 className="font-semibold text-foreground">Contacto</h3>
          <p>
            Si tiene preguntas sobre esta politica de privacidad, puede
            contactarnos al (829) 962-1367 o al correo
            ranchococory95@gmail.com.
          </p>
        </div>
        <DialogClose className="absolute top-3 right-3 rounded-full p-1.5 hover:bg-muted transition-colors">
          <X className="size-4 text-muted-foreground" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function TermsConditionsModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Terminos y Condiciones
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Ultima actualizacion:</strong>{" "}
            Febrero 2026
          </p>
          <p>
            Al visitar Rancho Cocory y utilizar nuestras instalaciones, usted
            acepta los siguientes terminos y condiciones.
          </p>
          <h3 className="font-semibold text-foreground">Entrada y acceso</h3>
          <p>
            La entrada al parque requiere el pago de la tarifa correspondiente.
            Los precios pueden variar segun el dia de la semana y temporada. Los
            ninos menores de cierta edad pueden tener tarifas reducidas o
            entrada gratuita segun la politica vigente.
          </p>
          <h3 className="font-semibold text-foreground">
            Reglas del parque
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>No se permite el ingreso de comida o bebidas externas.</li>
            <li>
              Se requiere el uso de vestimenta adecuada en las areas de piscina.
            </li>
            <li>
              Los menores de edad deben estar acompanados por un adulto
              responsable en todo momento.
            </li>
            <li>
              Se deben respetar las instrucciones del personal en todas las
              actividades.
            </li>
            <li>
              Rancho Cocory no se hace responsable por objetos perdidos o
              danados.
            </li>
          </ul>
          <h3 className="font-semibold text-foreground">
            Actividades y excursiones
          </h3>
          <p>
            La participacion en actividades como paintball, excursiones en buggy
            y paseos a caballo es bajo la responsabilidad del participante.
            Todos los participantes deben seguir las instrucciones de seguridad
            proporcionadas por los instructores.
          </p>
          <h3 className="font-semibold text-foreground">
            Cancelaciones y reservas
          </h3>
          <p>
            Las reservaciones pueden ser canceladas o modificadas con al menos
            24 horas de anticipacion. Consulte con nuestro equipo para mas
            detalles sobre nuestra politica de reembolsos.
          </p>
          <h3 className="font-semibold text-foreground">Contacto</h3>
          <p>
            Para cualquier consulta sobre estos terminos, contactenos al (829)
            962-1367 o al correo ranchococory95@gmail.com.
          </p>
        </div>
        <DialogClose className="absolute top-3 right-3 rounded-full p-1.5 hover:bg-muted transition-colors">
          <X className="size-4 text-muted-foreground" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function LegalLinks() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setPrivacyOpen(true)}
        className="text-xs text-background/40 hover:text-background/60 transition-colors cursor-pointer"
      >
        Politica de privacidad
      </button>
      <button
        onClick={() => setTermsOpen(true)}
        className="text-xs text-background/40 hover:text-background/60 transition-colors cursor-pointer"
      >
        Terminos y condiciones
      </button>
      <PrivacyPolicyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <TermsConditionsModal open={termsOpen} onOpenChange={setTermsOpen} />
    </>
  )
}
