const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

// Registro de Producto
app.post('/ingresar', (req, res) => {
  const { nombre,referencia,encendido, diagnostico } = req.body;

  db.query('INSERT INTO ingresoproducto (nombre, referencia, encendido, diagnostico) VALUES (?, ?, ?, ?)', [nombre,referencia,encendido, diagnostico], (err, results) => {
    if (err) return res.status(500).send('Error en el servidor.');
    res.status(201).send('Orden de trabajo registrada con éxito!');
  });
});
//mostar los datos almacenados
app.get('/ingresoproducto', (req, res) => {
  const sql = 'SELECT * FROM ingresoproducto';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ruta para borrar un registro por ID
app.delete('/ingresoproducto/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM ingresoproducto WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error al borrar el Producto');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send(`Producto con ID ${id} borrado exitosamente`);
  });
});


const puerto = 10070;
app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
