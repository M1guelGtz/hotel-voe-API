class GetHotelsHandler {
	constructor(getHotelsUseCase) {
		this.getHotelsUseCase = getHotelsUseCase;
	}

	async handle(req, res) {
		try {
			const hotels = await this.getHotelsUseCase.execute();
			res.status(200).json(hotels);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetHotelsHandler;
