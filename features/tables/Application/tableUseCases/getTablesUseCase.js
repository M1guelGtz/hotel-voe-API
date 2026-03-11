class GetTablesUseCase {
	constructor(tableRepository) {
		this.tableRepository = tableRepository;
	}

	async execute() {
		return this.tableRepository.getTables();
	}
}

module.exports = GetTablesUseCase;
