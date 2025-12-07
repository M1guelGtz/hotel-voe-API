const express = require('express');

function habitacionRoutes(habitacionController) {
    const router = express.Router();

    // POST - Create habitacion
    router.post('/', (req, res) => habitacionController.createHabitacion(req, res));

    // GET - Get all habitaciones
    router.get('/', (req, res) => habitacionController.getHabitaciones(req, res));

    // GET - Get habitaciones activas
    router.get('/activas', (req, res) => habitacionController.getHabitacionesByActivo(req, res));

    // GET - Get habitaciones by piso
    router.get('/piso/:pisoID', (req, res) => habitacionController.getHabitacionesByPiso(req, res));

    // GET - Get habitaciones by tipo
    router.get('/tipo/:tipo', (req, res) => habitacionController.getHabitacionesByTipo(req, res));

    // GET - Get habitacion by numero
    router.get('/numero/:numero', (req, res) => habitacionController.getHabitacionByNumero(req, res));

    // GET - Get habitacion by ID
    router.get('/:id', (req, res) => habitacionController.getHabitacionById(req, res));

    // PUT - Update habitacion
    router.put('/:id', (req, res) => habitacionController.updateHabitacion(req, res));

    // DELETE - Delete habitacion
    router.delete('/:id', (req, res) => habitacionController.deleteHabitacion(req, res));

    return router;
}

module.exports = habitacionRoutes;
