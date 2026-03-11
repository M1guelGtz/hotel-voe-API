const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function areasRoutes(controller) {
	const router = express.Router();

	router.use(authMiddleware);
	router.get('/', (req, res) => controller.getAreas(req, res));
	router.get('/:id', (req, res) => controller.getAreaById(req, res));
	router.post('/', (req, res) => controller.createArea(req, res));
	router.put('/:id', (req, res) => controller.putArea(req, res));
	router.delete('/:id', (req, res) => controller.deleteArea(req, res));

	return router;
};
