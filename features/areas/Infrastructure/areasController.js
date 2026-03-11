class AreasController {
	constructor(createController, getController, getByIdController, putController, deleteController) {
		this.createController = createController;
		this.getController = getController;
		this.getByIdController = getByIdController;
		this.putController = putController;
		this.deleteController = deleteController;
	}

	createArea(req, res) {
		return this.createController.handle(req, res);
	}

	getAreas(req, res) {
		return this.getController.handle(req, res);
	}

	getAreaById(req, res) {
		return this.getByIdController.handle(req, res);
	}

	putArea(req, res) {
		return this.putController.handle(req, res);
	}

	deleteArea(req, res) {
		return this.deleteController.handle(req, res);
	}
}

module.exports = AreasController;
