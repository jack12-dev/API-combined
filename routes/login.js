const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = express.Router();

const SECRET_KEY = 'mysecretkey'; // Ganti dengan kunci rahasia Anda sendiri

// Load User Data
const users = require('../data/users.json');

// Endpoint untuk login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Cari pengguna dengan username dan password yang sesuai
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Buat token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Middleware untuk autentikasi dengan JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Endpoint contoh untuk data yang dilindungi
router.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}. You have access to this protected route!` });
});

module.exports = router;
