
class GetHotelByDireccionHandler {
	constructor(getHotelByDireccionUseCase) {
		this.getHotelByDireccionUseCase = getHotelByDireccionUseCase;
	}

	async handle(req, res) {
		const { direccion } = req.params;
		try {
			const hotel = await this.getHotelByDireccionUseCase.execute(direccion);
			res.status(200).json(hotel);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetHotelByDireccionHandler;

