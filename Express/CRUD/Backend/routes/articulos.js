const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');

// GET, POST, PUT, DELETE para artículos

// Obtener todos los artículos
router.get('/', async (req, res) => {
    try {
        const articulos = await Articulo.find();
        res.json(articulos);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

// Crear un nuevo artículo POST --> /api/articulos
router.post('/', async (req, res) => {
    try {
        const {titulo, contenido, autor} = req.body;
        const nuevoArticulo = new Articulo({titulo, contenido, autor});
        const articuloGuardado = await nuevoArticulo.save();
        res.status(201).json(articuloGuardado);
    } catch(error){
        res.status(400).json({message: error.message});
    }
});




module.exports = router;