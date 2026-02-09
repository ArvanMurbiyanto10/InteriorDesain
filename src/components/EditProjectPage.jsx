import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import './EditProjectPage.css';

const API_URL = "http://localhost:5000";

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [judul, setJudul] = useState('');
  const [klien, setKlien] = useState('');
  const [existingGallery, setExistingGallery] = useState([]);
  const [newFiles, setNewFiles] = useState([]); // Array file baru (jika ada)

  useEffect(() => {
    axios.get(`${API_URL}/api/projects/${id}?t=${Date.now()}`)
      .then(res => {
        setJudul(res.data.judul);
        setKlien(res.data.klien);
        setExistingGallery(res.data.gallery);
      })
      .catch(() => navigate('/admin'));
  }, [id, navigate]);

  const handleDeletePhoto = async (filename) => {
    if(!window.confirm("Hapus foto ini?")) return;
    await axios.delete(`${API_URL}/api/projects/gallery/${filename}`);
    setExistingGallery(prev => prev.filter(f => f !== filename));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('klien', klien);
    // Tambah foto baru jika ada
    for (let i = 0; i < newFiles.length; i++) {
        formData.append('images', newFiles[i]);
    }

    try {
        await axios.put(`${API_URL}/api/projects/${id}`, formData);
        alert("Data diperbarui!");
        navigate('/admin');
    } catch (err) { 
        console.error(err);
        alert("Gagal update"); }
  };

  return (
    <div className="edit-root">
      <div className="edit-container">
        <button onClick={() => navigate('/admin')} className="btn-back"><ArrowLeft size={18}/> Kembali</button>
        
        <div className="edit-grid">
          {/* FORM TEXT */}
          <div className="edit-card">
            <h3>Edit Info Proyek</h3>
            <form onSubmit={handleUpdate}>
               <div className="input-group">
                  <label>Judul</label>
                  <input value={judul} onChange={e=>setJudul(e.target.value)} required />
               </div>
               <div className="input-group">
                  <label>Klien</label>
                  <input value={klien} onChange={e=>setKlien(e.target.value)} />
               </div>
               <div className="input-group">
                  <label>Tambah Foto Baru (Opsional)</label>
                  <input type="file" multiple onChange={e => setNewFiles(e.target.files)} />
               </div>
               <button type="submit" className="btn-save"><Save size={18}/> Simpan</button>
            </form>
          </div>

          {/* GALLERY MANAGER */}
          <div className="edit-card">
            <h3>Kelola Galeri ({existingGallery.length})</h3>
            <div className="edit-gallery-grid">
               {existingGallery.map((foto, idx) => (
                  <div key={idx} className="gallery-item-edit">
                     <img src={`${API_URL}/uploads/${foto}`} alt="galeri" />
                     <button onClick={() => handleDeletePhoto(foto)} className="btn-delete-photo"><Trash2 size={14}/></button>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProjectPage;