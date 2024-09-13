import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api/device-image": {
        target: "https://fdn2.gsmarena.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/device-image/, ""),
        secure: false,
      },
    },
  },
});
