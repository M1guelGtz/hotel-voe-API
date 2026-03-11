class DeleteTableUseCase {
	constructor({ tableRepository }) {
		this.tableRepository = tableRepository;
	}

	async execute(id) {
		const current = await this.tableRepository.getTableById(id);
		if (!current) {
			const err = new Error(`Mesa con ID ${id} no encontrada`);
			err.statusCode = 404;
			throw err;
		}
		return this.tableRepository.deleteTable(id);
	}
}

module.exports = DeleteTableUseCase;
