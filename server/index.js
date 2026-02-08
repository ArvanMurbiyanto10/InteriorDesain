import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// --- 2. DATABASE ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'doger_interior' 
});

db.connect((err) => {
    if (err) console.error('DB Error:', err);
    else console.log('Terhubung ke Database Laragon!');
});

// --- 3. CONFIG UPLOAD (MULTER) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/'); },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- 4. API ROUTES ---

// LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) {
            res.json({ success: true, message: "Login Berhasil", user: result[0] });
        } else {
            res.status(401).json({ success: false, message: "Username/Password Salah" });
        }
    });
});

// GET ALL PROJECTS
app.get('/api/proyek', (req, res) => {
    const sql = "SELECT * FROM proyek ORDER BY tgl_dibuat DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// CREATE NEW PROJECT
app.post('/api/proyek', upload.single('foto'), (req, res) => {
    const { judul, klien } = req.body;
    const foto = req.file ? req.file.filename : null;
    const sql = "INSERT INTO proyek (judul, klien, foto) VALUES (?, ?, ?)";
    db.query(sql, [judul, klien, foto], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Berhasil disimpan!" });
    });
});

// UPDATE PROJECT (CRUD - Update)
app.put('/api/proyek/:id', upload.single('foto'), (req, res) => {
    const { id } = req.params;
    const { judul, klien } = req.body;
    let sql, params;

    if (req.file) {
        const foto = req.file.filename;
        sql = "UPDATE proyek SET judul = ?, klien = ?, foto = ? WHERE id = ?";
        params = [judul, klien, foto, id];
    } else {
        sql = "UPDATE proyek SET judul = ?, klien = ? WHERE id = ?";
        params = [judul, klien, id];
    }

    db.query(sql, params, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Data diupdate!" });
    });
});

// BULK DELETE (CRUD - Delete)
app.post('/api/proyek/delete', (req, res) => {
    const { ids } = req.body;
    if (!ids || ids.length === 0) return res.status(400).json({ message: "Pilih data dulu" });

    const sqlGet = "SELECT foto FROM proyek WHERE id IN (?)";
    db.query(sqlGet, [ids], (err, results) => {
        if (!err) {
            results.forEach(item => {
                const pathFile = path.join(__dirname, 'uploads', item.foto);
                if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
            });
        }
    });

    const sqlDel = "DELETE FROM proyek WHERE id IN (?)";
    // BENAR
    db.query(sqlDel, [ids], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Data dihapus!" });
    });
});

// STATIC FOLDER (Agar Foto Bisa Muncul)
app.use('/uploads', express.static('uploads'));

app.listen(5000, () => console.log('Server: http://localhost:5000'));