const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Agrega la librería path para trabajar con rutas de archivos
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/agregar-tarea', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Configuración de conexión a la base de datos
const { Pool } = require('pg');
const config = {
  host: 'db', // Nombre del servicio del contenedor de PostgreSQL
  port: 5433, // Puerto PostgreSQL en el contenedor
  database: 'appdbpost',
  user: 'postgres',
  password: '123'
};



const pool = new Pool(config);

app.use(bodyParser.urlencoded({ extended: false }));

// Ruta para cargar la página HTML inicial


// Ruta para procesar el envío del formulario y agregar tareas
app.post('/agregar-tarea', async (req, res) => {
  console.log('Solicitud POST recibida');
  const { description } = req.body;
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error al conectar con la base de datos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    // Realiza la inserción de la tarea en la base de datos
    const queryText = 'INSERT INTO tareas(description, state, cod_user) VALUES ($1, $2, $3)';
    const values = [description, false, 1];

    client.query(queryText, values, (err, result) => {
      // Liberar el cliente y finalizar la conexión
      done();

      if (err) {
        console.error('Error al insertar la tarea:', err);
        return res.status(500).json({ error: 'Error al crear la tarea' });
      }

      // La tarea se insertó con éxito
      res.status(201).json({ message: 'Tarea creada con éxito' });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor web en ejecución en http://localhost:${port}`);
});
