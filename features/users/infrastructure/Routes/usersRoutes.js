const express = require('express');

module.exports = function productRoutes(controller) {
    const router = express.Router();

    router.post('/', (req, res) => controller.createUser(req, res));
    router.get('/', (req, res) => controller.getUsers(req, res));
    router.put('/:id', (req, res) => controller.putUsers(req, res));
    router.delete('/:id', (req, res) => controller.deleteUsers(req, res));
    router.get('/:id', (req, res) => controller.getUserById(req, res));
    router.get('/email/:email', (req, res) => controller.getUserByEmail(req, res));
    router.post('/login', (req, res) => controller.loginUser(req, res));
    router.post('/register', (req, res) => controller.registerUser(req, res));

    
    return router;
};