const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@100620@Alexis',
  database: 'controltock'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'telainicial.html'));
});

app.post('/api/guardar', (req, res) => {
  const { tipo, quantidade, modelo, estado, codigo } = req.body;
  const query = 'INSERT INTO tonners (tipo, quantidade, modelo, estado, codigo) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [tipo, quantidade, modelo, estado, codigo], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('❌ Error al guardar');
    } else {
      res.status(200).send('✅ Datos guardados con éxito');
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
