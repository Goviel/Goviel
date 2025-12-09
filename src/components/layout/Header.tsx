import { Building2 } from "lucide-react";
const Header = () => {
  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div className="container mx-auto px-4 py-4">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-0.5">
          <img src="/favicon.png" alt="Goviel" className="h-10 w-auto object-contain" />
          <span className="font-bold text-slate-900 text-4xl mt-1">oviel</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#servicios" className="text-sm font-medium text-slate-600 transition-colors hover:text-primary">
            Servicios
          </a>
          <a href="#nosotros" className="text-sm font-medium text-slate-600 transition-colors hover:text-primary">
            Nosotros
          </a>
          <a href="#contacto" className="text-sm font-medium text-slate-600 transition-colors hover:text-primary">
            Contacto
          </a>
        </div>
      </nav>
    </div>
  </header>;
};
export default Header;