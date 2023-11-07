const express = require('express');
const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

const bodyParser = require('body-parse');

app.use(express.static(__dirname)); // Sirve archivos estáticos desde el directorio actual

app.get("/tasks", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: false }))
app.get('/submit', function (req, res) {
    console.log("Data Saved");
})

//conexion DB

const { Pool } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'DB_toDoAPP'
}

const pool = new Pool(config);


app.listen(port, () => {
    console.log(`Servidor web en ejecución en http://localhost:${port}`);
});

// Ruta para crear una nueva tarea
app.post('/tasks', async (req, res) => {
    const { description} = req.body;

    try {
        // Llama a la función insertTask desde scriptDB.mjs
        // para insertar la tarea en la base de datos
        // Debes importar esta función en tu archivo server.js
        await insertTask(description, false , 1 );
        res.json({ message: 'Tarea creada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});