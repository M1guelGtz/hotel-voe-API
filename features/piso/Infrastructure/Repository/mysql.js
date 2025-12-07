const db = require('../../../../core/db');
const PisoRepository = require('../../Domain/pisoRepository');

class MySQLPisoAdapter extends PisoRepository {
    constructor() {
        super();
        this.pool = db.pool;
    }

    async postPisos(piso) {
        const query = 'INSERT INTO Piso (hotelID, numero, nombre, activo) VALUES (?, ?, ?, ?)';
        try {
            const result = await db.executePreparedQuery(query, [piso.hotelID, piso.numero, piso.nombre, piso.activo ? 1 : 0]);
            const insertId = result && (result.insertId || result.insert_id || (result.affectedRows ? result.insertId : null));
            if (insertId) {
                return { pisoID: insertId, hotelID: piso.hotelID, numero: piso.numero, nombre: piso.nombre, activo: piso.activo };
            }
            return result;
        } catch (err) {
            throw new Error('Error executing insert into Piso: ' + err.message);
        }
    }

    async getPisos() {
        const query = 'SELECT * FROM Piso';
        try {
            const rows = await db.fetchRows(query);
            return rows;
        } catch (err) {
            throw new Error('Error fetching pisos: ' + err.message);
        }
    }

    async getPisoById(id) {
        const query = 'SELECT * FROM Piso WHERE pisoID = ?';
        try {
            const rows = await db.executePreparedQuery(query, [id]);
            return rows && rows[0];
        } catch (err) {
            throw new Error('Error fetching piso by ID: ' + err.message);
        }
    }

    async getPisosByHotelId(hotelID) {
        const query = 'SELECT * FROM Piso WHERE hotelID = ?';
        try {
            const rows = await db.executePreparedQuery(query, [hotelID]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching pisos by hotelID: ' + err.message);
        }
    }

    async getPisoByNumero(numero) {
        const query = 'SELECT * FROM Piso WHERE numero = ?';
        try {
            const rows = await db.executePreparedQuery(query, [numero]);
            return rows && rows[0];
        } catch (err) {
            throw new Error('Error fetching piso by numero: ' + err.message);
        }
    }

    async getPisoByNombre(nombre) {
        const query = 'SELECT * FROM Piso WHERE nombre = ?';
        try {
            const rows = await db.executePreparedQuery(query, [nombre]);
            return rows && rows[0];
        } catch (err) {
            throw new Error('Error fetching piso by nombre: ' + err.message);
        }
    }

    async getPisosByActivo() {
        const query = 'SELECT * FROM Piso WHERE activo = 1';
        try {
            const rows = await db.fetchRows(query);
            return rows;
        } catch (err) {
            throw new Error('Error fetching active pisos: ' + err.message);
        }
    }

    async putPiso(id, pisoData) {
        const query = 'UPDATE Piso SET hotelID = ?, numero = ?, nombre = ?, activo = ? WHERE pisoID = ?';
        try {
            const activoVal = pisoData.activo !== undefined ? (pisoData.activo ? 1 : 0) : 1;
            const result = await db.executePreparedQuery(query, [pisoData.hotelID, pisoData.numero, pisoData.nombre, activoVal, id]);
            return result;
        } catch (err) {
            throw new Error('Error updating piso: ' + err.message);
        }
    }

    async deletePiso(id) {
        const query = 'DELETE FROM Piso WHERE pisoID = ?';
        try {
            const result = await db.executePreparedQuery(query, [id]);
            return result;
        } catch (err) {
            throw new Error('Error deleting piso: ' + err.message);
        }
    }
}

module.exports = MySQLPisoAdapter;
