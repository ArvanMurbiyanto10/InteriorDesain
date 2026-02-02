import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, X } from "lucide-react";
import "./LandingPage.css"; // Pakai CSS yang sama

function AboutPage() {
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
            <Link to="/about" className="active-link">
              Tentang
            </Link>
            <Link to="/services">Layanan</Link>
            <Link to="/projek">Galeri</Link>
            <Link to="/contact">Kontak</Link>
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

      <header className="op10-section bg-cream" style={{ paddingTop: "150px" }}>
        <div className="op10-container center">
          <h1>TENTANG KAMI</h1>
          <p>Halaman ini berisi profil perusahaan Doger Interior.</p>
        </div>
      </header>

      <Link to="/" className="op10-back-float">
        <ArrowLeft />
      </Link>
    </div>
  );
}

export default AboutPage; // <--- WAJIB ADA
