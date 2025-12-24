const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function huespedRoutes(controller) {
    const router = express.Router();

    router.use(authMiddleware);
    router.post('/', (req, res) => controller.createHuesped(req, res));
    router.get('/', (req, res) => controller.getHuespeds(req, res));
    router.get('/:id', (req, res) => controller.getHuespedById(req, res));
    router.get('/persona/:personaID', (req, res) => controller.getHuespedByPersonaId(req, res));
    router.get('/documento/:documentoIdentidad', (req, res) => controller.getHuespedByDocumentoIdentidad(req, res));
    router.get('/tipoDocumento/:tipoDocumento', (req, res) => controller.getHuespedByTipoDocumento(req, res));
    router.get('/email', (req, res) => controller.getHuespedByEmail(req, res));
    router.get('/telefono/:telefono', (req, res) => controller.getHuespedByTelefono(req, res));
    router.put('/:id', (req, res) => controller.putHuesped(req, res));
    router.delete('/:id', (req, res) => controller.deleteHuesped(req, res));

    return router;
};