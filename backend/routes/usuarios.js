const express = require('express');
const Usuario = require('../models/Usuario');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// Obtener todos los usuarios (solo admin)
router.get('/', adminOnly, async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password').sort({ nombre: 1 });
    res.json(usuarios);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener usuario por ID
router.get('/:id', adminOnly, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Crear nuevo usuario (solo admin)
router.post('/', adminOnly, async (req, res) => {
  try {
    const { nombre, email, password, rol, estado } = req.body;

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const usuario = new Usuario({
      nombre,
      email,
      password,
      rol: rol || 'operador',
      estado: estado || 'activo'
    });

    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Actualizar usuario (solo admin)
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const { nombre, email, rol, estado, configuracion } = req.body;
    
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, rol, estado, configuracion },
      { new: true, runValidators: true }
    ).select('-password');

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar usuario (solo admin)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
