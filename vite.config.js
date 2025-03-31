import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    port: 7070,
  },
  resolve: {
    alias: {
      "@tracer": "/src/tracer", // Add alias for cleaner imports
    },
  },
  optimizeDeps: {
    exclude: ["chunk-LVVT6BZO.js"],
  },
  build: {
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.mp4"], // Ensure these file types are included
    chunkSizeWarningLimit: 1000,
  },
});
