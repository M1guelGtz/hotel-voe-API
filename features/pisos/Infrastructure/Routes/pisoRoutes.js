const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function pisoRoutes(controller) {
    const router = express.Router();

    router.use(authMiddleware);
    router.post('/', (req, res) => controller.createPiso(req, res));
    router.get('/', (req, res) => controller.getPisos(req, res));
    router.get('/activo', (req, res) => controller.getPisosByActivo(req, res));
    router.get('/:id', (req, res) => controller.getPisoById(req, res));
    router.get('/hotel/:hotelID', (req, res) => controller.getPisosByHotelId(req, res));
    router.get('/numero/:numero', (req, res) => controller.getPisoByNumero(req, res));
    router.get('/nombre/:nombre', (req, res) => controller.getPisoByNombre(req, res));
    router.put('/:id', (req, res) => controller.putPiso(req, res));
    router.delete('/:id', (req, res) => controller.deletePiso(req, res));

    return router;
};
