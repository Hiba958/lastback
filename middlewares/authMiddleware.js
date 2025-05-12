const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  console.log('Auth middleware - Headers:', req.headers);
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authorization header');
    return res.status(401).json({ message: 'Accès non autorisé - Pas de token' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token in authorization header');
    return res.status(401).json({ message: 'Accès non autorisé - Token manquant' });
  }

  try {
    console.log('Verifying token:', token);
    const decoded = jwt.verify(token, "secret_key");
    console.log('Token decoded:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = protect;
