class GetHotelByTelefonoHandler {
	constructor(getHotelByTelefonoUseCase) {
		this.getHotelByTelefonoUseCase = getHotelByTelefonoUseCase;
	}

	async handle(req, res) {
		const { telefono } = req.params;
		try {
			const hotel = await this.getHotelByTelefonoUseCase.execute(telefono);
			res.status(200).json(hotel);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetHotelByTelefonoHandler;
