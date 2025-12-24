class GetPersonaByTelefonoUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(telefono) {
        return await this.personaRepository.getByTelefono(telefono);
    }
}

module.exports = GetPersonaByTelefonoUseCase;