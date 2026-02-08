// src/components/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Import CSS yang sama

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error

    try {
      // Kirim data ke backend
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      if (res.data.success) {
        // Simpan tiket masuk di LocalStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminName', res.data.user.nama); // Opsional: simpan nama
        
        // Pindah ke halaman admin
        navigate('/admin');
      }
    } catch (err) {
      // Tampilkan pesan error jika login gagal
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Gagal terhubung ke server");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card" style={{ maxWidth: '400px' }}>
        <h2 className="admin-title" style={{ marginBottom: '20px' }}>Login Admin</h2>
        
        {error && <div className="message error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Masuk</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;