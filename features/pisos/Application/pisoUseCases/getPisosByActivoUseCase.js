class GetPisosByActivoUseCase {
    constructor(pisoRepository) {
        this.pisoRepository = pisoRepository;
    }

    execute() {
        return this.pisoRepository.getPisosByActivo();
    }
}

module.exports = GetPisosByActivoUseCase;
