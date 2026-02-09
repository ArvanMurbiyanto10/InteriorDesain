import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

// Pastikan file ini ada di folder src/assets/
import logoDogger from "../assets/logo-dogger.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`op10-nav ${scrolled || !isHome ? "scrolled" : ""}`}>
      <div className="op10-container nav-flex">
        {/* BAGIAN KIRI: Logo */}
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu} className="brand-link">
            <img src={logoDogger} alt="Doger Interior" className="logo-img" />
            <div className="brand-text">
              DOGER<span>.INTERIOR</span>
            </div>
          </Link>
        </div>

        {/* BAGIAN TENGAH: Menu Link */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" onClick={closeMenu}>
            Tentang
          </Link>
          <Link to="/services" onClick={closeMenu}>
            Layanan
          </Link>
          <Link to="/projek" onClick={closeMenu}>
            Projek
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Kontak
          </Link>
        </div>

        {/* BAGIAN KANAN: Tombol & Burger */}
        <div className="nav-actions">
          <Link to="/contact" className="btn-nav-cta" onClick={closeMenu}>
            Konsultasi
          </Link>

          <button
            className="burger-menu"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
