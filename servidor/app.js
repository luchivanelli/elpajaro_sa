import express from 'express';
// import data from './data.json' with { type: 'json' };
import cors from 'cors';
import mysql2 from 'mysql2';
import { validateService, validatePartialService } from './schema/service.js';

// Crear un pool de conexiones
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // host: 'localhost',
  // database: 'todolist',
  // user: 'root',
  // password: 'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const PORT = process.env.BACKEND_URL ?? 1234;

const app = express();
app.disable('x-powered-by');

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'http://127.0.0.1:5500',
        "http://localhost:5173",
        "https://elpajaro-sa.vercel.app",
        "https://elpajaro-sa-backend.vercel.app"
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  })
);

// app.get('/', (req, res) => {
//   pool.query('SELECT * FROM servicios', (error, respuesta) => {
//     if (error) {
//       return res.status(500).json({ error: 'Error en la consulta' });
//     } 
//     res.json(respuesta);
//   });
// });

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const service = data.find((service) => service.id == id);
  if (service) return res.json(service);
  res.status(404).json({ message: 'Service not found' });
});

app.post('/', (req, res) => {
  const result = validateService(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const nuevoServicio = { ...req.body };

  const [day, month, year] = nuevoServicio.fecha.split('/')
  const fechaFormateada = `${year}-${month}-${day}`
  
  // Consulta SQL con marcadores de posición
  const sql = `
    INSERT INTO servicios (fecha, marca, modelo, patente, servicio, descripcion, duenio, costo_repuestos, costo_mano_de_obra, costo_repuestos_total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(sql, [
    fechaFormateada,
    nuevoServicio.marca,
    nuevoServicio.modelo,
    nuevoServicio.patente,
    nuevoServicio.servicio,
    nuevoServicio.descripcion,
    nuevoServicio.duenio,
    nuevoServicio.costo_repuestos,
    nuevoServicio.costo_mano_de_obra,
    nuevoServicio.costo_repuestos_total
  ], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.status(201).json(nuevoServicio)
  });
});

app.patch('/:id', (req, res) => {
  const result = validateService(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;  // Obtenemos el id de los parámetros
  const nuevoServicio = req.body;

  // Formatear la fecha al formato correcto (yyyy-MM-dd)
  const [day, month, year] = nuevoServicio.fecha.split('/');
  const fechaFormateada = `${year}-${month}-${day}`;

  // Consulta SQL para actualizar el servicio
  const sql = `
    UPDATE servicios 
    SET fecha = ?, marca = ?, modelo = ?, patente = ?, servicio = ?, descripcion = ?, duenio = ?, costo_repuestos = ?, costo_mano_de_obra = ?, costo_repuestos_total = ?
    WHERE id = ?
  `;

  // Ejecutar la consulta
  pool.query(sql, [
    fechaFormateada,
    nuevoServicio.marca,
    nuevoServicio.modelo,
    nuevoServicio.patente,
    nuevoServicio.servicio,
    nuevoServicio.descripcion,
    nuevoServicio.duenio,
    nuevoServicio.costo_repuestos,
    nuevoServicio.costo_mano_de_obra,
    nuevoServicio.costo_repuestos_total,
    id
  ], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en la consulta' });
    }

    // Si no se afectó ninguna fila, significa que el servicio no existe
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Servicio actualizado correctamente', nuevoServicio });
  });
});

app.delete('/:id', (req, res) => {
  const { id } = req.params; // Obtenemos el id de los parámetros

  // Consulta SQL para eliminar el servicio
  const sql = `DELETE FROM servicios WHERE id = ?`;

  // Ejecutar la consulta
  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en la consulta' });
    }

    // Si no se afectó ninguna fila, significa que el servicio no existe
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.status(200).json({ message: 'Servicio eliminado correctamente' });
  });
});

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

// Manejar la señal de terminación
process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      console.error('Error al cerrar el pool:', err);
    }
    console.log('Pool cerrado. Saliendo...');
    process.exit();
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
