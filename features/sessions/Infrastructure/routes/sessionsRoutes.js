const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

function sessionsRoutes(controller) {
  const router = express.Router();

  router.use(authMiddleware);

  router.post('/', (req, res) => controller.createSession(req, res));
  router.get('/', (req, res) => controller.getSessions(req, res));
  router.get('/:id', (req, res) => controller.getSessionById(req, res));
  router.put('/:id/close', (req, res) => controller.closeSession(req, res));

  return router;
}

module.exports = sessionsRoutes;
