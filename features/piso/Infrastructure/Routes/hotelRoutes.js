const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function hotelRoutes(controller) {
    const router = express.Router();

    
    router.use(authMiddleware);
    // Collection
    router.get('/', (req, res) => controller.getHotels(req, res));
    // Active hotels
    router.get('/activos', (req, res) => controller.getHotelsByActivo(req, res));
    // Field searches (specific routes must come before the ':id' route)
    router.get('/nombre/:nombre', (req, res) => controller.getHotelByNombre(req, res));
    router.get('/direccion/:direccion', (req, res) => controller.getHotelByDireccion(req, res));
    
    router.get('/email/:email', (req, res) => controller.getHotelByEmail(req, res));
    router.get('/telefono/:telefono', (req, res) => controller.getHotelByTelefono(req, res));
    // Single resource by id
    router.get('/:id', (req, res) => controller.getHotelById(req, res));
    
    // Create / update / delete
    router.post('/', (req, res) => controller.createHotel(req, res));
    router.put('/:id', (req, res) => controller.putHotel(req, res));
    router.delete('/:id', (req, res) => controller.deleteHotel(req, res));

    return router;
};
