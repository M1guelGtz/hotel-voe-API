class CreateRoleHandler {
	constructor(createRoleUseCase) {
		this.createRoleUseCase = createRoleUseCase;
	}

	async handle(req, res) {
		const { name, description } = req.body;
		try {
			const role = await this.createRoleUseCase.execute({ name, description });
			res.status(201).json({ role });
		} catch (err) {
			res.status(err.statusCode || 400).json({ message: err.message });
		}
	}
}

module.exports = CreateRoleHandler;
