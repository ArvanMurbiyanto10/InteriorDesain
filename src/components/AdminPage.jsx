import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

// URL Backend (Ditaruh di luar komponen agar stabil)
const API_URL = "http://localhost:5000"; 

const AdminPage = () => {
  // --- STATES ---
  const [judul, setJudul] = useState('');
  const [klien, setKlien] = useState('');
  const [file, setFile] = useState(null);
  
  const [projects, setProjects] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // --- 1. FUNGSI AMBIL DATA (Dibungkus useCallback agar stabil) ---
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/proyek`, { 
        headers: { 'ngrok-skip-browser-warning': 'true' } 
      });
      setProjects(res.data);
    } catch (err) { 
      console.error("Gagal ambil data:", err); 
    }
  }, []); // Dependency array kosong = Fungsi ini tidak akan berubah-ubah

  // --- 2. USE EFFECT (Cek Login & Panggil Data) ---
  useEffect(() => {
    const checkLogin = () => {
      if (!localStorage.getItem('isAdminLoggedIn')) {
        navigate('/login');
      } else {
        fetchData();
      }
    };
    checkLogin();
  }, [navigate, fetchData]); // Aman karena fetchData sudah di-useCallback

  // --- 3. HANDLE SUBMIT (Simpan / Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('klien', klien);
    if (file) formData.append('foto', file);

    try {
      if (isEditing) {
        // Mode Edit (PUT)
        await axios.put(`${API_URL}/api/proyek/${editId}`, formData);
        alert("Data berhasil diperbarui!");
      } else {
        // Mode Tambah (POST)
        await axios.post(`${API_URL}/api/proyek`, formData);
        alert("Proyek baru berhasil disimpan!");
      }

      // Reset Form
      setJudul(''); 
      setKlien(''); 
      setFile(null);
      setIsEditing(false); 
      setEditId(null);
      
      // Refresh Data Tabel
      fetchData(); 

    } catch (err) { 
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. HANDLE HAPUS (Bulk Delete) ---
  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Yakin ingin menghapus ${selectedIds.length} data terpilih?`)) return;

    try {
      await axios.post(`${API_URL}/api/proyek/delete`, { ids: selectedIds });
      setSelectedIds([]); // Reset checklist
      fetchData(); // Refresh tabel
      alert("Data berhasil dihapus.");
    } catch (err) { 
      console.error(err);
      alert("Gagal menghapus data.");
    }
  };

  // --- 5. HANDLE EDIT ---
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setJudul(item.judul);
    setKlien(item.klien);
    // Foto tidak perlu di-set karena input file sifatnya read-only
    window.scrollTo(0, 0); // Scroll ke form di atas
  };

  // --- 6. HANDLE CHECKBOX ---
  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(projects.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Doger Admin</h2>
        <div className="menu-item active">Dashboard</div>
        <button className="menu-logout" onClick={handleLogout}>Logout</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        {/* FORM INPUT */}
        <div className="card">
          <h3>{isEditing ? "📝 Edit Proyek" : "✨ Tambah Proyek Baru"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Judul Proyek</label>
                <input 
                  type="text" className="form-control" 
                  placeholder="Contoh: APARTEMEN BRANZ" 
                  value={judul} onChange={e => setJudul(e.target.value)} required 
                />
              </div>
              <div className="form-group">
                <label>Nama Klien</label>
                <input 
                  type="text" className="form-control" 
                  placeholder="Contoh: Ibu Shiiella" 
                  value={klien} onChange={e => setKlien(e.target.value)} required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Foto Dokumentasi {isEditing && <small>(Biarkan kosong jika tidak ingin ganti foto)</small>}</label>
              <input 
                type="file" className="form-control" 
                onChange={e => setFile(e.target.files[0])} 
              />
            </div>

            <div style={{marginTop: '15px'}}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Memproses..." : (isEditing ? "Simpan Perubahan" : "Simpan Proyek")}
              </button>
              
              {isEditing && (
                <button type="button" className="btn-cancel" onClick={() => {
                  setIsEditing(false); setJudul(''); setKlien(''); setFile(null);
                }}>
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABEL DATA */}
        <div className="card">
          <div className="table-header">
            <h3>Daftar Proyek ({projects.length})</h3>
            {selectedIds.length > 0 && (
              <button className="btn-delete" onClick={handleDelete}>
                Hapus ({selectedIds.length}) Item
              </button>
            )}
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{width: '50px'}}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll} 
                    checked={projects.length > 0 && selectedIds.length === projects.length} 
                  />
                </th>
                <th>Foto</th>
                <th>Judul Proyek</th>
                <th>Klien</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign:'center', padding:'20px'}}>Belum ada data.</td></tr>
              ) : (
                projects.map((item) => (
                  <tr key={item.id} className={selectedIds.includes(item.id) ? 'selected' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item.id)} 
                        onChange={() => handleSelectOne(item.id)} 
                      />
                    </td>
                    <td>
                      <img 
                        src={`${API_URL}/uploads/${item.foto}`} 
                        alt="thumb" className="thumb-img" 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=No+Img'; }} // Fallback jika gambar error
                      />
                    </td>
                    <td>{item.judul}</td>
                    <td>{item.klien}</td>
                    <td>
                      <button onClick={() => handleEdit(item)} className="btn-edit">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

export default AdminPage;