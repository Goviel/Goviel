import { useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { servicesData } from "../data/services";

import { HardHat, Settings, Truck, Mail, Phone, Clock, MapPin } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";
const LandingPage = () => {
  // Track page visit
  useEffect(() => {
    const trackPageVisit = async () => {
      /*
      try {
        await supabase.from("metrics").insert([{
          event_type: "page_visit"
        }]);
      } catch (error) {
        console.error("Error tracking page visit:", error);
      }
      */
    };
    trackPageVisit();
  }, []);
  return <MainLayout>
    {/* Hero Section */}
    {/* Hero Section */}
    <section className="relative py-20 md:py-24 bg-slate-900 overflow-hidden">
      {/* Overlay - Optional subtle gradient or pattern can be added here if desired but user asked for dark bg */}

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <div className="text-center">
          <h1 className="mb-8 text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
            Soluciones Industriales y Logísticas de Excelencia
          </h1>
          <p className="mb-10 text-xl md:text-2xl font-medium leading-relaxed text-gray-100 max-w-4xl mx-auto drop-shadow-md">
            Somos una empresa comercializadora de productos y servicios para áreas: Médicas, laboratorios, industrial, logística, construcción y más.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto bg-accent text-white hover:bg-orange-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({
              behavior: 'smooth'
            })}
          >
            Hablar con un Experto
          </Button>
        </div>
      </div>
    </section>

    {/* Trust Section */}
    <section className="py-10 bg-slate-50 border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">Proveedores y Marcas Aliadas</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {['sampras', 'certum', 'sablon', 'oval', 'ambiderm', 'bd-bioxon'].map((brand) => (
            <img
              key={brand}
              src={`/images/logos/${brand}.png`}
              alt={brand}
              className="h-8 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>

    {/* About Section */}
    <section id="nosotros" className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nosotros</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Somos una empresa comprometida con la excelencia en soluciones industriales y logísticas
          </p>
        </div>

        {/* Philosophy */}
        <div className="max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-white border-l-4 border-blue-600 p-8 rounded-r-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
            <p className="text-xl md:text-2xl font-medium text-slate-800 text-center italic mb-4">
              "Si su empresa lo necesita, nosotros lo conseguimos."
            </p>
            <p className="text-center text-slate-500 font-bold uppercase tracking-wide text-sm">
              — Filosofía Goviel · Especialistas en compras B2B y Mayoreo
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-xl bg-blue-50 p-3">
                <HardHat className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Experiencia</h3>
            <p className="text-base text-muted-foreground">
              Años de trayectoria brindando soluciones integrales a diversas industrias
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-xl bg-blue-50 p-3">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Calidad</h3>
            <p className="text-base text-muted-foreground">
              Productos y servicios de la más alta calidad garantizada
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-xl bg-blue-50 p-3">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Compromiso</h3>
            <p className="text-base text-muted-foreground">
              Dedicados a satisfacer las necesidades de nuestros clientes
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section id="servicios" className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Soluciones Integrales</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Infraestructura, suministros y tecnología en un solo lugar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px]">

          {['industrial', 'logistica', 'servicios', 'medico', 'ingenieria', 'limpieza'].map((slug) => {
            const service = servicesData[slug as keyof typeof servicesData];
            return (
              <Link
                key={slug}
                to={`/servicios/${slug}`}
                className={`relative group overflow-hidden rounded-2xl bg-card cursor-pointer hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-xl h-64 md:h-auto ${slug === 'industrial' ? 'md:col-span-2 md:row-span-2' :
                  slug === 'logistica' || slug === 'servicios' || slug === 'limpieza' ? 'md:col-span-2' : ''
                  }`}
              >
                <img
                  src={service.image}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={service.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end items-start text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-slate-200 text-sm line-clamp-2">{service.shortDesc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>


    {/* Contact Section */}
    <section id="contacto" className="py-20 relative overflow-hidden">

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [backgroundSize:16px_16px]"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contáctanos</h2>
                <p className="text-slate-400 text-lg">Estamos listos para atender tus requerimientos con cobertura nacional.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-lg text-blue-400 shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">Correo Corporativo</h4>
                    <p className="text-slate-400">ventas@goviel.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-lg text-blue-400 shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">Teléfono</h4>
                    <p className="text-slate-400">+52 844 101 0286</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-lg text-blue-400 shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">Horario</h4>
                    <p className="text-slate-400">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-lg text-blue-400 shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-lg">Ubicación</h4>
                    <p className="text-slate-400">Saltillo, Coahuila</p>
                    <p className="text-slate-500 text-sm mt-1">Servicio en toda la República Mexicana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="md:pl-12 md:border-l border-slate-700 flex flex-col justify-center h-full">
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">¿Listo para comenzar?</h3>
                <p className="text-slate-300 mb-8">Nuestro asistente IA y equipo humano están capacitados para cotizar y resolver dudas en tiempo real.</p>

                <a href="https://wa.me/528441010286?text=Hola" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full gap-3 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/20 group">
                  <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  Contactar por WhatsApp
                </a>

                <p className="text-center text-slate-400 text-sm mt-4">O usa el chat en la esquina inferior derecha ↘️</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>;
};
export default LandingPage;