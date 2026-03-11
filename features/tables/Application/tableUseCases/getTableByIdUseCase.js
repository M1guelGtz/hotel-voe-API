class GetTableByIdUseCase {
	constructor({ tableRepository }) {
		this.tableRepository = tableRepository;
	}

	async execute(id) {
		const table = await this.tableRepository.getTableById(id);
		if (!table) {
			const err = new Error(`Mesa con ID ${id} no encontrada`);
			err.statusCode = 404;
			throw err;
		}
		return { table };
	}
}

module.exports = GetTableByIdUseCase;
