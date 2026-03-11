class CreateAreaHandler {
	constructor(createAreaUseCase) {
		this.createAreaUseCase = createAreaUseCase;
	}

	async handle(req, res) {
		try {
			const areaData = req.body;
			const created = await this.createAreaUseCase.execute(areaData);
			res.status(201).json({ area: created });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = CreateAreaHandler;
