
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

// Coneccion con el banco de datos 
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


// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lista_produtos.html'));
});

// Rota de cadastro
app.post('/api/guardar', (req, res) => {
  const { tipo, cantidad, modelo, estado, codigo } = req.body;
  // SQl
  const query = 'INSERT INTO tonners (tipo, cantidad, modelo, estado, codigo) VALUES (?, ?, ?, ?, ?)';
  // Ejecutar comando sql 
  db.query(query, [tipo, cantidad, modelo, estado, codigo], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('❌ Error al guardar');
    } else {
      res.status(200).send('✅ Datos guardados con éxito');
    }
  });
});


// servidor 
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
