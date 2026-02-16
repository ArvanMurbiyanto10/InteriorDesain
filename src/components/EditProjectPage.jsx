import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { IMAGE_URL } from "../api";
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react";
import "./EditProjectPage.css";

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [judul, setJudul] = useState("");
  const [klien, setKlien] = useState("");
  const [existingGallery, setExistingGallery] = useState([]);
  const [photoInputs, setPhotoInputs] = useState([
    { id: Date.now(), file: null },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/api/projects/${id}?t=${Date.now()}`)
      .then((res) => {
        setJudul(res.data.judul || "");
        setKlien(res.data.nama_klien || "");
        setExistingGallery(res.data.gallery || []);
      })
      .catch(() => navigate("/admin")); // Variabel 'err' dihapus karena tidak digunakan
  }, [id, navigate]);

  const addPhotoInput = () =>
    setPhotoInputs([...photoInputs, { id: Date.now(), file: null }]);

  const removePhotoInput = (id) => {
    if (photoInputs.length > 1)
      setPhotoInputs(photoInputs.filter((i) => i.id !== id));
  };

  const handleFileChange = (id, e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar (Max 5MB)");
      return;
    }
    const newInputs = photoInputs.map((item) =>
      item.id === id ? { ...item, file: file } : item,
    );
    setPhotoInputs(newInputs);
  };

  const handleDeletePhoto = async (filename) => {
    if (!window.confirm("Hapus foto?")) return;
    try {
      await API.delete(`/api/projects/gallery/${filename}`);
      setExistingGallery((prev) => prev.filter((f) => f !== filename));
    } catch {
      alert("Gagal hapus"); // Variabel 'err' dihapus
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validFiles = photoInputs.map((i) => i.file).filter((f) => f !== null);

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("klien", klien); // Dikirim ke backend sebagai 'klien'

    // Menambahkan file baru yang dipilih ke FormData
    validFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await API.put(`/api/projects/${id}`, formData);
      alert("Berhasil diperbarui!"); // Foto baru akan tersimpan di sini
      navigate("/admin");
    } catch {
      alert("Gagal update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-root">
      <div className="edit-container">
        <div className="edit-header">
          <button onClick={() => navigate("/admin")} className="btn-back">
            <ArrowLeft size={18} /> Kembali
          </button>
          <h2>Edit Proyek</h2>
        </div>
        <form onSubmit={handleUpdate} className="edit-grid">
          <div className="edit-card">
            <div className="card-body">
              <div className="input-group">
                <label>Judul Proyek</label>
                <input
                  className="form-control"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Nama Klien / Lokasi</label>
                <input
                  className="form-control"
                  value={klien}
                  onChange={(e) => setKlien(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Tambah Foto Baru</label>
                <div className="photo-inputs-list">
                  {photoInputs.map((input, index) => (
                    <div key={input.id} className="edit-file-input-row">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(input.id, e)}
                        accept="image/*"
                      />
                      {photoInputs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhotoInput(input.id)}
                          className="btn-remove-slot"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addPhotoInput}
                  className="btn-add-slot"
                >
                  <Plus size={16} /> Tambah Slot Foto
                </button>
              </div>

              <button type="submit" className="btn-save" disabled={loading}>
                <Save size={18} /> {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
          <div className="edit-card">
            <div className="card-body">
              <div className="edit-gallery-grid">
                {existingGallery.map((foto, idx) => (
                  <div key={idx} className="gallery-item-edit">
                    <img src={`${IMAGE_URL}${foto}`} alt="galeri" />
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(foto)}
                      className="btn-delete-photo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
