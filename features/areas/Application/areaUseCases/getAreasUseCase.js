class GetAreasUseCase {
	constructor(areaRepository) {
		this.areaRepository = areaRepository;
	}

	execute() {
		return this.areaRepository.getAreas();
	}
}

module.exports = GetAreasUseCase;
