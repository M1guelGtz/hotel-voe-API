const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function rolesRoutes(controller) {
	const router = express.Router();

	router.use(authMiddleware);
	router.get('/', (req, res) => controller.getRoles(req, res));
	router.get('/:id', (req, res) => controller.getRoleById(req, res));
	router.post('/', (req, res) => controller.createRole(req, res));
	router.put('/:id', (req, res) => controller.putRole(req, res));
	router.delete('/:id', (req, res) => controller.deleteRole(req, res));

	return router;
};
