import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "unaidedly-nonsaturated-kynlee.ngrok-free.dev",
      ".ngrok-free.dev" // Mengizinkan semua subdomain ngrok
    ],
    historyApiFallback: true, // Memastikan routing React jalan saat refresh
    host: true, // Penting agar bisa diakses dari jaringan luar
  },
});
