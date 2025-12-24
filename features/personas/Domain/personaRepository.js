class PersonaRepository {
    async create(persona) {
        throw new Error('Method not implemented');
    }

    async getAll() {
        throw new Error('Method not implemented');
    }

    async getById(personaID) {
        throw new Error('Method not implemented');
    }

    async getByNombreApellido(nombre, apellidoPaterno) {
        throw new Error('Method not implemented');
    }

    async getByApellidoMaterno(apellidoMaterno) {
        throw new Error('Method not implemented');
    }

    async getByFechaNacimiento(fechaNacimiento) {
        throw new Error('Method not implemented');
    }

    async getByTelefono(telefono) {
        throw new Error('Method not implemented');
    }

    async getByDireccion(direccion) {
        throw new Error('Method not implemented');
    }

    async update(personaID, persona) {
        throw new Error('Method not implemented');
    }

    async delete(personaID) {
        throw new Error('Method not implemented');
    }
}

module.exports = PersonaRepository;