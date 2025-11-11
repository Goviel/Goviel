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
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Guía de Estilo</h1>
          <p className="text-lg text-muted-foreground">
            Componentes base y sistema de diseño
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">Paleta de Colores</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Primary</CardTitle>
                <CardDescription>Azul corporativo profesional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-md bg-primary"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  HSL: 213 94% 42%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secondary</CardTitle>
                <CardDescription>Gris acero industrial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-md bg-secondary"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  HSL: 215 20% 65%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accent</CardTitle>
                <CardDescription>Naranja para CTAs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-md bg-accent"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  HSL: 25 95% 53%
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">Tipografía</h2>
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h1 className="text-4xl font-bold">
                  Heading 1 - Título Principal
                </h1>
                <p className="text-sm text-muted-foreground">
                  text-4xl font-bold
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold">
                  Heading 2 - Subtítulo
                </h2>
                <p className="text-sm text-muted-foreground">
                  text-3xl font-semibold
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">
                  Heading 3 - Sección
                </h3>
                <p className="text-sm text-muted-foreground">
                  text-2xl font-semibold
                </p>
              </div>
              <div>
                <p className="text-base">
                  Párrafo normal - Este es un ejemplo de texto de párrafo
                  regular. Ideal para contenido de lectura y descripciones
                  detalladas.
                </p>
                <p className="text-sm text-muted-foreground">text-base</p>
              </div>
              <div>
                <blockquote className="border-l-4 border-primary pl-4 italic">
                  "Esta es una cita o blockquote. Se utiliza para destacar
                  testimonios o frases importantes."
                </blockquote>
                <p className="text-sm text-muted-foreground">blockquote</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">Botones</h2>
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Default
                </p>
                <Button>Botón Default</Button>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Destructive
                </p>
                <Button variant="destructive">Botón Destructive</Button>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Outline
                </p>
                <Button variant="outline">Botón Outline</Button>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Secondary
                </p>
                <Button variant="secondary">Botón Secondary</Button>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Ghost
                </p>
                <Button variant="ghost">Botón Ghost</Button>
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Link
                </p>
                <Button variant="link">Botón Link</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Elements */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">
            Elementos de Formulario
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>Campo de entrada de texto</CardDescription>
              </CardHeader>
              <CardContent>
                <Input placeholder="Escribe algo aquí..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
                <CardDescription>Área de texto multilínea</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Escribe un mensaje largo..." rows={4} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">Cards</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Descripción de la card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Este es el contenido de la card. Puede incluir cualquier tipo
                  de información.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Acción</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Completa</CardTitle>
                <CardDescription>Con todos los elementos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Contenido principal de la tarjeta.</p>
                <Input placeholder="Ejemplo de input" />
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Simple</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Card sin descripción ni footer.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide;
