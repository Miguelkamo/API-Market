const express = require('express');
const router = express.Router();

// Importar el modelo de Post
const Post = require('../models/Post');

// Ruta para obtener todos los posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los posts' });
    }
});

// Ruta para crear un nuevo post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el post' });
    }
});

// Ruta para obtener un post por su ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el post' });
    }
});

// Ruta para actualizar un post por su ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el post' });
    }
});

// Ruta para eliminar un post por su ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.json(deletedPost);
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el post' });
    }
});

module.exports = router;


