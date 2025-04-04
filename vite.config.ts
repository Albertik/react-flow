import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-flow/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  // Ensure that public files are copied to dist
  publicDir: "public",
});
