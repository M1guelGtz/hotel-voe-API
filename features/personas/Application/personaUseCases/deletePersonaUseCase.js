class DeletePersonaUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(personaID) {
        return await this.personaRepository.delete(personaID);
    }
}

module.exports = DeletePersonaUseCase;