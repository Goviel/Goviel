import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Cuando tu código diga '/chatwoot-api', Vite lo redirigirá a tu servidor real
      '/chatwoot-api': {
        target: 'https://goviel-chatwoot.9xcf8y.easypanel.host',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chatwoot-api/, '')
      }
    }
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
