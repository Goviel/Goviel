import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database, HardDrive, Trash2, AlertTriangle } from "lucide-react";

const StorageUsage = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClearBucket = async () => {
    setIsClearing(true);
    setShowConfirmDialog(false);

    try {
      console.log('Calling clear-chat-bucket function...');
      
      const { data, error } = await supabase.functions.invoke('clear-chat-bucket', {
        body: {},
      });

      if (error) {
        console.error('Error calling function:', error);
        throw error;
      }

      console.log('Function response:', data);

      if (data.success) {
        toast.success("Bucket limpiado", {
          description: data.message || `${data.deletedCount} archivos eliminados`,
        });
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (error) {
      console.error("Error clearing bucket:", error);
      toast.error("Error al limpiar bucket", {
        description: error instanceof Error ? error.message : "Por favor, intenta de nuevo",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Uso de Storage</h2>
        <p className="text-muted-foreground">
          Monitorea el uso de recursos y gestiona el almacenamiento
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Database Usage Card */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Uso de Base de Datos</CardTitle>
                  <CardDescription>PostgreSQL Storage</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tablas</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Contactos</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Chats</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Métricas</span>
                <span className="font-medium">-</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Los contadores de registros se actualizan en tiempo real en cada vista
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage Card */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <HardDrive className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Uso de Storage</CardTitle>
                  <CardDescription>Archivos y Multimedia</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bucket</span>
                <span className="font-medium">chat_uploads</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tipo</span>
                <span className="font-medium">Público</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total archivos</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tamaño total</span>
                <span className="font-medium">-</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-3">
                Los archivos del chat se almacenan en el bucket público
              </p>
              
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => setShowConfirmDialog(true)}
                disabled={isClearing}
              >
                {isClearing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Limpiando...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpiar Bucket de Chat
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Information Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Base de Datos</h3>
              <p className="text-sm text-muted-foreground">
                Supabase PostgreSQL con RLS habilitado para todas las tablas
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20 bg-accent/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <HardDrive className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Storage</h3>
              <p className="text-sm text-muted-foreground">
                Bucket público para archivos de chat procesados por n8n
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-foreground">Precaución</h3>
              <p className="text-sm text-muted-foreground">
                Limpiar el bucket eliminará permanentemente todos los archivos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirm Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              ¿Limpiar bucket de chat?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Esta acción eliminará <strong>permanentemente</strong> todos los archivos
                e imágenes del bucket <code>chat_uploads</code>.
              </p>
              <p className="text-destructive font-medium">
                Esta operación no se puede deshacer.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isClearing}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearBucket}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isClearing}
            >
              {isClearing ? "Limpiando..." : "Sí, eliminar todo"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StorageUsage;
