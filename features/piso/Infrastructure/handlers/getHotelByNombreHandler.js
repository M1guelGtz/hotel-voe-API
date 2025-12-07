class GetHotelByNombreHandler {
	constructor(getHotelByNombreUseCase) {
		this.getHotelByNombreUseCase = getHotelByNombreUseCase;
	}

	async handle(req, res) {
		const { nombre } = req.params;
		try {
			const hotel = await this.getHotelByNombreUseCase.execute(nombre);
			res.status(200).json(hotel);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetHotelByNombreHandler;
