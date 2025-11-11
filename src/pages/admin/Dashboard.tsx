import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, MousePointerClick, FileText, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MetricsCounts {
  page_visits: number;
  whatsapp_clicks: number;
  form_submits: number;
  chat_opens: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<MetricsCounts>({
    page_visits: 0,
    whatsapp_clicks: 0,
    form_submits: 0,
    chat_opens: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch all metrics counts
        const { data: pageVisits } = await supabase
          .from("metrics")
          .select("*", { count: "exact", head: true })
          .eq("event_type", "page_visit");

        const { data: whatsappClicks } = await supabase
          .from("metrics")
          .select("*", { count: "exact", head: true })
          .eq("event_type", "whatsapp_click");

        const { data: formSubmits } = await supabase
          .from("metrics")
          .select("*", { count: "exact", head: true })
          .eq("event_type", "form_submit");

        const { data: chatOpens } = await supabase
          .from("metrics")
          .select("*", { count: "exact", head: true })
          .eq("event_type", "chat_open");

        setMetrics({
          page_visits: pageVisits?.length || 0,
          whatsapp_clicks: whatsappClicks?.length || 0,
          form_submits: formSubmits?.length || 0,
          chat_opens: chatOpens?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando métricas...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">
          Vista general de tu panel de administración
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 hover:border-primary transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visitas a la Página
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.page_visits}</div>
            <p className="text-xs text-muted-foreground">
              Visitas registradas
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-accent transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clicks en WhatsApp
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{metrics.whatsapp_clicks}</div>
            <p className="text-xs text-muted-foreground">
              Interacciones con WhatsApp
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-secondary transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Formularios Enviados
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{metrics.form_submits}</div>
            <p className="text-xs text-muted-foreground">
              Contactos recibidos
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chats Iniciados
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.chat_opens}</div>
            <p className="text-xs text-muted-foreground">
              Conversaciones abiertas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas interacciones con la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay actividad reciente</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Estadísticas del Mes</CardTitle>
            <CardDescription>
              Resumen de métricas del mes actual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Sin datos para mostrar</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
