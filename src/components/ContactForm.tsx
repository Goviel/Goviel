import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  nombre: z.string()
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(100, { message: "El nombre no puede exceder 100 caracteres" }),
  email: z.string()
    .trim()
    .email({ message: "Ingresa un email válido" })
    .max(255, { message: "El email no puede exceder 255 caracteres" }),
  telefono: z.string()
    .trim()
    .min(10, { message: "El teléfono debe tener al menos 10 dígitos" })
    .max(20, { message: "El teléfono no puede exceder 20 caracteres" }),
  comentario: z.string()
    .trim()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
    .max(1000, { message: "El mensaje no puede exceder 1000 caracteres" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      /* 
      const { error } = await supabase
        .from("contacts")
        .insert([{
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          comentario: data.comentario,
        }]);

      if (error) throw error;

      // Track form submission
      await supabase
        .from("metrics")
        .insert([{ event_type: "form_submit" }]);
      */

      // Mock success for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("¡Mensaje enviado!", {
        description: "Nos pondremos en contacto contigo pronto.",
      });

      reset();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      toast.error("Error al enviar", {
        description: "Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Envíanos un Mensaje</CardTitle>
        <CardDescription>
          Completa el formulario y nos pondremos en contacto contigo pronto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input
              id="nombre"
              placeholder="Industrias Metalúrgicas S.A."
              {...register("nombre")}
              disabled={isSubmitting}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive">{errors.nombre.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="contacto@empresa.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              type="tel"
              placeholder="+52 844 123 4567"
              {...register("telefono")}
              disabled={isSubmitting}
            />
            {errors.telefono && (
              <p className="text-sm text-destructive">{errors.telefono.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentario">Mensaje</Label>
            <Textarea
              id="comentario"
              placeholder="Describe tu proyecto o solicitud de servicio..."
              rows={6}
              {...register("comentario")}
              disabled={isSubmitting}
            />
            {errors.comentario && (
              <p className="text-sm text-destructive">{errors.comentario.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-accent hover:bg-accent/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
