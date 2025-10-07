/*
Crear una aplicación de un blog donde se puedan mostrar
artículos por su nombre y categoría.
*/

const express = require('express')
const app = express()
const port = 3000

// Ruta para mostrar todos los artículos de una categoría
app.get('/articulos/:categoria', (req, res) => {
  const categoria = req.params.categoria
  // Buscar todos los artículos de una categoría
  const articulos = ArticulosPorCategoria(categoria)
  res.send(articulos)
})

// Iniciar el servidor, escuchando en el puerto 4000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
