import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
          firestore: ["firebase/firestore"],
        },
      },
    },
  },
});
