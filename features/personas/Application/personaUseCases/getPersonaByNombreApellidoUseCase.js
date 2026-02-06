class GetPersonaByNombreApellidoUseCase {
    constructor({ personaRepository }) {
        this.personaRepository = personaRepository;
    }

    async execute(nombre, apellidoPaterno) {
        return await this.personaRepository.getByNombreApellido(nombre, apellidoPaterno);
    }
}

module.exports = GetPersonaByNombreApellidoUseCase;