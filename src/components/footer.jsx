import React from 'react';
import { Instagram, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="footer-container">
        
        <div className="footer-content">
          
          {/* KOLOM 1: BRAND & SOSMED */}
          <div className="f-col-brand">
            <h2 className="footer-logo">DOGER<span>.STUDIO</span></h2>
            <p className="footer-tagline">
              Jasa Interior & Kitchen Set Profesional Jabodetabek.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/doger.interior" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://wa.me/6285282773811" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <Phone size={24} />
              </a>
              <a href="mailto:doger.interior@gmail.com" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* KOLOM 2: ALAMAT & PETA */}
          <div className="f-col-address">
            <h3 className="footer-heading">ALAMAT WORKSHOP</h3>
            <p>
              Jl. H. Ahmad Nado 1 No.126,<br />
              Grogol, Limo, Kota Depok, Jawa Barat
            </p>
            <div className="footer-map">
              {/* Google Maps Embed */}
              <iframe 
                title="Lokasi Workshop Doger Interior"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.372274435372!2d106.7797743!3d-6.3457448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee804245763b%3A0x6c6c67530663737c!2sJl.%20H.%20Ahmad%20Nado%20No.126%2C%20Grogol%2C%20Kec.%20Limo%2C%20Kota%20Depok%2C%20Jawa%20Barat%2016512!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%" 
                height="100" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          {/* KOLOM 3: KONTAK CEPAT */}
          <div className="f-col-contact">
            <h3 className="footer-heading">KONTAK CEPAT</h3>
            <div className="contact-list">
              <p>WA: 0852-8277-3811</p>
              <p>Email: doger.interior@gmail.com</p>
              <p className="mt-2">Jam Kerja: Senin - Sabtu (08.00 - 17.00)</p>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Doger Interior. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;