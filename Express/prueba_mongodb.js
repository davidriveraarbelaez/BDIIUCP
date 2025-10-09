const express = require('express')
const {MongoClient} = require('mongodb')

const app = express()
const port = 5000

// Conexión a la base de datos MongoDB
const url = 'mongodb://localhost:27017' // Pendiente, recordar lo trabajado cuando utilizábamos Mongo Compass

// Ruta para listar la base de datos
app.get('/databases', async (req, res) => {
    let client;

}


// Iniciar el servidor, escuchando en el puerto 4000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
