const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function habitacionRoutes(controller) {
    const router = express.Router();

    router.use(authMiddleware);
    router.post('/', (req, res) => controller.createHabitacion(req, res));
    router.get('/', (req, res) => controller.getHabitaciones(req, res));
    router.get('/activo', (req, res) => controller.getHabitacionesByActivo(req, res));
    router.get('/:id', (req, res) => controller.getHabitacionById(req, res));
    router.get('/piso/:pisoID', (req, res) => controller.getHabitacionesByPisoId(req, res));
    router.get('/numero/:numero', (req, res) => controller.getHabitacionByNumero(req, res));
    router.get('/tipo/:tipo', (req, res) => controller.getHabitacionByTipo(req, res));
    router.get('/capacidad/:capacidad', (req, res) => controller.getHabitacionByCapacidad(req, res));
    router.get('/precio', (req, res) => controller.getHabitacionByPrecioNoche(req, res));
    router.put('/:id', (req, res) => controller.putHabitacion(req, res));
    router.delete('/:id', (req, res) => controller.deleteHabitacion(req, res));

    return router;
};