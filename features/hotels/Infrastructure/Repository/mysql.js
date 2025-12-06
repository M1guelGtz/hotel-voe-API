const db = require('../../../../core/db');

class MySQLHotelRepository {
	constructor() {
		this.pool = db.pool;
	}

	async postHotels(hotel) {
		const query = 'INSERT INTO Hotel (nombre, direccion, telefono, email, activo) VALUES (?, ?, ?, ?, ?)';
		try {
			const result = await db.executePreparedQuery(query, [hotel.nombre, hotel.direccion, hotel.telefono, hotel.email, hotel.activo ? 1 : 0]);
			const insertId = result && (result.insertId || result.insert_id || (result.affectedRows ? result.insertId : null));
			if (insertId) {
				return { hotelID: insertId, nombre: hotel.nombre, direccion: hotel.direccion, telefono: hotel.telefono, email: hotel.email, activo: hotel.activo };
			}
			return result;
		} catch (err) {
			throw new Error('Error executing insert into Hotel: ' + err.message);
		}
	}

	async getHotels() {
		const query = 'SELECT * FROM Hotel';
		try {
			const rows = await db.fetchRows(query);
			return rows;
		} catch (err) {
			throw new Error('Error fetching hotels: ' + err.message);
		}
	}

	async getHotelsById(id) {
		const query = 'SELECT * FROM Hotel WHERE hotelID = ?';
		try {
			const rows = await db.executePreparedQuery(query, [id]);
			return rows && rows[0];
		} catch (err) {
			throw new Error('Error fetching hotel by ID: ' + err.message);
		}
	}

	async putHotels(id, hotelData) {
		const query = 'UPDATE Hotel SET nombre = ?, direccion = ?, telefono = ?, email = ?, activo = ? WHERE hotelID = ?';
		try {
			const activoVal = hotelData.activo !== undefined ? (hotelData.activo ? 1 : 0) : 1;
			const result = await db.executePreparedQuery(query, [hotelData.nombre, hotelData.direccion, hotelData.telefono, hotelData.email, activoVal, id]);
			return result;
		} catch (err) {
			throw new Error('Error updating hotel: ' + err.message);
		}
	}

	async deleteHotels(id) {
		const query = 'DELETE FROM Hotel WHERE hotelID = ?';
		try {
			const result = await db.executePreparedQuery(query, [id]);
			return result;
		} catch (err) {
			throw new Error('Error deleting hotel: ' + err.message);
		}
	}

	async getHotelsByActivo() {
		const query = 'SELECT * FROM Hotel WHERE activo = 1';
		try {
			const rows = await db.fetchRows(query);
			return rows;
		} catch (err) {
			throw new Error('Error fetching active hotels: ' + err.message);
		}
	}

	async getHotelsByNombre(nombre) {
		const query = 'SELECT * FROM Hotel WHERE nombre = ?';
		try {
			const rows = await db.executePreparedQuery(query, [nombre]);
			return rows;
		} catch (err) {
			throw new Error('Error fetching hotels by nombre: ' + err.message);
		}
	}

	async getHotelsByDireccion(direccion) {
		const query = 'SELECT * FROM Hotel WHERE direccion = ?';
		try {
			const rows = await db.executePreparedQuery(query, [direccion]);
			return rows;
		} catch (err) {
			throw new Error('Error fetching hotels by direccion: ' + err.message);
		}
	}

	async getHotelsByTelefono(telefono) {
		const query = 'SELECT * FROM Hotel WHERE telefono = ?';
		try {
			const rows = await db.executePreparedQuery(query, [telefono]);
			return rows;
		} catch (err) {
			throw new Error('Error fetching hotels by telefono: ' + err.message);
		}
	}

	async getHotelsByEmail(email) {
		const query = 'SELECT * FROM Hotel WHERE email = ?';
		try {
			const rows = await db.executePreparedQuery(query, [email]);
			return rows;
		} catch (err) {
			throw new Error('Error fetching hotels by email: ' + err.message);
		}
	}
}

module.exports = MySQLHotelRepository;

