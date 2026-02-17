/**
 * BACKEND SERVER
 * Stack: Express.js, MySQL
 * Fitur: CRUD, CORS, Validasi Sederhana
 */

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
// Konfigurasi CORS untuk mengizinkan akses dari frontend Ionic
const corsOptions = {
    origin: 'http://localhost:8100', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Konfigurasi Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'db_kampus'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi database:', err);
    } else {
        console.log('✅ Terkoneksi ke MySQL Database: db_kampus');
    }
});

// --- API ENDPOINTS ---

// 1. GET: Ambil Semua Data
app.get('/api/mahasiswa', (req, res) => {
    const query = 'SELECT * FROM mahasiswa ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. POST: Tambah Data
app.post('/api/mahasiswa', (req, res) => {
    const { nama, jurusan } = req.body;

    // Validasi Input
    if (!nama || !jurusan) {
        return res.status(400).json({ message: 'Nama dan Jurusan wajib diisi!' });
    }

    const query = 'INSERT INTO mahasiswa (nama, jurusan) VALUES (?, ?)';
    db.query(query, [nama, jurusan], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        res.status(201).json({ 
            message: 'Data berhasil disimpan', 
            id: result.insertId 
        });
    });
});

// 3. PUT: Update Data
app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const { nama, jurusan } = req.body;

    const query = 'UPDATE mahasiswa SET nama = ?, jurusan = ? WHERE id = ?';
    db.query(query, [nama, jurusan, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data berhasil diupdate' });
    });
});

// 4. DELETE: Hapus Data
app.delete('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM mahasiswa WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Data berhasil dihapus' });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});