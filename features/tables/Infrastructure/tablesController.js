class TablesController {
	constructor({
		createTableHandler,
		getTablesHandler,
		getTableByIdHandler,
		putTableHandler,
		deleteTableHandler
	}) {
		this.createTableHandler = createTableHandler;
		this.getTablesHandler = getTablesHandler;
		this.getTableByIdHandler = getTableByIdHandler;
		this.putTableHandler = putTableHandler;
		this.deleteTableHandler = deleteTableHandler;
	}
}

module.exports = TablesController;
