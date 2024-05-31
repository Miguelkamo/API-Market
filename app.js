const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuario
require('dotenv').config();

const app = express();

// Conectar a la base de datos MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes); // Usar las rutas de usuario

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




