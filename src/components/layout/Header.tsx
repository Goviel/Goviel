import { NavLink } from "@/components/NavLink";
import { Building2 } from "lucide-react";
const Header = () => {
  return <header className="border-b border-border bg-primary">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-primary-foreground">​Goviel</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-6 md:flex">
            <NavLink to="/servicios" className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-accent" activeClassName="text-accent">
              Servicios
            </NavLink>
            <NavLink to="/nosotros" className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-accent" activeClassName="text-accent">
              Nosotros
            </NavLink>
            <NavLink to="/clientes" className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-accent" activeClassName="text-accent">
              Clientes
            </NavLink>
            <NavLink to="/contacto" className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-accent" activeClassName="text-accent">
              Contacto
            </NavLink>
          </div>
        </nav>
      </div>
    </header>;
};
export default Header;