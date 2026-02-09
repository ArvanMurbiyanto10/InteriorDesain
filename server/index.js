import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

const db = mysql.createPool({
    host: 'localhost', user: 'root', password: '', database: 'doger_interior'
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''))
});
const upload = multer({ storage: storage });

// API: AMBIL SEMUA
app.get('/api/projects', (req, res) => {
    const sql = `
        SELECT p.*, GROUP_CONCAT(g.nama_file) as gallery 
        FROM proyek p 
        LEFT JOIN proyek_galeri g ON p.id = g.id_proyek 
        GROUP BY p.id ORDER BY p.id DESC`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results.map(item => ({ ...item, gallery: item.gallery ? item.gallery.split(',') : [] })));
    });
});

// API: SIMPAN (MULTIPLE)
app.post('/api/projects', upload.array('images', 20), (req, res) => {
    const { judul, klien } = req.body;
    const files = req.files;
    if (!files || files.length === 0) return res.status(400).json({message: "Minimal 1 foto"});

    const thumbnail = files[0].filename;
    db.query("INSERT INTO proyek (judul, klien, foto) VALUES (?, ?, ?)", [judul, klien, thumbnail], (err, result) => {
        if (err) return res.status(500).json(err);
        const projectId = result.insertId;
        const values = files.map(file => [projectId, file.filename]);
        db.query("INSERT INTO proyek_galeri (id_proyek, nama_file) VALUES ?", [values], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        });
    });
});

// API: DELETE
app.delete('/api/projects/:id', (req, res) => {
    db.query("DELETE FROM proyek WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));