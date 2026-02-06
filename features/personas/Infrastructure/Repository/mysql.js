const PersonaRepository = require('../../Domain/personaRepository');

class MySQLPersonaAdapter extends PersonaRepository {
    constructor() {
        super();
    }

    async create(persona) {
        const query = 'INSERT INTO Persona (nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [persona.nombre, persona.apellidoPaterno, persona.apellidoMaterno, persona.fechaNacimiento, persona.telefono, persona.direccion];
        const result = await this.executeQuery(query, values);
        return result.insertId;
    }

    async getAll() {
        const query = 'SELECT * FROM Persona';
        return await this.executeQuery(query);
    }

    async getById(personaID) {
        const query = 'SELECT * FROM Persona WHERE personaID = ?';
        const values = [personaID];
        const result = await this.executeQuery(query, values);
        return result[0];
    }

    async getByNombreApellido(nombre, apellidoPaterno) {
        const query = 'SELECT * FROM Persona WHERE nombre = ? AND apellidoPaterno = ?';
        const values = [nombre, apellidoPaterno];
        return await this.executeQuery(query, values);
    }

    async getByApellidoMaterno(apellidoMaterno) {
        const query = 'SELECT * FROM Persona WHERE apellidoMaterno = ?';
        const values = [apellidoMaterno];
        return await this.executeQuery(query, values);
    }

    async getByFechaNacimiento(fechaNacimiento) {
        const query = 'SELECT * FROM Persona WHERE fechaNacimiento = ?';
        const values = [fechaNacimiento];
        return await this.executeQuery(query, values);
    }

    async getByTelefono(telefono) {
        const query = 'SELECT * FROM Persona WHERE telefono = ?';
        const values = [telefono];
        return await this.executeQuery(query, values);
    }

    async getByDireccion(direccion) {
        const query = 'SELECT * FROM Persona WHERE direccion = ?';
        const values = [direccion];
        return await this.executeQuery(query, values);
    }

    async update(personaID, persona) {
        const query = 'UPDATE Persona SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, fechaNacimiento = ?, telefono = ?, direccion = ? WHERE personaID = ?';
        const values = [persona.nombre, persona.apellidoPaterno, persona.apellidoMaterno, persona.fechaNacimiento, persona.telefono, persona.direccion, personaID];
        await this.executeQuery(query, values);
        return personaID;
    }

    async delete(personaID) {
        const query = 'DELETE FROM Persona WHERE personaID = ?';
        const values = [personaID];
        await this.executeQuery(query, values);
        return personaID;
    }

    async executeQuery(query, values = []) {
        const db = require('../../../../core/db');
        return await db.query(query, values);
    }
}

module.exports = MySQLPersonaAdapter;