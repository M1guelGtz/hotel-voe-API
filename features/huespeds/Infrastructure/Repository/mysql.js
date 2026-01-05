const HuespedRepository = require('../../Domain/huespedRepository');

class MySQLHuespedAdapter extends HuespedRepository {
    constructor() {
        super();
    }

    async create(huesped) {
        const query = 'INSERT INTO Huesped (personaID, documentoIdentidad, tipoDocumento, email, telefono) VALUES (?, ?, ?, ?, ?)';
        const values = [huesped.personaID, huesped.documentoIdentidad, huesped.tipoDocumento, huesped.email, huesped.telefono];
        const result = await this.executeQuery(query, values);
        return result.insertId;
    }

    async getAll() {
        const query = 'SELECT * FROM Huesped';
        return await this.executeQuery(query);
    }

    async getById(huespedID) {
        const query = 'SELECT * FROM Huesped WHERE huespedID = ?';
        const values = [huespedID];
        const result = await this.executeQuery(query, values);
        return result[0];
    }

    async getByPersonaId(personaID) {
        const query = 'SELECT * FROM Huesped WHERE personaID = ?';
        const values = [personaID];
        return await this.executeQuery(query, values);
    }

    async getByDocumentoIdentidad(documentoIdentidad) {
        const query = 'SELECT * FROM Huesped WHERE documentoIdentidad = ?';
        const values = [documentoIdentidad];
        const result = await this.executeQuery(query, values);
        return result[0];
    }

    async getByTipoDocumento(tipoDocumento) {
        const query = 'SELECT * FROM Huesped WHERE tipoDocumento = ?';
        const values = [tipoDocumento];
        return await this.executeQuery(query, values);
    }

    async getByEmail(email) {
        const query = 'SELECT * FROM Huesped WHERE email = ?';
        const values = [email];
        return await this.executeQuery(query, values);
    }

    async getByTelefono(telefono) {
        const query = 'SELECT * FROM Huesped WHERE telefono = ?';
        const values = [telefono];
        return await this.executeQuery(query, values);
    }

    async update(huespedID, huesped) {
        const query = 'UPDATE Huesped SET personaID = ?, documentoIdentidad = ?, tipoDocumento = ?, email = ?, telefono = ? WHERE huespedID = ?';
        const values = [huesped.personaID, huesped.documentoIdentidad, huesped.tipoDocumento, huesped.email, huesped.telefono, huespedID];
        await this.executeQuery(query, values);
        return huespedID;
    }

    async delete(huespedID) {
        const query = 'DELETE FROM Huesped WHERE huespedID = ?';
        const values = [huespedID];
        await this.executeQuery(query, values);
        return huespedID;
    }

    async executeQuery(query, values = []) {
        const db = require('../../../../core/db');
        return await db.query(query, values);
    }
}

module.exports = MySQLHuespedAdapter;