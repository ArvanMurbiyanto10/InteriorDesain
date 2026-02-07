import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Camera, Filter } from "lucide-react";
import Navbar from "./Navbar";
import "./ProjekPage.css";

// Import aset foto Anda di sini
import img1 from "../assets/foto-1.jpg";
import img2 from "../assets/foto-2.jpg";
import img3 from "../assets/foto-3.jpg";
import img5 from "../assets/foto-5.jpg";
import img6 from "../assets/foto-6.jpg";
import img7 from "../assets/foto-7.jpg";
import img8 from "../assets/foto-8.jpg";
import img10 from "../assets/foto-10.jpg";

const ALL_PROJECTS = [
  { id: 1, title: "Modern Minibar", cat: "Kitchen", img: img1 },
  { id: 2, title: "Scandinavian Kitchen", cat: "Kitchen", img: img7 },
  { id: 3, title: "Walk-in Closet Luxury", cat: "Wardrobe", img: img8 },
  { id: 4, title: "Backdrop TV Marmer", cat: "Living Room", img: img3 },
  { id: 5, title: "Master Bedroom Suite", cat: "Bedroom", img: img2 },
  { id: 6, title: "Office Meeting Room", cat: "Commercial", img: img5 },
  { id: 7, title: "Lemari Bawah Tangga", cat: "Wardrobe", img: img6 },
  { id: 8, title: "Classic Kitchen Set", cat: "Kitchen", img: img10 },
];

const CATEGORIES = ["Semua", "Kitchen", "Wardrobe", "Living Room", "Bedroom", "Commercial"];

const ProjekPage = () => {
  const [filter, setFilter] = useState("Semua");

  // FIX: Menghapus useState dan useEffect untuk filteredProjects.
  // Gunakan "Derived State" (dihitung langsung saat render).
  const filteredProjects = filter === "Semua" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter((p) => p.cat === filter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projek-root">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="projek-header">
        <div className="op10-container">
          <span className="subtitle">Portofolio Kami</span>
          <h1>Eksplorasi <br /><span className="italic-text">Karya & Kreasi</span>.</h1>
          <p className="header-desc">
            Kumpulan proyek interior pilihan yang telah kami selesaikan dengan ketelitian 20 tahun pengalaman. 
            Setiap karya adalah perpaduan antara fungsi ruang dan kepribadian pemiliknya.
          </p>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="filter-section">
        <div className="op10-container">
          <div className="filter-flex">
            <div className="filter-label">
              <Filter size={18} /> <span>Filter:</span>
            </div>
            <div className="filter-buttons">
              {CATEGORIES.map((c) => (
                <button 
                  key={c} 
                  className={filter === c ? "active" : ""} 
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="projek-gallery">
        <div className="op10-container">
          <div className="gallery-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="gallery-item">
                <div className="img-container">
                  <img src={project.img} alt={project.title} loading="lazy" />
                  <div className="item-overlay">
                    <div className="overlay-content">
                      <span>{project.cat}</span>
                      <h3>{project.title}</h3>
                      <Link to="/contact" className="btn-view-detail">
                        Konsultasi Projek <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="empty-state">
              <Camera size={48} />
              <p>Belum ada foto untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="projek-cta">
        <div className="op10-container">
          <div className="cta-card">
            <h2>Punya Visi Untuk Ruangan Anda?</h2>
            <p>Mari diskusikan konsep interior impian Anda bersama tim ahli kami di Depok.</p>
            <Link to="/contact" className="btn-cta-gold">Mulai Konsultasi</Link>
          </div>
        </div>
      </section>

      {/* Floating Back Button */}
      <Link to="/" className="btn-back-float">
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
};

export default ProjekPage;