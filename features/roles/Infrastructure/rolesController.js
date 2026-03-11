class RolesController {
	constructor(createController, getController, getByIdController, putController, deleteController) {
		this.createController = createController;
		this.getController = getController;
		this.getByIdController = getByIdController;
		this.putController = putController;
		this.deleteController = deleteController;
	}

	createRole(req, res) {
		return this.createController.handle(req, res);
	}

	getRoles(req, res) {
		return this.getController.handle(req, res);
	}

	getRoleById(req, res) {
		return this.getByIdController.handle(req, res);
	}

	putRole(req, res) {
		return this.putController.handle(req, res);
	}

	deleteRole(req, res) {
		return this.deleteController.handle(req, res);
	}
}

module.exports = RolesController;
