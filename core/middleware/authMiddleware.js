const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !/^Bearer\s+/i.test(authHeader)) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(/\s+/)[1];
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
