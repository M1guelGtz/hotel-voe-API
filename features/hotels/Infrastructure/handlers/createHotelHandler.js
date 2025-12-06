class CreateHotelHandler {
	constructor(createHotelUseCase) {
		this.createHotelUseCase = createHotelUseCase;
	}

	async handle(req, res) {
		try {
			const hotelData = req.body;
			const created = await this.createHotelUseCase.execute(hotelData);
			res.status(201).json(created);
		} catch (err) {
			res.status(err.statusCode || 500).json({ error: err.message });
		}
	}
}

module.exports = CreateHotelHandler;
