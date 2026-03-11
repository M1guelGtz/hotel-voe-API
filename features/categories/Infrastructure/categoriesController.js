class CategoriesController {
	constructor(createController, getController, getByIdController, putController, deleteController) {
		this.createController = createController;
		this.getController = getController;
		this.getByIdController = getByIdController;
		this.putController = putController;
		this.deleteController = deleteController;
	}

	createCategory(req, res) {
		return this.createController.handle(req, res);
	}

	getCategories(req, res) {
		return this.getController.handle(req, res);
	}

	getCategoryById(req, res) {
		return this.getByIdController.handle(req, res);
	}

	putCategory(req, res) {
		return this.putController.handle(req, res);
	}

	deleteCategory(req, res) {
		return this.deleteController.handle(req, res);
	}
}

module.exports = CategoriesController;
