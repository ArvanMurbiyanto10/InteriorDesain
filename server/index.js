import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

// --- 1. Konfigurasi Path (ES Modules) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder Uploads (Backend)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Folder Dist (Frontend yang sudah di-build)
const frontendBuildPath = path.join(__dirname, '../dist');

// --- 2. Middleware ---
app.use(cors());
app.use(express.json());

// Serve File Gambar Uploads
app.use('/uploads', express.static(uploadDir));

// Serve File Statis Frontend (Hasil Build React)
app.use(express.static(frontendBuildPath));

// --- 3. Koneksi Database ---
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doger_interior'
});

// --- 4. Konfigurasi Multer ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''))
});
const upload = multer({ storage: storage });

// ==========================================
// API ENDPOINTS (Jalur Data)
// ==========================================

// Login Admin
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) res.json({ success: true, message: "Login Berhasil" });
        else res.json({ success: false, message: "Username/Password Salah" });
    });
});

// Setting Logo
app.get('/api/settings/logo', (req, res) => {
    db.query("SELECT key_value FROM settings WHERE key_name = 'navbar_logo'", (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) res.json(result[0]);
        else res.json({ key_value: 'logo-doger.png' });
    });
});

app.post('/api/settings/logo', upload.single('logo'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "File tidak ditemukan" });
    const newLogo = req.file.filename;
    db.query("UPDATE settings SET key_value = ? WHERE key_name = 'navbar_logo'", [newLogo], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, newLogo });
    });
});

// Manajemen Proyek
app.get('/api/projects', (req, res) => {
    const sql = `SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery FROM proyek p LEFT JOIN proyek_galeri g ON p.id = g.id_proyek GROUP BY p.id ORDER BY p.id DESC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        const formatted = results.map(item => ({
            ...item,
            gallery: item.gallery ? item.gallery.split(',') : []
        }));
        res.json(formatted);
    });
});

// --- [UPDATED] TAMBAH PROYEK DENGAN LOG DEBUGGING ---
app.post('/api/projects', upload.array('images', 20), (req, res) => {
    // 1. Cek Data Masuk
    console.log("--- REQUEST MASUK ---");
    console.log("Body:", req.body); // Untuk melihat apakah Judul & Klien terkirim
    console.log("Files:", req.files?.length); // Untuk melihat jumlah file

    const { judul, klien } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
        console.error("ERROR: Tidak ada foto yang diupload");
        return res.status(400).send("Minimal 1 foto");
    }

    // 2. Insert ke Tabel Proyek
    const sqlProyek = "INSERT INTO proyek (judul, klien, foto) VALUES (?, ?, ?)";
    db.query(sqlProyek, [judul, klien, files[0].filename], (err, result) => {
        if (err) {
            // INI YANG AKAN MUNCUL DI TERMINAL JIKA DB ERROR
            console.error("❌ ERROR DATABASE (Tabel Proyek):", err.sqlMessage); 
            return res.status(500).json(err);
        }

        const projectId = result.insertId;
        console.log("✅ Berhasil simpan proyek, ID:", projectId);

        // 3. Insert ke Tabel Galeri
        const sqlGaleri = "INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?";
        const values = files.map(file => [projectId, file.filename]);

        db.query(sqlGaleri, [values], (err) => {
            if (err) {
                console.error("❌ ERROR DATABASE (Tabel Galeri):", err.sqlMessage);
                return res.status(500).json(err);
            }
            console.log("✅ Berhasil simpan galeri.");
            res.json({ success: true });
        });
    });
});

app.delete('/api/projects/:id', (req, res) => {
    db.query("DELETE FROM proyek WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// ==========================================
// HANDLE FRONTEND ROUTING (SPA)
// ==========================================
// Gunakan regex (.*) untuk menangkap semua route
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => console.log(`🚀 Server & Frontend aktif di port ${PORT}`));