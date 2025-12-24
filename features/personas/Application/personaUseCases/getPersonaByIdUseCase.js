class GetPersonaByIdUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(personaID) {
        return await this.personaRepository.getById(personaID);
    }
}

module.exports = GetPersonaByIdUseCase;