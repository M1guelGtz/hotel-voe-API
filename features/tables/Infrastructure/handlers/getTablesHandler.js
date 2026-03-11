class GetTablesHandler {
	constructor(getTablesUseCase) {
		this.getTablesUseCase = getTablesUseCase;
	}

	async handle(req, res) {
		try {
			const tables = await this.getTablesUseCase.execute();
			res.status(200).json({ tables });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetTablesHandler;
