const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function personaRoutes(controller) {
    const router = express.Router();

    router.use(authMiddleware);
    router.post('/', (req, res) => controller.createPersona(req, res));
    router.get('/', (req, res) => controller.getPersonas(req, res));
    router.get('/buscar', (req, res) => controller.getPersonaByNombreApellido(req, res));
    router.get('/apellidoMaterno/:apellidoMaterno', (req, res) => controller.getPersonaByApellidoMaterno(req, res));
    router.get('/fechaNacimiento', (req, res) => controller.getPersonaByFechaNacimiento(req, res));
    router.get('/telefono/:telefono', (req, res) => controller.getPersonaByTelefono(req, res));
    router.get('/direccion', (req, res) => controller.getPersonaByDireccion(req, res));
    router.get('/:id', (req, res) => controller.getPersonaById(req, res));
    router.put('/:id', (req, res) => controller.putPersona(req, res));
    router.delete('/:id', (req, res) => controller.deletePersona(req, res));

    return router;
};