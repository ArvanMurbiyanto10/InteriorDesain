// src/api.js
import axios from 'axios';

// Gunakan link ngrok yang sedang aktif di terminal kamu
const BASE_URL = 'https://tomasa-ridiculous-klara.ngrok-free.dev'; 

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true', // Penting untuk bypass warning ngrok
  }
});

export const IMAGE_URL = `${BASE_URL}/uploads/`;
export default API; 