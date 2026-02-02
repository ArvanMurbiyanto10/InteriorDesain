import React from "react";
// HAPUS BrowserRouter as Router dari sini jika sudah ada di main.jsx
// TAPI amannya, kita ganti importnya jadi begini:
import { Routes, Route } from "react-router-dom";

// Import Halaman
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage";
import ProjekPage from "./components/ProjekPage";
import ContactPage from "./components/ContactPage";

function App() {
  return (
    // HAPUS <Router> DI SINI
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/projek" element={<ProjekPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
    // HAPUS </Router> DI SINI
  );
}

export default App;
