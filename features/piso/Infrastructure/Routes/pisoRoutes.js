const express = require('express');
const router = express.Router();
const { pisoController } = require('../dependences');

router.post('/', (req, res) => pisoController.createPiso(req, res));
router.get('/', (req, res) => pisoController.getPisos(req, res));
router.get('/activo', (req, res) => pisoController.getPisosByActivo(req, res));
router.get('/:id', (req, res) => pisoController.getPisoById(req, res));
router.get('/hotel/:hotelID', (req, res) => pisoController.getPisosByHotelId(req, res));
router.get('/numero/:numero', (req, res) => pisoController.getPisoByNumero(req, res));
router.get('/nombre/:nombre', (req, res) => pisoController.getPisoByNombre(req, res));
router.put('/:id', (req, res) => pisoController.putPiso(req, res));
router.delete('/:id', (req, res) => pisoController.deletePiso(req, res));

module.exports = router;
