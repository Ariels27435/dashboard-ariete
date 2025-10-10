const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token de acceso requerido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_jwt_secret_muy_seguro_aqui');
    const usuario = await Usuario.findById(decoded.id).select('-password');
    
    if (!usuario) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    if (usuario.estado !== 'activo') {
      return res.status(401).json({ message: 'Usuario inactivo' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(401).json({ message: 'Token inválido' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador' });
  }
  next();
};

const supervisorOrAdmin = (req, res, next) => {
  if (!['admin', 'supervisor'].includes(req.usuario.rol)) {
    return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de supervisor o administrador' });
  }
  next();
};

module.exports = {
  auth,
  adminOnly,
  supervisorOrAdmin
};
