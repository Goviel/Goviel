import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          // Redirect to home page when logged in
          navigate("/");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Panel de Control
          </CardTitle>
          <CardDescription className="text-base">
            Ingresa tus credenciales para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "hsl(218 54% 20%)",
                    brandAccent: "hsl(351 77% 45%)",
                    brandButtonText: "hsl(0 0% 95%)",
                    defaultButtonBackground: "hsl(0 0% 98%)",
                    defaultButtonBackgroundHover: "hsl(220 15% 95%)",
                    defaultButtonBorder: "hsl(220 15% 88%)",
                    defaultButtonText: "hsl(220 15% 20%)",
                    dividerBackground: "hsl(220 15% 88%)",
                    inputBackground: "hsl(0 0% 98%)",
                    inputBorder: "hsl(220 15% 88%)",
                    inputBorderHover: "hsl(218 54% 20%)",
                    inputBorderFocus: "hsl(351 77% 45%)",
                    inputText: "hsl(220 15% 20%)",
                    inputLabelText: "hsl(220 15% 20%)",
                    inputPlaceholder: "hsl(220 10% 50%)",
                    messageText: "hsl(220 15% 20%)",
                    messageTextDanger: "hsl(0 84% 60%)",
                    anchorTextColor: "hsl(218 54% 20%)",
                    anchorTextHoverColor: "hsl(351 77% 45%)",
                  },
                  space: {
                    spaceSmall: "4px",
                    spaceMedium: "8px",
                    spaceLarge: "16px",
                    labelBottomMargin: "8px",
                    anchorBottomMargin: "4px",
                    emailInputSpacing: "4px",
                    socialAuthSpacing: "4px",
                    buttonPadding: "10px 15px",
                    inputPadding: "10px 15px",
                  },
                  fontSizes: {
                    baseBodySize: "14px",
                    baseInputSize: "14px",
                    baseLabelSize: "14px",
                    baseButtonSize: "14px",
                  },
                  fonts: {
                    bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                  },
                  borderWidths: {
                    buttonBorderWidth: "1px",
                    inputBorderWidth: "1px",
                  },
                  radii: {
                    borderRadiusButton: "0.375rem",
                    buttonBorderRadius: "0.375rem",
                    inputBorderRadius: "0.375rem",
                  },
                },
              },
              className: {
                container: "w-full",
                button: "w-full font-medium transition-all",
                input: "transition-all",
                label: "font-medium",
              },
            }}
            theme="default"
            view="sign_in"
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Contraseña",
                  button_label: "Iniciar Sesión",
                  loading_button_label: "Iniciando sesión...",
                  email_input_placeholder: "admin@empresa.com",
                  password_input_placeholder: "Tu contraseña",
                },
              },
            }}
            showLinks={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
