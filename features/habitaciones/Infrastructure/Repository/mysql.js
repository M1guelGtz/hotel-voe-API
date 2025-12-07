const db = require('../../../../core/db');

class MySQLHabitacionRepository {
    constructor() {
        this.pool = db.pool;
    }

    async createHabitacion(habitacion) {
        const query = 'INSERT INTO Habitacion (pisoID, numero, tipo, capacidad, precioNoche, activo) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            const result = await db.executePreparedQuery(query, [
                habitacion.pisoID,
                habitacion.numero,
                habitacion.tipo,
                habitacion.capacidad,
                habitacion.precioNoche,
                habitacion.activo ? 1 : 0
            ]);
            const insertId = result && (result.insertId || result.insert_id || (result.affectedRows ? result.insertId : null));
            if (insertId) {
                return {
                    habitacionID: insertId,
                    pisoID: habitacion.pisoID,
                    numero: habitacion.numero,
                    tipo: habitacion.tipo,
                    capacidad: habitacion.capacidad,
                    precioNoche: habitacion.precioNoche,
                    activo: habitacion.activo
                };
            }
            return result;
        } catch (err) {
            throw new Error('Error executing insert into Habitacion: ' + err.message);
        }
    }

    async getHabitaciones() {
        const query = 'SELECT * FROM Habitacion';
        try {
            const rows = await db.fetchRows(query);
            return rows;
        } catch (err) {
            throw new Error('Error fetching habitaciones: ' + err.message);
        }
    }

    async getHabitacionById(id) {
        const query = 'SELECT * FROM Habitacion WHERE habitacionID = ?';
        try {
            const rows = await db.executePreparedQuery(query, [id]);
            return rows && rows[0];
        } catch (err) {
            throw new Error('Error fetching habitacion by ID: ' + err.message);
        }
    }

    async getHabitacionesByPiso(pisoID) {
        const query = 'SELECT * FROM Habitacion WHERE pisoID = ?';
        try {
            const rows = await db.executePreparedQuery(query, [pisoID]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching habitaciones by piso: ' + err.message);
        }
    }

    async getHabitacionesByTipo(tipo) {
        const query = 'SELECT * FROM Habitacion WHERE tipo = ?';
        try {
            const rows = await db.executePreparedQuery(query, [tipo]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching habitaciones by tipo: ' + err.message);
        }
    }

    async getHabitacionesByActivo() {
        const query = 'SELECT * FROM Habitacion WHERE activo = 1';
        try {
            const rows = await db.fetchRows(query);
            return rows;
        } catch (err) {
            throw new Error('Error fetching active habitaciones: ' + err.message);
        }
    }

    async updateHabitacion(id, habitacionData) {
        const query = 'UPDATE Habitacion SET pisoID = ?, numero = ?, tipo = ?, capacidad = ?, precioNoche = ?, activo = ? WHERE habitacionID = ?';
        try {
            const activoVal = habitacionData.activo !== undefined ? (habitacionData.activo ? 1 : 0) : 1;
            const result = await db.executePreparedQuery(query, [
                habitacionData.pisoID,
                habitacionData.numero,
                habitacionData.tipo,
                habitacionData.capacidad,
                habitacionData.precioNoche,
                activoVal,
                id
            ]);
            return result;
        } catch (err) {
            throw new Error('Error updating habitacion: ' + err.message);
        }
    }

    async deleteHabitacion(id) {
        const query = 'DELETE FROM Habitacion WHERE habitacionID = ?';
        try {
            const result = await db.executePreparedQuery(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Error deleting habitacion: ' + err.message);
        }
    }

    async getHabitacionByNumero(numero) {
        const query = 'SELECT * FROM Habitacion WHERE numero = ?';
        try {
            const rows = await db.executePreparedQuery(query, [numero]);
            return rows && rows[0];
        } catch (err) {
            throw new Error('Error fetching habitacion by numero: ' + err.message);
        }
    }
}

module.exports = MySQLHabitacionRepository;
