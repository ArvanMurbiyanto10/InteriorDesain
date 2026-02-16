import axios from "axios";

// --- KONFIGURASI URL ---
// 1. Link Ngrok Backend (Ganti jika expired)
const NGROK_URL = "https://unaidedly-nonsaturated-kynlee.ngrok-free.dev";

// 2. Logika Deteksi Otomatis
// Jika buka di Laptop -> Pakai Localhost (Cepat & Stabil)
// Jika buka di HP -> Pakai Ngrok
const BASE_URL = "http://localhost:5000"; // Gunakan localhost untuk backend agar stabil saat presentasi

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    // HANYA Header ini yang boleh ada (khusus Ngrok).
    // JANGAN PERNAH MENAMBAHKAN 'Content-Type': 'multipart/form-data' DI SINI!
    "ngrok-skip-browser-warning": "true",
  },
});

console.log("🔗 API Connected to:", BASE_URL);

// Export helper URL agar bisa dipakai di komponen lain
export const IMAGE_URL = `${BASE_URL}/uploads/`;

export default API;
