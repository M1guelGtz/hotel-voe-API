class GetHuespedByPersonaIdUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(personaID) {
        return await this.huespedRepository.getByPersonaId(personaID);
    }
}

module.exports = GetHuespedByPersonaIdUseCase;