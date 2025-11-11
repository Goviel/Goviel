import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";
import { HardHat, Settings, Truck, Cpu, Stethoscope, Sparkles, Mail, Phone, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const LandingPage = () => {
  // Track page visit
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        await supabase
          .from("metrics")
          .insert([{ event_type: "page_visit" }]);
      } catch (error) {
        console.error("Error tracking page visit:", error);
      }
    };

    trackPageVisit();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold text-white">
              Soluciones Industriales y Logísticas de Excelencia
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/90 max-w-3xl mx-auto">
              Somos una empresa comercializadora de productos y servicios para áreas: Medicas, laboratorios, industrial, logística, construcción y más.
            </p>
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contáctanos Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nosotros</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Somos una empresa comprometida con la excelencia en soluciones industriales y logísticas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <HardHat className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Experiencia</h3>
              <p className="text-base text-muted-foreground">
                Años de trayectoria brindando soluciones integrales a diversas industrias
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Calidad</h3>
              <p className="text-base text-muted-foreground">
                Productos y servicios de la más alta calidad garantizada
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Truck className="h-8 w-8 text-primary" />
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
      <section id="servicios" className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones integrales para diversas industrias y sectores
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              titulo="Industrial"
              descripcion="Zapato industrial, protección personal, uniformes, refacciones, químicos, herramientas..."
              Icon={HardHat}
            />
            <ServiceCard
              titulo="Servicios (Mantenimiento)"
              descripcion="Reparación sistemas hídricos, herrería, plomería, pintura, Tablaroca, climas..."
              Icon={Settings}
            />
            <ServiceCard
              titulo="Logística"
              descripcion="Fletes a nivel nacional, tracto camión, 3.5 toneladas, estaquitas, renta de montacargas."
              Icon={Truck}
            />
            <ServiceCard
              titulo="Ingeniería"
              descripcion="Desarrollo de productos, Lean Manufacturing, software de monitoreo, capacitaciones..."
              Icon={Cpu}
            />
            <ServiceCard
              titulo="Médico y Laboratorio"
              descripcion="Ropa médica, insumos, mobiliario, dental, nutrición, pruebas diagnóstico..."
              Icon={Stethoscope}
            />
            <ServiceCard
              titulo="Limpieza"
              descripcion="Insumos de limpieza, higiénicos, marcas Ablon y Oval."
              Icon={Sparkles}
            />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clientes" className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nuestros Clientes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empresas líderes que confían en nuestros servicios
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div 
                key={item}
                className="flex items-center justify-center bg-background rounded-lg p-6 border-2 hover:border-accent transition-all"
              >
                <img 
                  src="/placeholder.svg" 
                  alt={`Cliente ${item}`}
                  className="w-full h-20 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Contáctanos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estamos aquí para ayudarte con tus proyectos industriales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-base text-muted-foreground">contacto@empresa.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Teléfono</h3>
                  <p className="text-base text-muted-foreground">+52 844 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Horario</h3>
                  <p className="text-base text-muted-foreground">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p className="text-base text-muted-foreground">Sábado: 9:00 AM - 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Ubicación</h3>
                  <p className="text-base text-muted-foreground">Saltillo, Coahuila</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;
