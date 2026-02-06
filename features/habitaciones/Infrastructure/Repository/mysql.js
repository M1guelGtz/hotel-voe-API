const HabitacionRepository = require('../../Domain/habitacionRepository');

class MySQLHabitacionAdapter extends HabitacionRepository {
    constructor() {
        super();
    }

    async create(habitacion) {
        const query = 'INSERT INTO Habitacion (pisoID, numero, tipo, capacidad, precioNoche, activo) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [habitacion.pisoID, habitacion.numero, habitacion.tipo, habitacion.capacidad, habitacion.precioNoche, habitacion.activo];
        const result = await this.executeQuery(query, values);
        return result.insertId;
    }

    async getAll() {
        const query = 'SELECT * FROM Habitacion';
        return await this.executeQuery(query);
    }

    async getById(habitacionID) {
        const query = 'SELECT * FROM Habitacion WHERE habitacionID = ?';
        const values = [habitacionID];
        const result = await this.executeQuery(query, values);
        return result[0];
    }

    async getByPisoId(pisoID) {
        const query = 'SELECT * FROM Habitacion WHERE pisoID = ?';
        const values = [pisoID];
        return await this.executeQuery(query, values);
    }

    async getByNumero(numero) {
        const query = 'SELECT * FROM Habitacion WHERE numero = ?';
        const values = [numero];
        const result = await this.executeQuery(query, values);
        return result[0];
    }

    async getByTipo(tipo) {
        const query = 'SELECT * FROM Habitacion WHERE tipo = ?';
        const values = [tipo];
        return await this.executeQuery(query, values);
    }

    async getByCapacidad(capacidad) {
        const query = 'SELECT * FROM Habitacion WHERE capacidad = ?';
        const values = [capacidad];
        return await this.executeQuery(query, values);
    }

    async getByPrecioNoche(precioNoche) {
        const query = 'SELECT * FROM Habitacion WHERE precioNoche = ?';
        const values = [precioNoche];
        return await this.executeQuery(query, values);
    }

    async getByActivo(activo) {
        const query = 'SELECT * FROM Habitacion WHERE activo = ?';
        const values = [activo];
        return await this.executeQuery(query, values);
    }

    async update(habitacionID, habitacion) {
        const query = 'UPDATE Habitacion SET pisoID = ?, numero = ?, tipo = ?, capacidad = ?, precioNoche = ?, activo = ? WHERE habitacionID = ?';
        const values = [habitacion.pisoID, habitacion.numero, habitacion.tipo, habitacion.capacidad, habitacion.precioNoche, habitacion.activo, habitacionID];
        await this.executeQuery(query, values);
        return habitacionID;
    }

    async delete(habitacionID) {
        const query = 'DELETE FROM Habitacion WHERE habitacionID = ?';
        const values = [habitacionID];
        await this.executeQuery(query, values);
        return habitacionID;
    }

    async executeQuery(query, values = []) {
        const db = require('../../../../core/db');
        return await db.query(query, values);
    }
}

module.exports = MySQLHabitacionAdapter;
