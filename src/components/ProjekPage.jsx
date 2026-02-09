import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ArrowRight, Loader, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import "./ProjekPage.css";

const API_URL = "http://localhost:5000";

const ProjectCard = ({ item }) => {
  const scrollRef = useRef(null);
  
  // Data dasar: Gabungkan thumbnail dan galeri
  const baseImages = item.gallery && item.gallery.length > 0 ? item.gallery : [item.foto];
  
  // Trik Seamless: Lipat tiga array gambar agar tidak ada ujungnya
  const infiniteImages = [...baseImages, ...baseImages, ...baseImages];

  const scroll = (direction) => {
  const { current } = scrollRef;
  if (current) {
    const itemWidth = 200; // Lebar foto + Gap
    const maxScroll = current.scrollWidth;
    const viewWidth = current.clientWidth;

    if (direction === 'right') {
      // JUMP LOGIC: Jika sudah sisa sedikit lagi mau habis (mendekati ujung kanan)
      // Kita kembalikan ke area tengah secara instan sebelum geser lagi
      if (current.scrollLeft + viewWidth >= maxScroll - (itemWidth * 2)) {
        current.scrollLeft = maxScroll / 3; 
      }
      current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    } else {
      // JUMP LOGIC: Jika sudah mau habis ke arah kiri
      if (current.scrollLeft <= itemWidth * 2) {
        current.scrollLeft = maxScroll / 3;
      }
      current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  }
};

  // Saat pertama kali muncul, posisikan scroll di tengah (set ke-2 dari 3)
  useEffect(() => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      current.scrollLeft = current.scrollWidth / 3;
    }
  }, []);

  return (
    <div className="card-proyek-premium fade-up">
      {/* 1. Header Cokelat Sesuai Referensi */}
      <div className="card-header-premium">
        <div className="header-info">
          <h2 className="title-proyek">{item.judul}</h2>
          <p className="subtitle-proyek">Proyek: {item.klien || "Eksklusif"}</p>
          <a 
            href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan proyek ${item.judul}`} 
            target="_blank" 
            rel="noreferrer"
            className="btn-hubungi-outline"
          >
            HUBUNGI KAMI <ArrowRight size={14}/>
          </a>
        </div>
      </div>

      {/* 2. Strip Galeri dengan Navigasi */}
      <div className="card-body-gallery">
        <div className="relative-container">
          
          <button className="nav-arrow left" onClick={() => scroll('left')}>
            <ChevronLeft size={24} />
          </button>

          <div className="horizontal-scroll-mask" ref={scrollRef}>
            {infiniteImages.map((foto, idx) => (
              <div key={idx} className="square-item">
                <img 
                  src={`${API_URL}/uploads/${foto}`} 
                  alt="interior" 
                  onError={(e) => { e.target.src="https://placehold.co/400x400?text=Interior" }}
                />
              </div>
            ))}
          </div>

          <button className="nav-arrow right" onClick={() => scroll('right')}>
            <ChevronRight size={24} />
          </button>
          
        </div>
      </div>
    </div>
  );
};

const ProjekPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/projects?t=${Date.now()}`)
      .then(res => { 
        setProjects(res.data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="projek-root">
      <Navbar />
      <section className="head-section center">
         <span className="mini-head">PORTOFOLIO</span>
         <h1>HASIL KARYA KAMI</h1>
      </section>

      <div className="container-proyek">
        {loading ? (
          <div className="center-loading"><Loader className="spin" size={40} /></div>
        ) : (
          <div className="list-wrapper">
            {projects.length > 0 ? (
              projects.map((item) => <ProjectCard key={item.id} item={item} />)
            ) : (
              <div className="empty-msg"><Camera size={48} /><p>Belum ada proyek.</p></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjekPage;