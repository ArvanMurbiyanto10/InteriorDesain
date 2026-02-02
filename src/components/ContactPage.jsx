import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, X } from "lucide-react";
import "./LandingPage.css";

function ContactPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="op10-root">
      <nav className="op10-nav scrolled">
        <div className="op10-container nav-flex">
          <div className="nav-brand">
            DOGER<span>.STUDIO</span>
          </div>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">Tentang</Link>
            <Link to="/services">Layanan</Link>
            <Link to="/projek">Galeri</Link>
            <Link to="/contact" className="active-link">
              Kontak
            </Link>
            <span
              className="close-menu mobile-only"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </span>
          </div>
          <button
            className="burger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
        </div>
      </nav>

      <header className="op10-section bg-white" style={{ paddingTop: "150px" }}>
        <div className="op10-container center">
          <h1>HUBUNGI KAMI</h1>
          <p>Silakan kontak kami via WhatsApp.</p>
        </div>
      </header>
      <Link to="/" className="op10-back-float">
        <ArrowLeft />
      </Link>
    </div>
  );
}

export default ContactPage; // <--- WAJIB ADA
