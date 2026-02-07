import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Layout,
  Box,
  Layers,
  Globe,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Star,
  DollarSign,
  PenTool,
  MessageSquare,
} from "lucide-react";

import "./LandingPage.css";

// --- IMPORT ASSETS ---
// Pastikan path ini benar sesuai struktur folder kamu
import heroImg from "../assets/foto-9.jpg";
import img1 from "../assets/foto-1.jpg";
import img2 from "../assets/foto-2.jpg";
import img3 from "../assets/foto-3.jpg";
import img5 from "../assets/foto-5.jpg";
import img6 from "../assets/foto-6.jpg";
import img7 from "../assets/foto-7.jpg";
import img8 from "../assets/foto-8.jpg";
import img10 from "../assets/foto-10.jpg";

// --- DATA SERVICES ---
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

// --- DATA PROJECT CATEGORIES ---
const PROJECT_CATEGORIES = [
  {
    title: "KITCHEN SET & PANTRY",
    desc: "Spesialis Jasa Pembuatan Kitchen Set, Pantry, & Minibar Custom Anti-Rayap.",
    projectInfo: "Melayani Project Residential (Rumah/Apartemen) & Commercial Area.",
    hasContact: true,
    items: [
      { img: img1, title: "Modern Minibar", cat: "Kitchen" },
      { img: img7, title: "Scandinavian Kitchen", cat: "Kitchen" },
      { img: img2, title: "Dry Kitchen", cat: "Pantry" },
      { img: img10, title: "Classic Kitchen", cat: "Kitchen" },
      { img: img5, title: "Industrial Pantry", cat: "Pantry" },
      { img: img8, title: "Wet Kitchen", cat: "Kitchen" },
    ],
  },
  {
    title: "WARDROBE & LEMARI",
    items: [
      { img: img8, title: "Walk-in Closet", cat: "Master Bedroom" },
      { img: img2, title: "Lemari Anak", cat: "Kids Room" },
      { img: img6, title: "Lemari Bawah Tangga", cat: "Storage" },
      { img: img3, title: "Glass Wardrobe", cat: "Luxury" },
      { img: img1, title: "Sliding Door", cat: "Minimalist" },
      { img: img7, title: "Open Wardrobe", cat: "Modern" },
    ],
  },
  {
    title: "LIVING ROOM & BACKDROP TV",
    items: [
      { img: img3, title: "Backdrop Marmer", cat: "Living Room" },
      { img: img5, title: "Partisi Kisi-kisi", cat: "Divider" },
      { img: img10, title: "Meja Console", cat: "Foyer" },
      { img: img6, title: "Rak Display", cat: "Living Room" },
      { img: img2, title: "Sofa Background", cat: "Wall Panel" },
      { img: img8, title: "Floating Cabinet", cat: "TV Unit" },
    ],
  },
  {
    title: "KAMAR TIDUR (BEDROOM)",
    items: [
      { img: img2, title: "Master Bedroom", cat: "Luxury" },
      { img: img1, title: "Dipan Laci", cat: "Storage Bed" },
      { img: img7, title: "Headboard Panel", cat: "Bedroom" },
      { img: img3, title: "Meja Rias Custom", cat: "Vanity" },
      { img: img5, title: "Nakas Gantung", cat: "Bedside" },
      { img: img10, title: "Kamar Tamu", cat: "Guest Room" },
    ],
  },
  {
    title: "COMMERCIAL & OFFICE",
    items: [
      { img: img5, title: "Meeting Room", cat: "Office" },
      { img: img6, title: "Resepsionis", cat: "Lobby" },
      { img: img10, title: "Cafe Counter", cat: "F&B" },
      { img: img1, title: "Workstation", cat: "Office" },
      { img: img8, title: "Display Toko", cat: "Retail" },
      { img: img3, title: "Waiting Area", cat: "Clinic" },
    ],
  },
];

// --- DATA FAQ ---
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

// --- KOMPONEN PROJECT SLIDER ---
const ProjectSlider = ({ title, desc, projectInfo, hasContact, items }) => {
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) setItemsPerPage(3);
      else if (window.innerWidth >= 600) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = items.length - itemsPerPage;
  const nextSlide = () =>
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <div className="project-category-wrapper fade-up">
      {/* Header Kategori */}
      <div className="cat-header-box">
        <h3 className="cat-title">{title}</h3>
        <div className="cat-divider"></div>

        {/* Deskripsi (Jika Ada) */}
        {(desc || projectInfo) && (
          <div className="cat-text-content">
            {desc && <p className="cat-desc">{desc}</p>}
            {projectInfo && <p className="cat-info">{projectInfo}</p>}
          </div>
        )}

        {/* Tombol WA (Khusus Kategori Pertama) */}
        {hasContact && (
          <div className="cat-action">
            <a
              href="https://wa.me/6285282773811?text=Halo%20Doger%20Interior,%20saya%20tertarik%20melihat%20portfolio%20Kitchen%20Set."
              target="_blank"
              rel="noreferrer"
              className="btn-gold-outline"
            >
              <MessageCircle size={18} /> Hubungi Kami via WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Slider Area */}
      <div className="slider-container-relative">
        <button onClick={prevSlide} className="btn-nav-abs left">
          <ChevronLeft size={28} />
        </button>

        <div className="carousel-window-small">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${current * (100 / itemsPerPage)}%)`,
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="carousel-card-small"
                style={{ minWidth: `${100 / itemsPerPage}%` }}
              >
                <div className="gal-item-card-small">
                  <img src={item.img} alt={item.title} />
                  <div className="gal-overlay-gradient"></div>{" "}
                  <div className="gal-content-bottom">
                    <span className="gal-cat-badge">{item.cat}</span>
                    <h4>{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={nextSlide} className="btn-nav-abs right">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

// --- MAIN LANDING PAGE COMPONENT ---
function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({ nama: "", wa: "", pesan: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const kirimKeWA = (e) => {
    e.preventDefault();
    const nomorHP = "6285282773811";
    const text = `Halo Doger Interior, perkenalkan saya *${formData.nama}* (No.WA: ${formData.wa}).%0A%0ASaya ingin konsultasi: ${formData.pesan}`;
    window.open(`https://wa.me/${nomorHP}?text=${text}`, "_blank");
  };

  return (
    <div className="op10-root">
      {/* NAVBAR SUDAH DIHAPUS (Karena ada di App.jsx) */}

      {/* 2. HERO SECTION */}
      <header id="hero" className="op10-hero-split">
        <div className="hero-left">
          <div className="hl-content fade-up">
            <span className="badge-hero">EST. 2004 — DEPOK</span>
            <h1 className="hero-title">
              Wujudkan Interior <br />
              <span className="text-highlight">Impian Anda</span>
            </h1>
            <p className="hero-desc">
              Spesialis Kitchen Set & Interior Custom dengan material premium
              anti-rayap. Desain mewah, harga transparan, dan bergaransi.
            </p>
            <div className="hero-btns">
              <Link to="/contact" className="btn-primary">
                Hubungi Kami <ArrowRight size={18} />
              </Link>
              <Link to="/projek" className="btn-secondary">
                Lihat Karya
              </Link>
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
        <div className="hero-right fade-in">
          <img src={heroImg} alt="Luxury Kitchen Set" />
          <div className="hero-overlay-deco"></div>
        </div>
      </header>

      {/* --- NEW WELCOME SECTION --- */}
      <section className="welcome-section bg-white">
        <div className="op10-container">
          {/* Top Bar with Ribbon */}
          <div className="welcome-top fade-up">
            <div className="welcome-ribbon">
              <h2>Welcome To Our Website</h2>
            </div>
            <div className="welcome-brand">
              <div className="wb-logo">
                DOGER <span>INTERIOR</span>
              </div>
              <div className="wb-divider"></div>
              <Link to="/contact" className="btn-consult-small">
                Konsultasi
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="welcome-main-card fade-up delay-1">
            <div className="wm-header">
              <h1>
                <span className="accent-text">Doger Interior</span> - Jasa
                Interior Kitchen Set
              </h1>
              <div className="wm-line"></div>
            </div>
            <div className="wm-body">
              <p className="lead-paragraph">
                <strong>Doger Interior</strong> merupakan spesialis{" "}
                <em>jasa Interior Kitchen Set</em>. Kami melayani jasa pembuatan
                kitchen set aluminium minimalis baik untuk rumah, kantor, hotel,
                apartemen, restaurant dan lainnya.
              </p>
              <p className="secondary-paragraph">
                Di sini, Anda dapat memilih bentuk layout dapur yang bisa Anda
                terapkan pada kitchen set rumah Anda. Mulai dari{" "}
                <strong>bentuk C, I ,G, L</strong> atau{" "}
                <strong>bentuk U</strong>. Untuk harga kitchen set per meter,
                harga kitchen set aluminium, harga kitchen set di Jakarta, kami
                memberikan harga murah dan terjangkau untuk para customer.
              </p>
            </div>
          </div>
        </div>

        {/* Floating WA Button */}
        <a
          href="https://wa.me/6285282773811"
          target="_blank"
          rel="noreferrer"
          className="float-wa"
          aria-label="WhatsApp"
        >
          <MessageCircle size={32} />
        </a>
      </section>

      {/* 3. ABOUT SECTION (MENGAPA MEMILIH...) */}
      <section id="about" className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="about-img-wrap fade-up delay-1">
            <img src={img2} alt="About Us" />
            <div className="exp-badge">
              <span>20+ TH</span>
              <small>PENGALAMAN</small>
            </div>
          </div>

          <div className="about-text fade-up delay-2">
            <span className="sub-head">TENTANG KAMI</span>
            <h2>MENGAPA MEMILIH DOGER INTERIOR?</h2>
            <p
              style={{
                marginBottom: "30px",
                fontSize: "0.95rem",
                color: "#666",
              }}
            >
              Kami memahami bahwa rumah adalah investasi jangka panjang, itulah
              sebabnya kami berkomitmen memberikan yang terbaik melalui:
            </p>

            {/* 5 POINT CARDS (VERTIKAL) */}
            <div className="vertical-features-list">
              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <ShieldCheck size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Opsi Material Beragam</h4>
                  <p>
                    Pilih material yang dapat disesuaikan mulai dari Aluminium
                    (anti-rayap), Multiplek, maupun PVC Board.
                  </p>
                </div>
              </div>

              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <Star size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Transparansi Proyek</h4>
                  <p>
                    Update perkembangan pengerjaan secara berkala agar hasil
                    selalu terpantau dan sesuai ekspektasi.
                  </p>
                </div>
              </div>

              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <DollarSign size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Harga Terbaik</h4>
                  <p>Penawaran harga yang kompetitif dan transparan.</p>
                </div>
              </div>

              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <PenTool size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Custom Sesuai Keinginan</h4>
                  <p>
                    Desain fleksibel mengikuti preferensi estetika anda
                    (Minimalis, Klasik, dll).
                  </p>
                </div>
              </div>

              <div className="v-feature-card">
                <div className="v-icon-circle">
                  <MessageSquare size={28} />
                </div>
                <div className="v-card-text">
                  <h4>Konsultasi Fleksibel</h4>
                  <p>
                    Layanan diskusi dua arah yang dapat dilakukan secara
                    online/offline.
                  </p>
                </div>
              </div>
            </div>
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

      {/* SECTION 1: SPESIALIS BAHAN */}
      <section className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="specialist-content fade-up">
            <span className="sub-head">MATERIAL & KUALITAS</span>
            <h2>SPESIALIS PEMAKAIAN BAHAN</h2>
            <p>
              Kami mengutamakan durabilitas dan estetika. Material yang kami
              gunakan dipilih secara ketat.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Kayu Solid & Plywood Grade A</strong>
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Finishing HPL Premium</strong>
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Aksesoris Berkualitas</strong>
              </li>
            </ul>
            <Link to="/contact" className="btn-primary mt-20">
              Hubungi Kami
            </Link>
          </div>
          <div className="specialist-img fade-up delay-1">
            <img src={img10} alt="Detail Material Kayu" />
            <div className="material-badge">
              <span>PREMIUM</span>
              <small>QUALITY</small>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DESAIN & PRESISI */}
      <section className="op10-section bg-cream">
        <div className="op10-container grid-2-reverse">
          <div className="specialist-img fade-up delay-1">
            <img src={img10} alt="Detail Material Kayu" />
            <div className="material-badge badge-left">
              <span>PREMIUM</span>
              <small>QUALITY</small>
            </div>
          </div>
          <div className="specialist-content fade-up">
            <span className="sub-head">MATERIAL & KUALITAS</span>
            <h2>SPESIALIS PEMAKAIAN BAHAN</h2>
            <p>
              Kami mengutamakan durabilitas dan estetika. Material yang kami
              gunakan dipilih secara ketat.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Kayu Solid & Plywood Grade A</strong>
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Finishing HPL Premium</strong>
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Aksesoris Berkualitas</strong>
              </li>
            </ul>
            <Link to="/contact" className="btn-primary mt-20">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: FUNGSIONAL & RAPI */}
      <section className="op10-section bg-cream">
        <div className="op10-container grid-2">
          <div className="specialist-content fade-up">
            <span className="sub-head">FUNGSIONAL & RAPI</span>
            <h2>RUANG PENYIMPANAN MAKSIMAL</h2>
            <p>
              Interior bukan hanya soal tampilan, tapi juga fungsi. Kami
              merancang lemari dan kabinet dengan sistem penyimpanan cerdas.
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Rak Adjustable</strong>
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Hidden Storage</strong>
              </li>
              <li>
                <CheckCircle size={18} className="icon-check" />{" "}
                <strong>Lighting Integration</strong>
              </li>
            </ul>
            <Link to="/contact" className="btn-primary mt-20">
              Hubungi Kami
            </Link>
          </div>
          <div className="specialist-img fade-up delay-1">
            <img src={img8} alt="Fungsional Storage" />
            <div className="material-badge">
              <span>SMART</span>
              <small>DESIGN</small>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALLERY SECTION */}
      <section id="gallery" className="op10-section bg-dark text-cream">
        <div className="op10-container">
          <div className="section-head center fade-up">
            <span className="sub-head text-cream">PORTOFOLIO</span>
            <h2>HASIL KARYA KAMI</h2>
            <p style={{ maxWidth: "600px", margin: "0 auto", opacity: 0.8 }}>
              Jelajahi berbagai kategori proyek.
            </p>
          </div>
          <div className="multi-slider-wrapper">
            {PROJECT_CATEGORIES.map((category, idx) => (
              <ProjectSlider
                key={idx}
                title={category.title}
                desc={category.desc}
                projectInfo={category.projectInfo}
                hasContact={category.hasContact}
                items={category.items}
              />
            ))}
          </div>
          <div className="center mt-30">
            <a
              href="https://instagram.com/doger.interior"
              className="link-arrow justify-center"
            >
              Lihat Lebih Banyak di Instagram <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 7. FAQ & CONTACT */}
      <section id="contact" className="op10-section bg-cream">
        <div className="op10-container grid-2-faq">
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
                    {faq.q}{" "}
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

      {/* FOOTER SUDAH DIHAPUS (Karena ada di App.jsx) */}
    </div>
  );
}

export default LandingPage;