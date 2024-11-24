const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = express.Router();

const SECRET_KEY = 'mysecretkey'; // Kunci rahasia untuk JWT
const usersFilePath = './data/users.json'; // Lokasi file penyimpanan data pengguna
let users = require('../data/users.json'); // Memuat data pengguna dari file JSON

// Simpan data pengguna ke file JSON
const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Validasi format email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Endpoint untuk pendaftaran akun baru
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Periksa apakah email sudah digunakan
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    // Tambahkan pengguna baru
    const newUser = {
        id: users.length + 1, // ID unik (increment)
        email,
        password // Dalam aplikasi nyata, password harus di-hash!
    };
    users.push(newUser);

    // Simpan ke file JSON
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Endpoint untuk login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Cari pengguna dengan email dan password yang sesuai
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        // Buat token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Middleware untuk autentikasi dengan JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403); // Token tidak valid
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Token tidak disertakan
    }
};

// Endpoint untuk rute yang dilindungi
router.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: `Hello, ${req.user.email}. You have access to this protected route!` });
});

module.exports = router;
