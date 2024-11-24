const express = require('express');
const fs = require('fs');
const router = express.Router();

const getBookmarks = () => {
    const data = fs.readFileSync('./data/bookmarks.json', 'utf-8');
    return JSON.parse(data);
};

const saveBookmarks = (bookmarks) => {
    fs.writeFileSync('./data/bookmarks.json', JSON.stringify(bookmarks, null, 2));
};

// Get all bookmarks
router.get('/', (req, res) => {
    const bookmarks = getBookmarks();
    res.json(bookmarks);
});

// Add a new bookmark
router.post('/', (req, res) => {
    const { title, url } = req.body;
    if (!title || !url) {
        return res.status(400).json({ message: 'Title and URL are required' });
    }

    const bookmarks = getBookmarks();
    const newBookmark = {
        id: bookmarks.length + 1,
        title,
        url
    };

    bookmarks.push(newBookmark);
    saveBookmarks(bookmarks);
    res.status(201).json(newBookmark);
});

// Delete a bookmark by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let bookmarks = getBookmarks();
    const bookmarkIndex = bookmarks.findIndex(b => b.id === parseInt(id));

    if (bookmarkIndex === -1) {
        return res.status(404).json({ message: 'Bookmark not found' });
    }

    bookmarks = bookmarks.filter(b => b.id !== parseInt(id));
    saveBookmarks(bookmarks);
    res.json({ message: 'Bookmark deleted successfully' });
});

module.exports = router;
