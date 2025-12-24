class GetPisosUseCase {
    constructor(pisoRepository) {
        this.pisoRepository = pisoRepository;
    }

    execute() {
        return this.pisoRepository.getPisos();
    }
}

module.exports = GetPisosUseCase;
