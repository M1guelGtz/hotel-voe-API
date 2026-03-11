class PutAreaHandler {
	constructor(putAreaUseCase) {
		this.putAreaUseCase = putAreaUseCase;
	}

	async handle(req, res) {
		const { id } = req.params;
		const areaData = req.body;
		try {
			const updated = await this.putAreaUseCase.execute(id, areaData);
			res.status(200).json({ area: updated });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = PutAreaHandler;
