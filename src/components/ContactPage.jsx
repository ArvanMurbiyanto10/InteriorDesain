import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Phone, Mail, MapPin, Send, ArrowLeft,
  MessageSquare, Calendar, PenTool, CheckCircle2, Hammer, Truck,
  Layers, ShieldCheck, Zap
} from "lucide-react";
import Navbar from "./Navbar";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({ nama: "", wa: "", pesan: "" });

  useEffect(() => {
    // Memastikan halaman dimuat dari atas saat dibuka
    window.scrollTo(0, 0);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const kirimKeWA = (e) => {
    e.preventDefault();
    const nomorHP = "6285282773811";
    const text = `Halo doger.interior, perkenalkan saya *${formData.nama}* (No.WA: ${formData.wa}).%0A%0ASaya ingin konsultasi mengenai: ${formData.pesan}`;
    window.open(`https://wa.me/${nomorHP}?text=${text}`, "_blank");
  };

  // Data Tahapan Pemesanan [cite: 85-101]
  const steps = [
    { 
      num: "01", 
      title: "Konsultasi (Gratis)", 
      desc: "Diskusikan kebutuhan, konsep, material dll bersama tim kami baik secara online atau offline[cite: 86, 88].", 
      icon: <MessageSquare size={18} /> 
    },
    { 
      num: "02", 
      title: "Survey Lokasi", 
      desc: "Tim kami melakukan pengukuran secara langsung di lokasi client untuk hasil presisi[cite: 89, 90].", 
      icon: <Calendar size={18} /> 
    },
    { 
      num: "03", 
      title: "Design 3D & Visualisasi", 
      desc: "Pembuatan draft visual professional dengan biaya Rp.500.000, termasuk revisi hingga desain final[cite: 91, 95, 96].", 
      icon: <PenTool size={18} /> 
    },
    { 
      num: "04", 
      title: "Invoice & Pembayaran DP 1", 
      desc: "Pengiriman invoice resmi berdasarkan desain final dan pembayaran DP 1 untuk mengikat jadwal[cite: 97, 98].", 
      icon: <CheckCircle2 size={18} /> 
    },
    { 
      num: "05", 
      title: "Proses Produksi", 
      desc: "Pengerjaan interior di workshop kami sesuai spesifikasi material dan teknis yang telah disetujui[cite: 99, 100].", 
      icon: <Hammer size={18} /> 
    },
    { 
      num: "06", 
      title: "Instalasi & Pemasangan", 
      desc: "Proses pemasangan akhir di lokasi client hingga proyek selesai dengan sempurna[cite: 100, 101].", 
      icon: <Truck size={18} /> 
    }
  ];

  return (
    <div className="contact-corporate-root">
      <Navbar />

      <main className="fullscreen-split">
        {/* SISI KIRI: FORM KONSULTASI */}
        <div className="contact-side-left">
          <div className="content-padding">
            <span className="corporate-badge">Business Inquiry</span>
            <h1 className="corporate-title">Mari Wujudkan <br /><span className="text-brown">Ruang Impian Anda</span>.</h1>
            <p className="corporate-subtitle">
              Setiap ruang memiliki cerita unik. Doger.interior hadir untuk mengintegrasikan keahlian teknis selama 20 tahun dengan detail desain personal[cite: 10].
            </p>

            <form onSubmit={kirimKeWA} className="corporate-form">
              <div className="form-row-dual">
                <div className="input-group">
                  <label>Nama Lengkap</label>
                  <input type="text" name="nama" placeholder="Bpk/Ibu..." onChange={handleInput} required />
                </div>
                <div className="input-group">
                  <label>WhatsApp</label>
                  <input type="tel" name="wa" placeholder="08xxxxxxxx" onChange={handleInput} required />
                </div>
              </div>
              <div className="input-group full-width">
                <label>Pesan & Kebutuhan Proyek</label>
                <textarea name="pesan" placeholder="Contoh: Saya ingin kustom kitchen set minimalis..." onChange={handleInput} required></textarea>
              </div>
              <button type="submit" className="btn-corporate-submit">
                MULAI KONSULTASI SEKARANG <Send size={18} />
              </button>
            </form>

            <div className="quick-contact-row">
              <div className="q-link"><Phone size={16} /> 0852-8277-3811</div>
              <div className="q-link"><Mail size={16} /> doger.interior@gmail.com</div>
              <div className="q-link"><MapPin size={16} /> Depok, Jawa Barat</div>
            </div>
          </div>
        </div>

        {/* SISI KANAN: TAHAPAN PEMESANAN */}
        <div className="contact-side-right">
          <div className="content-padding">
            <h2 className="timeline-header">Tahapan Pemesanan</h2>
            <div className="corporate-timeline">
              {steps.map((step, i) => (
                <div key={i} className="timeline-node">
                  <div className="node-marker">
                    <div className="marker-circle">{step.num}</div>
                    {i < steps.length - 1 && <div className="marker-line"></div>}
                  </div>
                  <div className="node-info">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* SPESIALIS PEMAKAIAN BAHAN [cite: 48-84] */}
      <section className="material-fullbleed-section">
        <div className="material-content-center">
          <div className="material-intro">
            <span className="corporate-label center-text">Kualitas Tanpa Kompromi</span>
            <h2>Spesialis Pemakaian Bahan</h2>
            <div className="brown-separator"></div>
          </div>

          <div className="material-cards-fluid">
            <div className="material-card-item">
              <Layers className="icon-gold-mat" />
              <h3>Bahan Multiplek</h3>
              <p>Material favorit karena kepadatannya yang stabil dan daya tahan yang kuat[cite: 50]. Pilihan terbaik untuk unit yang membutuhkan kekuatan ekstra[cite: 51].</p>
            </div>
            <div className="material-card-item">
              <ShieldCheck className="icon-gold-mat" />
              <h3>Bahan PVC Board</h3>
              <p>Jawaban terbaik untuk area yang rentan lembap atau serangan hama[cite: 70]. Menjamin furniture anda tetap awet dan tidak mengalami pelapukan[cite: 71].</p>
            </div>
            <div className="material-card-item">
              <Zap className="icon-gold-mat" />
              <h3>Bahan Aluminium</h3>
              <p>Investasi terbaik karena sifatnya yang sepenuhnya kebal terhadap air, api, dan rayap[cite: 82]. Memberikan kesan kokoh dan presisi seumur hidup[cite: 83, 84].</p>
            </div>
          </div>
        </div>
      </section>

      <Link to="/" className="btn-float-back">
        <ArrowLeft size={24} />
      </Link>
    </div>
  );
}

export default ContactPage;