class GetAreaByIdUseCase {
	constructor({ areaRepository }) {
		this.areaRepository = areaRepository;
	}

	async execute(id) {
		const area = await this.areaRepository.getAreaById(id);
		if (!area) {
			const err = new Error(`Area with ID ${id} not found`);
			err.statusCode = 404;
			throw err;
		}
		return { area };
	}
}

module.exports = GetAreaByIdUseCase;
