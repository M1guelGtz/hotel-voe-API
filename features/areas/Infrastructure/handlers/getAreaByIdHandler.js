class GetAreaByIdHandler {
	constructor(getAreaByIdUseCase) {
		this.getAreaByIdUseCase = getAreaByIdUseCase;
	}

	async handle(req, res) {
		try {
			const area = await this.getAreaByIdUseCase.execute(req.params.id);
			res.status(200).json(area);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetAreaByIdHandler;
