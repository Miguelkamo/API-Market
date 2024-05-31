const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importar el modelo de usuario
const bcrypt = require('bcrypt');

// Endpoint para el registro de usuarios
router.post('/registro', async (req, res) => {
    try {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Crear un nuevo usuario con los datos del formulario de registro
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10); // Hash de la contraseña
        const newUser = new User({
            nombre: req.body.nombre,
            email: req.body.email,
            contrasena: hashedPassword
        });

        // Guardar el nuevo usuario en la base de datos
        const savedUser = await newUser.save();

        // Enviar una respuesta con el usuario creado
        res.status(201).json(savedUser);
    } catch (err) {
        // Manejar errores
        console.error(err);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Endpoint para el inicio de sesión de usuarios
router.post('/login', async (req, res) => {
    try {
        // Buscar el usuario por su correo electrónico
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(req.body.contrasena, user.contrasena);
        if (!validPassword) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Enviar una respuesta con un mensaje de autenticación exitosa
        res.json({ message: 'Autenticación exitosa' });
    } catch (err) {
        // Manejar errores
        console.error(err);
        res.status(500).json({ message: 'Error en la autenticación' });
    }
});

module.exports = router;
