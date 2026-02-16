import React, { useState, useEffect, useRef } from "react";
import API from "../api";
import {
  ArrowRight,
  Loader,
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import "./ProjekPage.css";
// Kembali menggunakan apartemen3.jpg
import seamanan4 from "../assets/homeee.jpg";

const ProjectCard = ({ item, onImageClick }) => {
  const scrollRef = useRef(null);

  const baseImages =
    item.gallery && item.gallery.length > 0
      ? [item.foto, ...item.gallery]
      : [item.foto];

  const infiniteImages =
    baseImages.length < 4
      ? [...baseImages, ...baseImages, ...baseImages]
      : baseImages;

  const linktreeUrl = "https://linktr.ee/doger.interior";

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const itemWidth = 215;
      if (direction === "right") {
        current.scrollBy({ left: itemWidth, behavior: "smooth" });
      } else {
        current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="card-proyek-compact">
      <div className="card-header-compact">
        <div className="header-content">
          <h3 className="title-compact">{item.judul}</h3>
          <p className="subtitle-compact">
            {item.nama_klien ? `Proyek ${item.nama_klien}` : "Proyek Interior"}
          </p>
        </div>

        <a
          href={linktreeUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-hubungi-box"
        >
          HUBUNGI KAMI <ArrowRight size={14} style={{ marginLeft: 8 }} />
        </a>
      </div>

      <div className="card-body-compact">
        <div className="scroll-wrapper">
          <button className="nav-btn left" onClick={() => scroll("left")}>
            <ChevronLeft size={24} />
          </button>

          <div className="img-scroller" ref={scrollRef}>
            {infiniteImages.map((foto, idx) => {
              const imgSrc = `${API.defaults.baseURL}/uploads/${foto}`;
              return (
                <div
                  key={idx}
                  className="img-item-compact"
                  onClick={() => onImageClick(imgSrc)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={imgSrc}
                    alt="interior design"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/300x300?text=Doger+Interior";
                    }}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>

          <button className="nav-btn right" onClick={() => scroll("right")}>
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
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    API.get(`/api/projects?t=${Date.now()}`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load proyek:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-root">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <section
        className="compact-hero"
        style={{ backgroundImage: `url(${seamanan4})` }}
      >
        <div className="hero-overlay"></div>
        <div className="container-limit center hero-content-box">
          <span className="sub-head">PORTOFOLIO</span>
          <h1>
            Eksplorasi Ruang & <br /> Estetika Interior
          </h1>
          <p className="hero-desc">
            Setiap detail adalah cerita. Temukan inspirasi dari koleksi proyek
            terbaik kami yang menggabungkan fungsionalitas dengan keindahan
            desain modern.
          </p>
        </div>
      </section>

      <div className="container-limit">
        {loading ? (
          <div className="center-loading">
            <Loader className="spin" size={40} />
          </div>
        ) : (
          <div className="grid-layout">
            {projects.length > 0 ? (
              projects.map((item) => (
                <ProjectCard
                  key={item.id}
                  item={item}
                  onImageClick={setSelectedImg}
                />
              ))
            ) : (
              <div className="empty-msg">
                <Camera size={60} />
                <p>Koleksi sedang dalam tahap pembaharuan.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>
            <img
              src={selectedImg}
              alt="Enlarged project"
              className="lightbox-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjekPage;
