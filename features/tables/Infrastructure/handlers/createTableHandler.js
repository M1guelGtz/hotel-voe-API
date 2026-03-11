class CreateTableHandler {
	constructor(createTableUseCase) {
		this.createTableUseCase = createTableUseCase;
	}

	async handle(req, res) {
		const { number, capacity, is_active } = req.body;
		try {
			const table = await this.createTableUseCase.execute({ number, capacity, is_active });
			res.status(201).json({ table });
		} catch (err) {
			res.status(err.statusCode || 400).json({ message: err.message });
		}
	}
}

module.exports = CreateTableHandler;
