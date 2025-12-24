class GetPersonaByDireccionUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(direccion) {
        return await this.personaRepository.getByDireccion(direccion);
    }
}

module.exports = GetPersonaByDireccionUseCase;