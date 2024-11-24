const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9000;

// Middleware
app.use(bodyParser.json());

// Import rute login
const loginRoutes = require('./routes/login');

// Gunakan rute login
app.use('/api', loginRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Combined API with Login Functionality!');
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
