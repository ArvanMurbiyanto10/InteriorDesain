import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Building2,
  Utensils,
  Coffee,
  Briefcase,
  Palmtree,
  CheckCircle2,
  Clock,
  Hammer,
  Compass,
  PenTool,
  FileText,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

import Navbar from "./Navbar";
import "./AboutPage.css";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="op10-root">
      <Navbar />

      <main>
        {/* --- SECTION 1: HERO --- */}
        <section className="section-hero op10-container">
          <div className="hero-grid">
            {/* Kolom Teks */}
            <div className="hero-text">
              <span className="sub-header">Profil Perusahaan</span>
              <h1 className="main-header">Doger Interior</h1>
              <p className="text-paragraph">
                Selama kami berkarya, kami percaya bahwa kualitas sejati adalah
                harmoni antara ketahanan material dengan kenyamanan penghuninya.
                Bagi kami, setiap proyek bukan hanya sekadar memproduksi
                furniture, melainkan sebuah kolaborasi erat untuk menciptakan
                ruangan yang benar-benar mewakili karakter Anda.
              </p>
            </div>
            {/* Kolom Foto */}
            <div className="hero-image-wrapper">
              <span style={{ textAlign: "center", padding: "20px" }}>
                (Masukkan Foto Workshop/Interior Disini)
                <br />
                <small>Ukuran rekomendasi: 600x600px</small>
              </span>
              <div className="est-badge">Est. 2004 — Depok</div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: STATISTIK --- */}
        <section className="section-stats">
          <div className="op10-container">
            <div className="stats-grid">
              <StatBox
                icon={<TrendingUp size={32} />}
                number="20+"
                label="Tahun Pengalaman"
              />
              <StatBox
                icon={<CheckCircle2 size={32} />}
                number="300+"
                label="Proyek Selesai"
              />
              <StatBox
                icon={<Users size={32} />}
                number="100%"
                label="Klien Puas"
              />
              <StatBox
                icon={<Award size={32} />}
                number="A+"
                label="Grade Material"
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 3: FILOSOFI --- */}
        <section className="section-philosophy op10-container">
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <h2 className="main-header" style={{ fontSize: "2.5rem" }}>
              Standar & Filosofi Kami
            </h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                backgroundColor: "var(--color-cream)",
                margin: "0 auto",
              }}
            ></div>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <h3>Material Adalah Kunci</h3>
              <p className="text-paragraph">
                Kami percaya setiap ruang memiliki cerita unik. Doger Interior
                mengintegrasikan keahlian teknis yang terasah selama 20 tahun
                dengan detail desain yang dipersonalisasikan sepenuhnya. Kami
                menciptakan solusi ruang cerdas melalui penguasaan berbagai
                material unggulan.
              </p>
            </div>
            <div className="philosophy-card">
              <h3>Transparansi Total</h3>
              <p className="text-paragraph">
                Kami menjunjung tinggi profesionalisme melalui transparansi di
                setiap langkah. Kami memastikan Anda selalu mendapatkan update
                perkembangan proyek secara nyata dan berkala sehingga Anda
                memiliki ketenangan pikiran penuh selama proses produksi.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: ALUR KERJA --- */}
        <section className="section-process">
          <div className="op10-container">
            <div style={{ marginBottom: "60px", textAlign: "center" }}>
              <span className="sub-header">Tahapan Pemesanan</span>
              <h2 className="main-header" style={{ fontSize: "2.5rem" }}>
                Proses Terstruktur
              </h2>
            </div>

            <div className="process-grid">
              <ProcessCard
                step="01"
                icon={<Compass size={28} />}
                title="Konsultasi"
                desc="Diskusikan kebutuhan, konsep, dan material bersama tim kami baik secara online atau offline."
              />
              <ProcessCard
                step="02"
                icon={<TrendingUp size={28} />}
                title="Survey Lokasi"
                desc="Tim kami melakukan pengukuran secara langsung di lokasi client untuk hasil presisi."
              />
              <ProcessCard
                step="03"
                icon={<PenTool size={28} />}
                title="Design 3D"
                desc="Visualisasi professional untuk memastikan desain mencapai kesepakatan final."
              />
              <ProcessCard
                step="04"
                icon={<FileText size={28} />}
                title="Invoice & DP"
                desc="Pembayaran DP 1 untuk mengikat jadwal produksi dan pemesanan material."
              />
              <ProcessCard
                step="05"
                icon={<Hammer size={28} />}
                title="Produksi"
                desc="Pengerjaan interior di workshop kami sesuai spesifikasi teknis yang disetujui."
              />
              <ProcessCard
                step="06"
                icon={<CheckCircle2 size={28} />}
                title="Instalasi"
                desc="Proses pemasangan akhir di lokasi hingga proyek selesai sempurna."
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 5: TEAM / WORKSHOP --- */}
        <section className="op10-container" style={{ padding: "100px 0" }}>
          <div
            className="hero-image-wrapper"
            style={{ height: "400px", background: "#ddd" }}
          >
            <div style={{ textAlign: "center", zIndex: 1 }}>
              (Foto Besar Suasana Workshop)
              <br />
              <small>Menunjukkan kesibukan dan alat-alat</small>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: PROJECT SCOPE --- */}
        <section className="section-scope">
          <div className="op10-container" style={{ textAlign: "center" }}>
            <h3
              style={{
                marginBottom: "40px",
                fontSize: "1.5rem",
                fontFamily: "var(--font-heading)",
              }}
            >
              Project Scope
            </h3>
            <div className="scope-grid">
              <ScopeItem icon={<Home size={28} />} label="Home" />
              <ScopeItem icon={<Building2 size={28} />} label="Apartment" />
              <ScopeItem icon={<Palmtree size={28} />} label="Villa" />
              <ScopeItem icon={<Coffee size={28} />} label="Cafe" />
              <ScopeItem icon={<Utensils size={28} />} label="Resto" />
              <ScopeItem icon={<Briefcase size={28} />} label="Office" />
            </div>
          </div>
        </section>
      </main>

      <Link to="/" className="back-float">
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

// --- SUB-KOMPONEN (Updated) ---

const StatBox = ({ icon, number, label }) => (
  <div className="stat-box">
    <div style={{ marginBottom: "15px", opacity: 0.8 }}>{icon}</div>
    <div className="stat-number">{number}</div>
    <div
      style={{
        fontSize: "0.9rem",
        textTransform: "uppercase",
        letterSpacing: "1px",
        opacity: 0.9,
      }}
    >
      {label}
    </div>
  </div>
);

const ProcessCard = ({ step, icon, title, desc }) => (
  <div className="process-card">
    <span className="process-step-number">{step}</span>
    <div className="process-content">
      <div style={{ color: "var(--color-brown)", marginBottom: "15px" }}>
        {icon}
      </div>
      <h4
        style={{
          fontWeight: "700",
          marginBottom: "10px",
          color: "var(--color-dark)",
          fontSize: "1.2rem",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: "0.95rem",
          color: "var(--color-gray)",
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
    </div>
  </div>
);

const ScopeItem = ({ icon, label }) => (
  <div className="scope-item">
    {icon}
    <span>{label}</span>
  </div>
);

export default AboutPage;
