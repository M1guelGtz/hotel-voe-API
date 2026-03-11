class GetRolesHandler {
	constructor(getRolesUseCase) {
		this.getRolesUseCase = getRolesUseCase;
	}

	async handle(req, res) {
		try {
			const roles = await this.getRolesUseCase.execute();
			res.status(200).json({ roles });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetRolesHandler;
