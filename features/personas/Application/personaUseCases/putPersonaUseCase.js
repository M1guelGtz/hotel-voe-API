class PutPersonaUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(personaID, personaData) {
        return await this.personaRepository.update(personaID, personaData);
    }
}

module.exports = PutPersonaUseCase;