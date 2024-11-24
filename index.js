const express = require('express');
const bodyParser = require('body-parser');

// Inisialisasi aplikasi
const app = express();
const PORT = 9000;

// Middleware
app.use(bodyParser.json());

// Import rute
const articleRoutes = require('./routes/article');
const bahanRoutes = require('./routes/bahan');
const bookmarkRoutes = require('./routes/bookmark');
const loginRoutes = require('./routes/login');

// Gunakan rute
app.use('/api/articles', articleRoutes);
app.use('/api/bahan', bahanRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api', loginRoutes); // Login diakses dengan prefix /api

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Combined API!');
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
