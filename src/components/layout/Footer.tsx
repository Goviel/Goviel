import { Building2, Mail, Phone, Clock, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="border-t border-border bg-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Logo and Company Name */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Building2 className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold text-primary-foreground">Goviel</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Soluciones industriales profesionales
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary-foreground">
              Enlaces
            </h3>
            <nav className="flex flex-col gap-2">
              <a href="#servicios" className="text-sm text-primary-foreground/80 transition-colors hover:text-accent">
                Servicios
              </a>
              <a href="#nosotros" className="text-sm text-primary-foreground/80 transition-colors hover:text-accent">
                Nosotros
              </a>
              <a href="#contacto" className="text-sm text-primary-foreground/80 transition-colors hover:text-accent">
                Contacto
              </a>
            </nav>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary-foreground">
              Contacto
            </h3>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>ventas@goviel.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>844 727 7669</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Saltillo, Coahuila</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Nombre de la Empresa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;