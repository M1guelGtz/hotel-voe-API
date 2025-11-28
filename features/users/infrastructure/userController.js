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
}

module.exports = UserController;