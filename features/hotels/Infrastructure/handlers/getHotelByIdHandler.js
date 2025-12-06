class GetHotelByIdHandler {
	constructor(getHotelByIdUseCase) {
		this.getHotelByIdUseCase = getHotelByIdUseCase;
	}

	async handle(req, res) {
		const { id } = req.params;
		try {
			const hotel = await this.getHotelByIdUseCase.execute(id);
			res.status(200).json(hotel);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetHotelByIdHandler;
