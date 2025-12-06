class GetHotelByEmailHandler {
	constructor(getHotelByEmailUseCase) {
		this.getHotelByEmailUseCase = getHotelByEmailUseCase;
	}

	async handle(req, res) {
		const { email } = req.params;
		try {
			const hotel = await this.getHotelByEmailUseCase.execute(email);
			res.status(200).json(hotel);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetHotelByEmailHandler;
