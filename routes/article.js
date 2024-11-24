const express = require('express');
const fs = require('fs');
const router = express.Router();

// Load Articles
let articles = require('../data/articles.json');

// Get all articles
router.get('/', (req, res) => {
    res.json(articles);
});

// Get a specific article by ID
router.get('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
});

// Add a new article
router.post('/', (req, res) => {
    const { title, content } = req.body;
    const newArticle = {
        id: articles.length + 1,
        title,
        content
    };
    articles.push(newArticle);
    fs.writeFileSync('./data/articles.json', JSON.stringify(articles, null, 2));
    res.status(201).json(newArticle);
});

// Update an article
router.put('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const { title, content } = req.body;
    article.title = title || article.title;
    article.content = content || article.content;
    fs.writeFileSync('./data/articles.json', JSON.stringify(articles, null, 2));
    res.json(article);
});

// Delete an article
router.delete('/:id', (req, res) => {
    const articleIndex = articles.findIndex(a => a.id === parseInt(req.params.id));
    if (articleIndex === -1) return res.status(404).json({ message: 'Article not found' });

    const deletedArticle = articles.splice(articleIndex, 1);
    fs.writeFileSync('./data/articles.json', JSON.stringify(articles, null, 2));
    res.json(deletedArticle);
});

module.exports = router;
