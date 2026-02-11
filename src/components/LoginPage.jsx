import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // GANTI: Gunakan API.post tanpa ${API_URL}
      // API ini sudah otomatis mengarah ke link ngrok kamu
      const res = await API.post("/api/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin");
      } else {
        setError("Kredensial tidak valid.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Pesan error lebih detail
      setError("Gagal masuk. Pastikan Backend & Ngrok menyala.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <div className="login-content">
          <div className="brand-logo">
            <h1>
              DOGER<span>.INTERIOR</span>
            </h1>
            <p>ADMINISTRATION PANEL</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-field">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? "AUTHENTICATING..." : "LOG IN"}
            </button>
          </form>

          <div className="login-copy">
            <p>&copy; {new Date().getFullYear()} Doger Interior Design</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;