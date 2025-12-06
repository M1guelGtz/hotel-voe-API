class PutHotelHandler {
	constructor(putHotelUseCase) {
		this.putHotelUseCase = putHotelUseCase;
	}

	async handle(req, res) {
		const { id } = req.params;
		const hotelData = req.body;
		try {
			const updated = await this.putHotelUseCase.execute(id, hotelData);
			res.status(200).json(updated);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = PutHotelHandler;
