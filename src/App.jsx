import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// --- IMPORT PAGES ---
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage"; 
import ProjekPage from "./components/ProjekPage";
import ContactPage from "./components/ContactPage"; 

// --- IMPORT ADMIN & LOGIN PAGES ---
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";

// --- IMPORT GLOBAL COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- UTILITY: SCROLL TO TOP ---
// Fungsi agar setiap pindah halaman, tampilan otomatis ke atas
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- PROTEKSI RUTE (SATIPAM) ---
// Komponen ini memastikan hanya yang sudah login bisa masuk ke /admin
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();

  // Logika untuk menyembunyikan Navbar dan Footer di halaman Admin atau Login
  // agar tampilan dashboard lebih fokus dan bersih.
  const isHideLayout = location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <div className="app-main-wrapper">
      <ScrollToTop />
      
      {/* Navbar hanya muncul jika bukan di halaman admin/login */}
      {!isHideLayout && <Navbar />}

      <Routes>
        {/* RUTE PUBLIK (Bisa diakses siapa saja) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projek" element={<ProjekPage />} />      
        <Route path="/contact" element={<ContactPage />} />
        
        {/* RUTE LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* RUTE ADMIN (DIPROTEKSI) */}
        {/* Jika user mencoba akses /admin tanpa login, akan dilempar ke /login */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } 
        />
      </Routes>

      {/* Footer hanya muncul jika bukan di halaman admin/login */}
      {!isHideLayout && <Footer />}
    </div>
  );
}

export default App;