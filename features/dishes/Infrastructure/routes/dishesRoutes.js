const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function dishesRoutes(controller) {
	const router = express.Router();

	router.use(authMiddleware);
	router.get('/', (req, res) => controller.getDishes(req, res));
	router.get('/:id', (req, res) => controller.getDishById(req, res));
	router.post('/', (req, res) => controller.createDish(req, res));
	router.put('/:id', (req, res) => controller.putDish(req, res));
	router.delete('/:id', (req, res) => controller.deleteDish(req, res));

	return router;
};
