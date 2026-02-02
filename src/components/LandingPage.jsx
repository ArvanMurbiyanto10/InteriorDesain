import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle,
  Layout,
  Box,
  Layers,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// PENTING: Import CSS yang sudah di-rename
import "./LandingPage.css";

// --- IMPORT ASSETS ---
import heroImg from "../assets/foto-9.jpg";
import img1 from "../assets/foto-1.jpg";
import img2 from "../assets/foto-2.jpg";
import img3 from "../assets/foto-3.jpg";
import img5 from "../assets/foto-5.jpg";
import img6 from "../assets/foto-6.jpg";
import img7 from "../assets/foto-7.jpg";
import img8 from "../assets/foto-8.jpg";
import img10 from "../assets/foto-10.jpg";

// --- DATA ---
const SERVICES_DATA = [
  {
    id: "kitchen",
    title: "Kitchen Set",
    desc: "Dapur ergonomis dengan material anti-rayap (PVC) atau HPL Premium.",
    img: img7,
    icon: <Layout />,
  },
  {
    id: "wardrobe",
    title: "Wardrobe",
    desc: "Lemari pakaian full-plafon dengan desain mewah dan fungsional.",
    img: img8,
    icon: <Box />,
  },
  {
    id: "living",
    title: "Living Room",
    desc: "Backdrop TV dan partisi ruangan yang mempercantik hunian.",
    img: img3,
    icon: <Layers />,
  },
  {
    id: "commercial",
    title: "Commercial",
    desc: "Interior kantor dan cafe yang meningkatkan citra bisnis Anda.",
    img: img5,
    icon: <Globe />,
  },
];

const GALLERY_ITEMS = [
  { img: img1, title: "Modern Pantry", cat: "Kitchen" },
  { img: img2, title: "Walk-in Closet", cat: "Bedroom" },
  { img: img10, title: "Coffee Bar", cat: "Commercial" },
  { img: img6, title: "Office Lobby", cat: "Office" },
];

const FAQ_DATA = [
  {
    q: "Berapa lama pengerjaan?",
    a: "Estimasi 14-21 hari kerja setelah desain 3D disetujui, tergantung antrian produksi.",
  },
  {
    q: "Apakah survei gratis?",
    a: "Ya, Survei & Konsultasi GRATIS untuk seluruh wilayah Jabodetabek.",
  },
  {
    q: "Material apa yang dipakai?",
    a: "Kami menggunakan Multiplek, Blockmin, atau PVC Board (Anti Rayap) dengan finishing HPL/Duco.",
  },
];

// --- MAIN COMPONENT (Nama Diganti jadi LandingPage) ---

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // State untuk Form WhatsApp
  const [formData, setFormData] = useState({ nama: "", wa: "", pesan: "" });

  // Handle Scroll Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Input Form
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi Kirim ke WA
  const kirimKeWA = (e) => {
    e.preventDefault();
    const nomorHP = "6285282773811";
    const text = `Halo Doger Interior, perkenalkan saya *${formData.nama}* (No.WA: ${formData.wa}).%0A%0ASaya ingin konsultasi: ${formData.pesan}`;
    window.open(`https://wa.me/${nomorHP}?text=${text}`, "_blank");
  };

  return (
    <div className="op10-root">
      {/* 1. NAVBAR (Sticky & Solid) */}
      <nav className={`op10-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="op10-container nav-flex">
          <div className="nav-brand">
            DOGER<span>.STUDIO</span>
          </div>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="#hero" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              Tentang
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Layanan
            </a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>
              Galeri
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Kontak
            </a>
            <span
              className="close-menu mobile-only"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </span>
          </div>

          <div className="nav-actions">
            <a href="#contact" className="btn-nav-cta">
              Konsultasi
            </a>
            <button
              className="burger-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="hero" className="op10-hero-split">
        {/* Kiri: Teks */}
        <div className="hero-left">
          <div className="hl-content fade-up">
            <span className="badge-hero">EST. 2024 — DEPOK</span>
            <h1 className="hero-title">
              Wujudkan Interior <br />
              <span className="text-highlight">Impian Anda</span>
            </h1>
            <p className="hero-desc">
              Spesialis Kitchen Set & Interior Custom dengan material premium
              anti-rayap. Desain mewah, harga transparan, dan bergaransi.
            </p>
            <div className="hero-btns">
              <a href="#contact" className="btn-primary">
                Hubungi Kami <ArrowRight size={18} />
              </a>
              <a href="#gallery" className="btn-secondary">
                Lihat Karya
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>300+</strong>
                <span>Proyek</span>
              </div>
              <div className="sep"></div>
              <div>
                <strong>100%</strong>
                <span>Custom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kanan: Gambar */}
        <div className="hero-right fade-in">
          <img src={heroImg} alt="Luxury Kitchen Set" />
          <div className="hero-overlay-deco"></div>
        </div>
      </header>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="about-img-wrap fade-up delay-1">
            <img src={img2} alt="About Us" />
            <div className="exp-badge">
              <span>5+ TH</span>
              <small>PENGALAMAN</small>
            </div>
          </div>
          <div className="about-text fade-up delay-2">
            <span className="sub-head">TENTANG KAMI</span>
            <h2>MENGAPA MEMILIH DOGER INTERIOR?</h2>
            <p>
              Kami mengerti bahwa rumah adalah investasi jangka panjang. Oleh
              karena itu, kami hanya menggunakan material terbaik (PVC
              Board/Multiplek) dan aksesoris berkualitas tinggi agar interior
              Anda awet puluhan tahun.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle size={18} className="icon-check" /> Material Anti
                Rayap (Opsional)
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" /> Finishing HPL
                Presisi
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" /> Garansi
                Konstruksi & Maintenance
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="op10-section bg-white">
        <div className="op10-container">
          <div className="section-head center fade-up">
            <span className="sub-head">LAYANAN KAMI</span>
            <h2>SOLUSI INTERIOR LENGKAP</h2>
          </div>

          <div className="services-grid-cards">
            {SERVICES_DATA.map((srv, index) => (
              <div
                key={srv.id}
                className="srv-card fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="srv-img">
                  <img src={srv.img} alt={srv.title} />
                  <div className="srv-icon-box">{srv.icon}</div>
                </div>
                <div className="srv-body">
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section id="gallery" className="op10-section bg-dark text-cream">
        <div className="op10-container">
          <div className="header-flex fade-up">
            <div>
              <span className="sub-head text-cream">PORTOFOLIO</span>
              <h2>HASIL KARYA TERBARU</h2>
            </div>
            <a
              href="https://instagram.com/doger.interior"
              className="link-arrow"
            >
              Lihat Instagram <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="gallery-grid-simple">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="gal-item fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img src={item.img} alt={item.title} />
                <div className="gal-overlay">
                  <h4>{item.title}</h4>
                  <span>{item.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ & CONTACT FORM */}
      <section id="contact" className="op10-section bg-cream">
        <div className="op10-container grid-2-faq">
          {/* FAQ (Kiri) */}
          <div className="faq-left fade-up">
            <span className="sub-head">PERTANYAAN UMUM</span>
            <h2>YANG SERING DITANYAKAN</h2>
            <div className="faq-wrapper">
              {FAQ_DATA.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-box ${openFaq === i ? "open" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="faq-head">
                    {faq.q}
                    {openFaq === i ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                  {openFaq === i && <div className="faq-body">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Form WhatsApp (Kanan) */}
          <div className="contact-right fade-up delay-2">
            <div className="form-card">
              <h3>Mulai Konsultasi Gratis</h3>
              <p>Isi form di bawah, kami akan membalas via WhatsApp.</p>

              <form onSubmit={kirimKeWA}>
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    placeholder="Contoh: Bpk. Budi"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nomor WhatsApp</label>
                  <input
                    type="tel"
                    name="wa"
                    placeholder="08xxxxx"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Kebutuhan Anda</label>
                  <textarea
                    name="pesan"
                    rows="3"
                    placeholder="Saya mau buat kitchen set ukuran..."
                    onChange={handleInput}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-100">
                  KIRIM PESAN SEKARANG
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="op10-footer">
        <div className="op10-container footer-content">
          <div className="f-brand">
            <h2>
              DOGER<span>.STUDIO</span>
            </h2>
            <p>Jasa Interior & Kitchen Set Profesional Jabodetabek.</p>
            <div className="f-sosmed">
              <a href="#">
                <Instagram size={20} />
              </a>
              <a href="#">
                <Phone size={20} />
              </a>
              <a href="#">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="f-info">
            <h5>ALAMAT WORKSHOP</h5>
            <p>
              Jl. H. Ahmad Nado 1 No.126,
              <br />
              Grogol, Limo, Kota Depok, Jawa Barat
            </p>
            {/* Google Maps Embed */}
            <div className="map-frame">
              <iframe
                title="Lokasi Doger Interior"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.234!2d106.77!3d-6.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjEnMzYuMCJTIDEwNsKwNDYnMTIuMCJF!5e0!3m2!1sen!2sid!4v1600000000000!5m2!1sen!2sid"
                width="100%"
                height="100"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="f-contact">
            <h5>KONTAK CEPAT</h5>
            <p>WA: 0852-8277-3811</p>
            <p>Email: doger.interior@gmail.com</p>
            <p>Jam Kerja: Senin - Sabtu (08.00 - 17.00)</p>
          </div>
        </div>
        <div className="footer-copyright">
          © 2026 Doger Interior. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

// Export nama baru
export default LandingPage;
