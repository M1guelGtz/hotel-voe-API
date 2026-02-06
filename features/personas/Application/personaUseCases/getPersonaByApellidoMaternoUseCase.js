class GetPersonaByApellidoMaternoUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(apellidoMaterno) {
        return await this.personaRepository.getByApellidoMaterno(apellidoMaterno);
    }
}

module.exports = GetPersonaByApellidoMaternoUseCase;