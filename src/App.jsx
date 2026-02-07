import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// --- IMPORT PAGES ---
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage"; 
import ProjekPage from "./components/ProjekPage";
import ContactPage from "./components/ContactPage"; 

// --- IMPORT GLOBAL COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- UTILITY: SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="app-main-wrapper">
      {/* ScrollToTop tetap di sini, tapi tanpa bungkus <Router> */}
      <ScrollToTop />
      
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projek" element={<ProjekPage />} />      
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;