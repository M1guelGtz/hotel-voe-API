const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

function tablesRoutes(controller) {
	const router = express.Router();

	router.get('/', authMiddleware, (req, res) => controller.getTablesHandler.handle(req, res));
	router.get('/:id', authMiddleware, (req, res) => controller.getTableByIdHandler.handle(req, res));
	router.post('/', authMiddleware, (req, res) => controller.createTableHandler.handle(req, res));
	router.put('/:id', authMiddleware, (req, res) => controller.putTableHandler.handle(req, res));
	router.delete('/:id', authMiddleware, (req, res) => controller.deleteTableHandler.handle(req, res));

	return router;
}

module.exports = tablesRoutes;
