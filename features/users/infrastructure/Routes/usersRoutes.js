const express = require('express');

module.exports = function productRoutes(controller) {
    const router = express.Router();

    // POST /users -> create
    router.post('/', (req, res) => controller.createUser(req, res));

    // GET /users -> list
    router.get('/user', (req, res) => controller.getUsers(req, res));

    return router;
};