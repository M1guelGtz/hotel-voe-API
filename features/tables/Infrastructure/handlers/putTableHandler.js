class PutTableHandler {
	constructor(putTableUseCase) {
		this.putTableUseCase = putTableUseCase;
	}

	async handle(req, res) {
		const { id } = req.params;
		const tableData = req.body;
		try {
			const updated = await this.putTableUseCase.execute(id, tableData);
			res.status(200).json({ table: updated });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = PutTableHandler;
