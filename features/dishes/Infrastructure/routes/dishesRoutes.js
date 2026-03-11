const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');
const upload = require('../../../../core/middleware/multer');

module.exports = function dishesRoutes(controller) {
	const router = express.Router();

	router.use(authMiddleware);
	router.get('/', (req, res) => controller.getDishes(req, res));
	router.get('/:id', (req, res) => controller.getDishById(req, res));
	// Usar multer.single('image') para recibir un archivo con nombre 'image'
	router.post('/', upload.single('image'), (req, res) => controller.createDish(req, res));
	router.put('/:id', (req, res) => controller.putDish(req, res));
	router.delete('/:id', (req, res) => controller.deleteDish(req, res));

	return router;
};
