class GetHotelsByActivoHandler {
	constructor(getHotelsByActivoUseCase) {
		this.getHotelsByActivoUseCase = getHotelsByActivoUseCase;
	}

	async handle(req, res) {
		try {
			const hotels = await this.getHotelsByActivoUseCase.execute();
			res.status(200).json(hotels);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetHotelsByActivoHandler;
