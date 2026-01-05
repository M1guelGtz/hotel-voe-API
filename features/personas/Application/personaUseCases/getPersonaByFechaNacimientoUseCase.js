class GetPersonaByFechaNacimientoUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(fechaNacimiento) {
        return await this.personaRepository.getByFechaNacimiento(fechaNacimiento);
    }
}

module.exports = GetPersonaByFechaNacimientoUseCase;