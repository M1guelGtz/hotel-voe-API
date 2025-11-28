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
    async putUsers() {
        const query = 'UPDATE usuario SET name = ?, email = ? WHERE id = ?';
        try {
            const rows = await db.fetchRows(query);
            return rows;
        } catch (err) {
            throw new Error('Error fetching rows: ' + err.message);
        }
    }
    async deleteUsers(id) {
        const query = 'DELETE FROM usuario WHERE id = ?';
        try {
            const rows = await db.fetchRows(query, [id]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching rows: ' + err.message);
        }
    }
    async getUsersById(id) {
        const query = 'SELECT * FROM usuario WHERE id = ?';
        try {
            const rows = await db.executePreparedQuery(query, [id]);
            return rows[0]; // Assuming id is unique, return the first match
        } catch (err) {
            throw new Error('Error fetching user by ID: ' + err.message);
        }
    }
    async getUserByEmail(email) {
        const query = 'SELECT * FROM usuario WHERE email = ?';
        try {
            const rows = await db.executePreparedQuery(query, [email]);
            return rows[0]; // Assuming email is unique, return the first match
        } catch (err) {
            throw new Error('Error fetching user by email: ' + err.message);
        }
    }
    async loginUser(email, password) {
        const query = 'SELECT * FROM usuario WHERE email = ? AND password = ?';
        try {
            const rows = await db.executePreparedQuery(query, [email, password]);
            return rows[0]; // Assuming email is unique, return the first match
        } catch (err) {
            throw new Error('Error logging in user: ' + err.message);
        }
    }
    async registerUser(user) {
        const query = 'INSERT INTO usuario (name, email, password) VALUES (?, ?, ?)';
        try {
            const result = await db.executePreparedQuery(query, [user.name, user.email, user.password]);
            const insertId = result && (result.insertId || result.insert_id || result.affectedRows ? result.insertId : null);
            if (insertId) {
                return { id: insertId, name: user.name, email: user.email };
            }
            return result;
        } catch (err) {
            throw new Error('Error registering user: ' + err.message);
        }
    }
}

module.exports = MySQL;