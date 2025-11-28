class UserController {
    constructor(createController, getController) {
        this.createController = createController;
        this.getController = getController;
    }

    createUser(req, res) {
        const userData = req.body;
        // delegate to handler's HTTP interface
        return this.createController.handle(req, res);
    }

    getUsers(req, res) {
        return this.getController.handle(req, res);
    }
    putUsers(req, res) {
        return this.putController.handle(req, res);
    }

    deleteUsers(req, res) {
        return this.deleteController.handle(req, res);
    }

    getUserById(req, res) {
        return this.getByIdController.handle(req, res);
    }
    getUserByEmail(req, res) {
        return this.getByEmailController.handle(req, res);
    }

    loginUser(req, res) {
        return this.loginController.handle(req, res);
    }

    registerUser(req, res) {
        return this.registerController.handle(req, res);
    }
}

module.exports = UserController;