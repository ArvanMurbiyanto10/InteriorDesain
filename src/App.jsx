import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage"; 
import ProjekPage from "./components/ProjekPage";
import ContactPage from "./components/ContactPage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/projek" element={<ProjekPage />} />       
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;