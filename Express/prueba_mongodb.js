const express = require('express')
const {MongoClient} = require('mongodb')

const app = express()
const port = 5000

// Conexión a la base de datos MongoDB
const uri = 'mongodb://localhost:27017' // Pendiente, recordar lo trabajado cuando utilizábamos Mongo Compass

// Ruta para listar la base de datos
app.get('/databases', async (req, res) => {
    let client;
try{
    // Conectar al cliente de MongoDB
    client = new MongoClient(uri);
    await client.connect();

    // Obtener el objeto admin y listar las bases de datos
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    // Responder con la lista de bases de datos en formato JSON
    res.json({
        message: 'Bases de datos en MongoDB:',
        databases: dbs.databases.map(db => ({
            name: db.name,
            sizeOnDisk: db.sizeOnDisk, 
            empty: db.empty
        }))
    });
} catch(error){
    console.error('Error al conectar a MongoDB:', error);
    res.status(500).json({error: 'Error al conectar a MongoDB'});
}finally{
    // Asegurarse de cerrar la conexión al cliente
    if(client){
        await client.close();
    }
}   
}); // <-- Cierra el app.get('/databases', ...)

// Iniciar el servidor, escuchando en el puerto 5000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
  console.log(`Conectando a MongoDB en ${uri}`)
})