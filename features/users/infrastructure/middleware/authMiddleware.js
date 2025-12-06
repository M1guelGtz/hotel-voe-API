const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'dev-secret';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attach user info to request
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
