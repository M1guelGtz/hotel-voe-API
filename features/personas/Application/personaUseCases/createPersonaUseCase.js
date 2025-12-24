const Persona = require('../../Domain/persona');

class CreatePersonaUseCase {
    constructor(personaRepository) {
        this.personaRepository = personaRepository;
    }

    async execute(personaData) {
        const persona = new Persona(null, personaData.nombre, personaData.apellidoPaterno, personaData.apellidoMaterno, personaData.fechaNacimiento, personaData.telefono, personaData.direccion);
        return await this.personaRepository.create(persona);
    }
}

module.exports = CreatePersonaUseCase;