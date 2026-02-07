import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="footer-container">
        
        {/* --- BAGIAN ATAS (Grid Utama) --- */}
        <div className="footer-grid">
          
          {/* Kolom 1: Brand & About */}
          <div className="footer-brand">
            <h2 className="footer-logo">DOGER<span className="text-accent">.INTERIOR</span></h2>
            <p className="footer-desc">
              Mewujudkan ruang impian dengan harmoni material berkualitas tinggi dan desain fungsional yang berkarakter sejak 2004.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="social-link" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="mailto:info@dogerinterior.com" className="social-link" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="footer-links">
            <h3 className="footer-heading">Jelajahi</h3>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/about">Tentang Kami</Link></li>
              <li><Link to="/services">Layanan & Harga</Link></li>
              <li><Link to="/portfolio">Portofolio</Link></li>
              <li><Link to="/contact">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Lokasi */}
          <div className="footer-contact">
            <h3 className="footer-heading">Kantor & Workshop</h3>
            
            <div className="contact-item">
              <MapPin size={20} className="contact-icon" />
              <span>
                Jl. Margonda Raya No. 123<br/>
                Depok, Jawa Barat 16424
              </span>
            </div>
            
            <div className="contact-item">
              <Phone size={20} className="contact-icon" />
              <span>
                +62 812-3456-7890 (WhatsApp)<br/>
                (021) 7788-9900
              </span>
            </div>

            <div className="contact-item">
              <Mail size={20} className="contact-icon" />
              <span>consult@dogerinterior.com</span>
            </div>
          </div>

        </div>

        {/* --- BAGIAN BAWAH (Copyright) --- */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Doger Interior. All rights reserved.</p>
          <p style={{ opacity: 0.6 }}>Designed with precision in Depok.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;