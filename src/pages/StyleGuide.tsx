import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StyleGuide = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-foreground">
            Guía de Estilo Profesional
          </h1>
          <p className="text-xl text-muted-foreground">
            Sistema de diseño industrial para multiservicios
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Paleta de Colores Industrial
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden border-2">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle>Primary - Navy</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Azul marino profesional
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 rounded-lg bg-primary shadow-lg"></div>
                <p className="mt-4 font-mono text-sm text-muted-foreground">
                  HSL: 218 54% 20%
                </p>
                <p className="text-xs text-muted-foreground">
                  Fondos, headers, elementos principales
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2">
              <CardHeader className="bg-accent text-accent-foreground">
                <CardTitle>Accent - Crimson</CardTitle>
                <CardDescription className="text-accent-foreground/80">
                  Rojo carmesí para CTAs
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 rounded-lg bg-accent shadow-lg"></div>
                <p className="mt-4 font-mono text-sm text-muted-foreground">
                  HSL: 351 77% 45%
                </p>
                <p className="text-xs text-muted-foreground">
                  Botones, enlaces, llamadas a la acción
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2">
              <CardHeader className="bg-secondary text-secondary-foreground">
                <CardTitle>Secondary - Gray</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  Gris medio industrial
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-32 rounded-lg bg-secondary shadow-lg"></div>
                <p className="mt-4 font-mono text-sm text-muted-foreground">
                  HSL: 220 10% 50%
                </p>
                <p className="text-xs text-muted-foreground">
                  Elementos secundarios, íconos
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Tipografía Profesional
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Encabezados y Títulos</CardTitle>
                <CardDescription>
                  Jerarquía tipográfica para contenido industrial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="border-l-4 border-accent pl-6">
                  <h1 className="mb-2 text-5xl font-bold text-foreground">
                    Servicios Industriales de Calidad
                  </h1>
                  <p className="font-mono text-xs text-muted-foreground">
                    text-5xl font-bold - H1 Hero
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h2 className="mb-2 text-4xl font-bold text-foreground">
                    Soluciones en Fabricación Metálica
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground">
                    text-4xl font-bold - H2 Secciones
                  </p>
                </div>
                <div className="border-l-4 border-secondary pl-6">
                  <h3 className="mb-2 text-2xl font-semibold text-foreground">
                    Tecnología de Soldadura Avanzada
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    text-2xl font-semibold - H3 Subsecciones
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Texto de Contenido</CardTitle>
                <CardDescription>
                  Estilos para párrafos y contenido informativo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="mb-2 text-lg leading-relaxed text-foreground">
                    Texto grande introductorio - Nuestra empresa se especializa
                    en servicios industriales de alta calidad, ofreciendo
                    soluciones integrales para fabricación metálica y soldadura.
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    text-lg leading-relaxed
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-base leading-relaxed text-foreground">
                    Párrafo normal - Contamos con más de 20 años de experiencia
                    en el sector, proporcionando servicios profesionales que
                    cumplen con los más altos estándares de calidad y seguridad
                    industrial.
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    text-base leading-relaxed
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Texto secundario - Información adicional y detalles
                    complementarios para contexto y aclaraciones.
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    text-sm text-muted-foreground
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-6">
                  <blockquote className="border-l-4 border-accent pl-4 text-lg italic text-foreground">
                    "La calidad y precisión en cada proyecto es nuestro
                    compromiso principal con cada cliente."
                  </blockquote>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    blockquote - Testimonios y citas destacadas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Botones Profesionales
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Botones Primarios</CardTitle>
                <CardDescription>
                  Para acciones principales y CTAs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Default (Primary Navy)
                  </p>
                  <Button size="lg" className="w-full">
                    Solicitar Cotización
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Outline
                  </p>
                  <Button variant="outline" size="lg" className="w-full">
                    Ver Más Información
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Botones de Acción</CardTitle>
                <CardDescription>CTAs destacados en crimson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Accent (Crimson CTA)
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Contactar Ahora
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Secondary
                  </p>
                  <Button variant="secondary" size="lg" className="w-full">
                    Más Servicios
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Botones Sutiles</CardTitle>
                <CardDescription>Para acciones secundarias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Ghost
                  </p>
                  <Button variant="ghost" size="lg" className="w-full">
                    Cancelar
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Link
                  </p>
                  <Button variant="link" size="lg" className="w-full">
                    Leer Documentación
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tamaños</CardTitle>
                <CardDescription>Diferentes dimensiones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    Pequeño
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button size="default" className="w-full">
                    Normal
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button size="lg" className="w-full">
                    Grande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Elements */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Elementos de Formulario
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campos de Texto</CardTitle>
                <CardDescription>
                  Inputs para captura de información del cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Nombre de la Empresa
                  </label>
                  <Input placeholder="Ej: Industrias Metalúrgicas S.A." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Correo Electrónico
                  </label>
                  <Input
                    type="email"
                    placeholder="contacto@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Teléfono
                  </label>
                  <Input type="tel" placeholder="+52 (555) 123-4567" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Áreas de Texto</CardTitle>
                <CardDescription>
                  Campos para descripciones detalladas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Descripción del Proyecto
                  </label>
                  <Textarea
                    placeholder="Describa los servicios que requiere, especificaciones técnicas, plazos de entrega, y cualquier detalle relevante para su proyecto industrial..."
                    rows={8}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-foreground">
            Tarjetas de Servicios
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 transition-all hover:border-accent hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">
                  Fabricación en Acero
                </CardTitle>
                <CardDescription>
                  Estructuras metálicas de alta resistencia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Diseño y fabricación de estructuras metálicas industriales
                  con certificación ISO. Incluye corte, soldadura y acabados
                  especializados.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Solicitar Cotización
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">
                  Soldadura Especializada
                </CardTitle>
                <CardDescription>
                  Técnicas avanzadas de unión metálica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Servicios de soldadura TIG, MIG y por arco. Personal
                  certificado con experiencia en proyectos industriales de gran
                  escala.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Ver Más
                </Button>
                <Button className="flex-1">Contactar</Button>
              </CardFooter>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">
                  Mantenimiento Industrial
                </CardTitle>
                <CardDescription>Servicio preventivo y correctivo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Programas de mantenimiento para maquinaria y equipos
                  industriales. Garantizamos operación continua y óptima.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  Más Información
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="border-2 border-accent bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Tarjeta Destacada CTA
                </CardTitle>
                <CardDescription className="text-base">
                  Ideal para promociones especiales o servicios premium
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-foreground">
                  Esta tarjeta utiliza un fondo degradado sutil y un borde
                  accent para destacar información importante o llamados a la
                  acción prioritarios. Perfecta para ofertas especiales o
                  servicios destacados.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    Certificaciones internacionales
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    Garantía de satisfacción
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    Soporte técnico 24/7
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Contratar Ahora
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide;
