import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  titulo: string;
  descripcion: string;
  Icon: LucideIcon;
}

const ServiceCard = ({ titulo, descripcion, Icon }: ServiceCardProps) => {
  return (
    <Card className="border-2 hover:border-accent hover:shadow-lg transition-all">
      <CardHeader>
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-center">{titulo}</CardTitle>
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
