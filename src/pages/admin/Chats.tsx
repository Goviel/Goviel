import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { RefreshCw, FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Chat {
  id: string;
  created_at: string;
  status: string;
  browser_id: string | null;
  telefono: string | null;
  summary: string | null;
  files: any | null;
  images: any | null;
}

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isFilesDialogOpen, setIsFilesDialogOpen] = useState(false);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChats(data || []);
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Error al cargar chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "nuevo":
        return "bg-blue-500";
      case "en_proceso":
        return "bg-yellow-500";
      case "completado":
        return "bg-green-500";
      case "cerrado":
        return "bg-gray-500";
      default:
        return "bg-primary";
    }
  };

  const handleViewFiles = (chat: Chat) => {
    setSelectedChat(chat);
    setIsFilesDialogOpen(true);
  };

  const getStorageUrl = (path: string) => {
    const { data } = supabase.storage
      .from("chat_uploads")
      .getPublicUrl(path);
    return data.publicUrl;
  };

  const renderFiles = (files: any) => {
    if (!files || (Array.isArray(files) && files.length === 0)) {
      return <p className="text-muted-foreground text-sm">No hay archivos adjuntos</p>;
    }

    const fileList = Array.isArray(files) ? files : [files];

    return (
      <div className="space-y-2">
        {fileList.map((file: any, index: number) => {
          const fileName = typeof file === "string" ? file : file.name || file.path;
          const filePath = typeof file === "string" ? file : file.path;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(getStorageUrl(filePath), "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderImages = (images: any) => {
    if (!images || (Array.isArray(images) && images.length === 0)) {
      return <p className="text-muted-foreground text-sm">No hay imágenes adjuntas</p>;
    }

    const imageList = Array.isArray(images) ? images : [images];

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imageList.map((image: any, index: number) => {
          const imagePath = typeof image === "string" ? image : image.path;
          const imageUrl = getStorageUrl(imagePath);

          return (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border-2 hover:border-primary transition-all cursor-pointer group"
              onClick={() => window.open(imageUrl, "_blank")}
            >
              <img
                src={imageUrl}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Chats</h2>
          <p className="text-muted-foreground">
            Conversaciones procesadas por n8n
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchChats}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Lista de Conversaciones</CardTitle>
          <CardDescription>
            {chats.length} conversación{chats.length !== 1 ? "es" : ""} registrada{chats.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando conversaciones...</p>
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No hay conversaciones registradas</p>
              <p className="text-sm mt-2">Las conversaciones procesadas por n8n aparecerán aquí</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Resumen</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chats.map((chat) => (
                    <TableRow key={chat.id}>
                      <TableCell>
                        <Badge className={getStatusColor(chat.status)}>
                          {chat.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {chat.telefono || "-"}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">
                          {chat.summary || "Sin resumen"}
                        </p>
                      </TableCell>
                      <TableCell>
                        {new Date(chat.created_at).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewFiles(chat)}
                          disabled={!chat.files && !chat.images}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Ver Archivos
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isFilesDialogOpen} onOpenChange={setIsFilesDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Archivos e Imágenes</DialogTitle>
            <DialogDescription>
              Archivos adjuntos de la conversación
              {selectedChat?.telefono && ` con ${selectedChat.telefono}`}
            </DialogDescription>
          </DialogHeader>

          {selectedChat && (
            <div className="space-y-6">
              {/* Summary Section */}
              {selectedChat.summary && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">Resumen</h3>
                  <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                    {selectedChat.summary}
                  </p>
                </div>
              )}

              {/* Files Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Archivos
                </h3>
                {renderFiles(selectedChat.files)}
              </div>

              {/* Images Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Imágenes
                </h3>
                {renderImages(selectedChat.images)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chats;
