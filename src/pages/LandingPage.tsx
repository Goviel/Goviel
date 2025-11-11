import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { HardHat, Settings, Truck, Cpu, Stethoscope, Sparkles } from "lucide-react";

const LandingPage = () => {
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
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Contáctanos Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
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
    </MainLayout>
  );
};

export default LandingPage;
