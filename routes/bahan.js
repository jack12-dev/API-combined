const express = require('express');
const fs = require('fs');
const router = express.Router();

// Load Bahan Data
let bahanData = require('../data/bahan.json');

// Get all bahan
router.get('/', (req, res) => {
    res.json(bahanData);
});

// Get a specific bahan by ID
router.get('/:id', (req, res) => {
    const bahan = bahanData.find(b => b.id === parseInt(req.params.id));
    if (!bahan) return res.status(404).json({ message: 'Bahan not found' });
    res.json(bahan);
});

// Add a new bahan
router.post('/', (req, res) => {
    const { nama, jenis, deskripsi } = req.body;
    const newBahan = {
        id: bahanData.length + 1,
        nama,
        jenis,
        deskripsi
    };
    bahanData.push(newBahan);
    fs.writeFileSync('./data/bahan.json', JSON.stringify(bahanData, null, 2));
    res.status(201).json(newBahan);
});

// Delete a bahan by ID
router.delete('/:id', (req, res) => {
    const bahanIndex = bahanData.findIndex(b => b.id === parseInt(req.params.id));
    if (bahanIndex === -1) return res.status(404).json({ message: 'Bahan not found' });

    const deletedBahan = bahanData.splice(bahanIndex, 1);
    fs.writeFileSync('./data/bahan.json', JSON.stringify(bahanData, null, 2));
    res.json(deletedBahan);
});

module.exports = router;
