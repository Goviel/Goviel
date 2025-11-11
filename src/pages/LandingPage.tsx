import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

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
    </MainLayout>
  );
};

export default LandingPage;
