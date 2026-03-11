class GetAreasHandler {
	constructor(getAreasUseCase) {
		this.getAreasUseCase = getAreasUseCase;
	}

	async handle(req, res) {
		try {
			const areas = await this.getAreasUseCase.execute();
			res.status(200).json(areas);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetAreasHandler;
