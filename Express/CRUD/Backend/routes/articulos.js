const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');

// GET /api/articulos → Obtener todos los artículos
router.get('/', async (req, res) => {
 try {
   const articulos = await Articulo.find().sort({ fecha: -1 });
   res.json(articulos);
 } catch (error) {
   res.status(500).json({ message: 'Error al obtener los artículos', error: error.message });
 }
});

// POST /api/articulos → Crear un nuevo artículo
router.post('/', async (req, res) => {
 try {
   const { titulo, contenido, autor } = req.body;
   const nuevoArticulo = new Articulo({ titulo, contenido, autor });
   const articuloGuardado = await nuevoArticulo.save();
   res.status(201).json(articuloGuardado);
 } catch (error) {
   res.status(400).json({ message: 'Error al crear el artículo', error: error.message });
 }
});

// GET /api/articulos/:id → Obtener un artículo por ID
router.get('/:id', async (req, res) => {
 try {
   const articulo = await Articulo.findById(req.params.id);
   if (!articulo) {
     return res.status(404).json({ message: 'Artículo no encontrado' });
   }
   res.json(articulo);
 } catch (error) {
   res.status(500).json({ message: 'Error al obtener el artículo', error: error.message });
 }
});

// PUT /api/articulos/:id → Actualizar un artículo
router.put('/:id', async (req, res) => {
 try {
   const { titulo, contenido, autor } = req.body;
   const articuloActualizado = await Articulo.findByIdAndUpdate(
     req.params.id,
     { titulo, contenido, autor },
     { new: true, runValidators: true }
   );
   if (!articuloActualizado) {
     return res.status(404).json({ message: 'Artículo no encontrado' });
   }
   res.json(articuloActualizado);
 } catch (error) {
   res.status(400).json({ message: 'Error al actualizar el artículo', error: error.message });
 }
});

// DELETE /api/articulos/:id → Eliminar un artículo
router.delete('/:id', async (req, res) => {
 try {
   const articuloEliminado = await Articulo.findByIdAndDelete(req.params.id);
   if (!articuloEliminado) {
     return res.status(404).json({ message: 'Artículo no encontrado' });
   }
   res.json({ message: 'Artículo eliminado correctamente' });
 } catch (error) {
   res.status(500).json({ message: 'Error al eliminar el artículo', error: error.message });
 }
});

module.exports = router;