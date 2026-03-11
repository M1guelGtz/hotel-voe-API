const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function categoriesRoutes(controller) {
	const router = express.Router();

	router.use(authMiddleware);
	router.get('/', (req, res) => controller.getCategories(req, res));
	router.get('/:id', (req, res) => controller.getCategoryById(req, res));
	router.post('/', (req, res) => controller.createCategory(req, res));
	router.put('/:id', (req, res) => controller.putCategory(req, res));
	router.delete('/:id', (req, res) => controller.deleteCategory(req, res));

	return router;
};
