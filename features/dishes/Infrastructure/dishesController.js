class DishesController {
	constructor(createController, getController, getByIdController, putController, deleteController) {
		this.createController = createController;
		this.getController = getController;
		this.getByIdController = getByIdController;
		this.putController = putController;
		this.deleteController = deleteController;
	}

	createDish(req, res) {
		return this.createController.handle(req, res);
	}

	getDishes(req, res) {
		return this.getController.handle(req, res);
	}

	getDishById(req, res) {
		return this.getByIdController.handle(req, res);
	}

	putDish(req, res) {
		return this.putController.handle(req, res);
	}

	deleteDish(req, res) {
		return this.deleteController.handle(req, res);
	}
}

module.exports = DishesController;
