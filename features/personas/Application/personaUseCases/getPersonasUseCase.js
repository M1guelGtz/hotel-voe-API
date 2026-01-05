class GetPersonasUseCase {
    constructor(personaRepository) {
        this.personaRepository = personaRepository;
    }

    async execute() {
        return await this.personaRepository.getAll();
    }
}

module.exports = GetPersonasUseCase;