const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

function ticketsRoutes(controller) {
    const router = express.Router();

    router.use(authMiddleware);

    router.post('/', (req, res) => controller.createTicketHandler.handle(req, res));
    router.get('/', (req, res) => controller.getTicketsHandler.handle(req, res));
    router.get('/session/:sessionId', (req, res) => controller.getTicketBySessionHandler.handle(req, res));
    router.get('/:id', (req, res) => controller.getTicketByIdHandler.handle(req, res));

    return router;
}

module.exports = ticketsRoutes;
