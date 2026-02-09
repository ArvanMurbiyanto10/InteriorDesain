import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react'; 
import './AdminPage.css';

const API_URL = "http://localhost:5000"; 

const AdminPage = () => {
  const [judul, setJudul] = useState('');
  const [klien, setKlien] = useState('');
  const [photoInputs, setPhotoInputs] = useState([{ id: Date.now(), file: null }]);
  
  // Variabel ini sebelumnya error karena tidak ditampilkan di bawah
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/projects?t=${Date.now()}`);
      setProjects(res.data);
    } catch (err) { 
      console.error(err); // Perbaikan: Gunakan 'err' agar ESLint tidak protes
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('isAdminLoggedIn')) navigate('/login');
    else fetchProjects();
  }, [navigate]);

  const addPhotoInput = () => setPhotoInputs([...photoInputs, { id: Date.now(), file: null }]);
  
  const removePhotoInput = (id) => {
    if (photoInputs.length > 1) setPhotoInputs(photoInputs.filter(i => i.id !== id));
  };
  
  const handleFileChange = (id, e) => {
    const newInputs = photoInputs.map(item => item.id === id ? { ...item, file: e.target.files[0] } : item);
    setPhotoInputs(newInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validFiles = photoInputs.map(i => i.file).filter(f => f !== null);
    
    // Minimal 1 Foto
    if (validFiles.length < 1) {
      alert("Mohon upload minimal 1 foto!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('klien', klien);
    validFiles.forEach(file => formData.append('images', file));

    try {
      await axios.post(`${API_URL}/api/projects`, formData);
      alert("Proyek berhasil disimpan!");
      setJudul(''); setKlien(''); setPhotoInputs([{ id: Date.now(), file: null }]);
      fetchProjects();
    } catch (err) {
      // Perbaikan: Gunakan 'err'
      console.error("Gagal simpan:", err); 
      alert("Gagal simpan. Periksa database!");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Hapus proyek ini?")) return;
    try {
        await axios.delete(`${API_URL}/api/projects/${id}`);
        fetchProjects();
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h2>Doger Admin</h2>
        <div style={{flex:1}}></div>
        <button onClick={() => {localStorage.clear(); navigate('/login')}} className="btn-logout">Logout</button>
      </div>
      
      <main className="main-content">
        {/* FORM TAMBAH DATA */}
        <div className="card">
          <h3>Tambah Proyek Baru</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Judul Proyek</label>
                <input className="form-control" value={judul} onChange={e=>setJudul(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Nama Klien</label>
                <input className="form-control" value={klien} onChange={e=>setKlien(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Upload Foto (Minimal 1)</label>
              <div className="dynamic-file-list">
                {photoInputs.map((input, index) => (
                  <div key={input.id} className="file-input-row">
                    <span className="file-number">#{index + 1}</span>
                    <input type="file" onChange={(e) => handleFileChange(input.id, e)} accept="image/*" />
                    {photoInputs.length > 1 && (
                        <button type="button" onClick={() => removePhotoInput(input.id)} className="btn-remove-input">
                            <Trash2 size={16}/>
                        </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={addPhotoInput} className="btn-add-photo"><Plus size={16}/> Tambah Baris Foto</button>
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Menyimpan..." : "Simpan Proyek"}</button>
          </form>
        </div>

        {/* TABEL DAFTAR PROYEK (Perbaikan: Menambahkan ini agar 'projects' terpakai) */}
        <div className="card">
            <h3>Daftar Proyek</h3>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Info</th>
                        <th>Galeri</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={`${API_URL}/uploads/${item.foto}`} style={{width:60, height:60, objectFit:'cover', borderRadius:5}} onError={(e)=>e.target.src="https://placehold.co/60"} alt="cover"/>
                            </td>
                            <td>
                                <b>{item.judul}</b><br/>{item.klien}
                            </td>
                            <td>{item.gallery ? item.gallery.length : 0} Foto</td>
                            <td>
                                <button onClick={() => navigate(`/admin/edit/${item.id}`)} className="btn-edit">Edit</button>
                                <button onClick={()=>handleDelete(item.id)} className="btn-delete">Hapus</button>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && <tr><td colSpan="4" style={{textAlign:'center'}}>Belum ada data.</td></tr>}
                </tbody>
            </table>
        </div>

      </main>
    </div>
  );
};

export default AdminPage;