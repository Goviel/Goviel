import { Building2, Mail, Phone, Clock, MapPin, FileText, Lock, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Building2 className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Goviel</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Soluciones industriales profesionales. Suministros, logística y servicios especializados para empresas exigentes.
            </p>
          </div>


          <div>

          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Navegación
            </h3>
            <nav className="flex flex-col gap-3">
              <a href="/" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                Inicio
              </a>
              <a href="/#servicios" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                Servicios
              </a>
              <a href="/#nosotros" className="text-slate-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors"></span>
                Nosotros
              </a>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Contacto Rápido
            </h3>
            <div className="flex flex-col gap-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">ventas@goviel.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">844 101 0286</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Lunes a Viernes</span>
                  <span className="text-xs">9:00 AM - 6:00 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <span>Saltillo, Coahuila</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-center text-center">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Goviel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;