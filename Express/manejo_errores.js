const express = require('express')
const app = express()
const port = 5000

// Sistema de operaciones básicas
app.get('/dividir/:a/:b', (req, res) => {
    const a = parseInt(req.params.a) 
    const b = parseInt(req.params.b)

    // No podemos realizar divisiones entre 0
    if(b==0){
        return res.status(400).send('No se puede dividir por cero')
    }

    const resultado = a/b;
    res.send(`El resultado de la división es igual a: ${resultado}`)
})

// Iniciar el servidor, escuchando en el puerto 4000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})
