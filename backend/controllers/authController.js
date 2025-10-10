const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos de entrada
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({ email }).select('+password');
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar estado del usuario
    if (usuario.estado !== 'activo') {
      return res.status(401).json({ message: 'Usuario inactivo' });
    }

    // Verificar contraseña
    const isPasswordValid = await usuario.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Actualizar último acceso
    usuario.ultimoAcceso = new Date();
    await usuario.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'tu_jwt_secret_muy_seguro_aqui',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        ultimoAcceso: usuario.ultimoAcceso
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getProfile = async (req, res) => {
  try {
    res.json({
      usuario: req.usuario
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const logout = async (req, res) => {
  try {
    // En un sistema más complejo, aquí se invalidaría el token
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  login,
  getProfile,
  logout
};
