import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  titulo: string;
  descripcion: string;
  imageSrc: string;
}

const ServiceCard = ({ titulo, descripcion, imageSrc }: ServiceCardProps) => {
  return (
    <Card className="border-2 hover:border-accent hover:shadow-lg transition-all overflow-hidden group">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={titulo}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-center text-xl">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">
          {descripcion}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
