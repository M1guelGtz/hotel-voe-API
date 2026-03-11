class DeleteRoleHandler {
	constructor(deleteRoleUseCase) {
		this.deleteRoleUseCase = deleteRoleUseCase;
	}

	async handle(req, res) {
		const { id } = req.params;
		try {
			const result = await this.deleteRoleUseCase.execute(id);
			res.status(200).json(result);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = DeleteRoleHandler;
