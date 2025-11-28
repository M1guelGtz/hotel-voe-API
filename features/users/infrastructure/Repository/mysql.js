const db = require('../../../../core/db');

class MySQL {
    constructor() {
        this.pool = db.pool;
    }

    // Save a product (name, price)
    // Save a user (user object with name, email)
    async postUsers(user) {
        const query = 'INSERT INTO usuario (name, email) VALUES (?, ?)';
        try {
            const result = await db.executePreparedQuery(query, [user.name, user.email]);
            // mysql2 returns insertId on result
            const insertId = result && (result.insertId || result.insert_id || result.affectedRows ? result.insertId : null);
            if (insertId) {
                return { id: insertId, name: user.name, email: user.email };
            }
            // fallback: return raw result
            return result;
        } catch (err) {
            // rethrow or handle as needed
            throw new Error('Error executing insert: ' + err.message);
        }
    }
    // Get all products
    async getUsers() {
        const query = 'SELECT * FROM usuario';
        try {
            const rows = await db.fetchRows(query);
            return rows;
        } catch (err) {
            throw new Error('Error fetching rows: ' + err.message);
        }
    }
}

module.exports = MySQL;