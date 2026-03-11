class PutRoleHandler {
	constructor(putRoleUseCase) {
		this.putRoleUseCase = putRoleUseCase;
	}

	async handle(req, res) {
		const { id } = req.params;
		try {
			const role = await this.putRoleUseCase.execute(id, req.body);
			res.status(200).json({ role });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = PutRoleHandler;
