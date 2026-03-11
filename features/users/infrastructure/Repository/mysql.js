const db = require('../../../../core/db');
const bcrypt = require('bcryptjs');

class MySQL {
    constructor() {
        this.pool = db.pool;
    }

    // Save a product (name, price)
    // Save a user (user object with name, email)

    /*
    async postUsers(user) {
        const query = 'INSERT INTO usuario (username, password, id_persona) VALUES (?, ?, 1)';
        try {
            // Hash password if provided
            let passwordToSave = user.password;
            if (passwordToSave !== undefined && passwordToSave !== null) {
                passwordToSave = await bcrypt.hash(passwordToSave, 10);
            }
            const result = await db.executePreparedQuery(query, [user.username, passwordToSave]);
            // mysql2 returns insertId on result
            const insertId = result && (result.insertId || result.insert_id || result.affectedRows ? result.insertId : null);
            if (insertId) {
                return { id: insertId, username: user.username, password: user.password };
            }
            // fallback: return raw result
            return result;
        } catch (err) {
            // rethrow or handle as needed
            throw new Error('Error executing insert: ' + err.message);
        }
    }


    */
    // Get all products
    async getUsers() {
        const query = 'SELECT * FROM `user`';
        try {
            const rows = await db.fetchRows(query);
            return rows;
        } catch (err) {
            throw new Error('Error fetching rows: ' + err.message);
        }
    }
    async putUsers(id, userData) {
        const query = 'UPDATE `user` SET password = ?, username = ? WHERE userID = ?';
        try {
            // Hash password if provided
            let passwordToSave = userData.password;
            if (passwordToSave !== undefined && passwordToSave !== null) {
                passwordToSave = await bcrypt.hash(passwordToSave, 10);
            }
            const rows = await db.fetchRows(query, [passwordToSave, userData.username, id]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching rows: ' + err.message);
        }
    }
    async deleteUsers(id) {
        const query = 'DELETE FROM `user` WHERE userID = ?';
        try {
            const rows = await db.fetchRows(query, [id]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching rows: ' + err.message);
        }
    }
    async getEmployeeById(id) {
        const query = `
            SELECT
                e.id,
                e.name,
                e.username,
                e.is_active,
                e.created_at,
                e.updated_at,
                r.id     AS role_id,
                r.name   AS role,
                a.id     AS area_id,
                a.name   AS area_name,
                a.icon   AS area_icon,
                a.color  AS area_color
            FROM employees e
            JOIN roles r ON r.id = e.role_id
            LEFT JOIN areas a ON a.role_id = e.role_id
            WHERE e.id = ?
        `;
        try {
            const rows = await db.executePreparedQuery(query, [id]);
            const employee = rows && rows[0];
            if (!employee) return null;
            return employee;
        } catch (err) {
            throw new Error('Error al obtener empleado: ' + err.message);
        }
    }

    async getUsersById(id) {
        return this.getEmployeeById(id);
    }
    async getUserByEmail(email) {
        const query = 'SELECT * FROM `user` WHERE email = ?';
        try {
            const rows = await db.executePreparedQuery(query, [email]);
            return rows[0]; // Assuming email is unique, return the first match
        } catch (err) {
            throw new Error('Error fetching user by email: ' + err.message);
        }
    }
    async registerUser(name, username, password, role_id = 1) {
        try {
            // 1. Verificar que el username no esté tomado
            const checkQuery = `
                SELECT id FROM employees WHERE username = ?
            `;
            const existing = await db.executePreparedQuery(checkQuery, [username]);
            if (existing && existing[0]) throw new Error('El username ya está en uso');

            // 2. Verificar que el role_id exista (si se proporciona)
            if (role_id) {
                const roleQuery = `
                    SELECT id FROM roles WHERE id = ?
                `;
                const role = await db.executePreparedQuery(roleQuery, [role_id]);
                if (!role || !role[0]) throw new Error('El rol especificado no existe');
            }

            // 3. Hashear el password
            const hashedPassword = await bcrypt.hash(password, 12);

            // 4. Insertar el empleado
            const insertQuery = `
                INSERT INTO employees (role_id, name, username, password)
                VALUES (?, ?, ?, ?)
            `;
            const result = await db.executePreparedQuery(insertQuery, [
                role_id,
                name,
                username,
                hashedPassword
            ]);

            // 5. Regresar el empleado creado sin el password
            return {
                id: result.insertId,
                name,
                username,
                role_id,
            };

        } catch (err) {
            throw new Error('Error al crear empleado: ' + err.message);
        }
    }

    async loginUser(username, password) {
        const query = `
            SELECT
                e.id,
                e.name,
                e.username,
                e.password,
                e.is_active,
                r.name   AS role,
                a.id     AS area_id,
                a.name   AS area_name,
                a.icon   AS area_icon,
                a.color  AS area_color
            FROM employees e
            JOIN roles r ON r.id = e.role_id
            LEFT JOIN areas a ON a.role_id = e.role_id
            WHERE e.username = ?
        `;
        try {
            const rows = await db.executePreparedQuery(query, [username]);
            const employee = rows && rows[0];

            if (!employee) return null;
            if (!employee.is_active) throw new Error('Usuario deshabilitado');

            const hash = employee.password_hash || employee.password;
            if (!hash) return null;

            const match = await bcrypt.compare(password, hash);
            if (!match) return null;

            // No regresar el hash en la respuesta
            delete employee.password;
            delete employee.password_hash;
            return employee;

        } catch (err) {
            throw new Error('Error al iniciar sesión: ' + err.message);
        }
    }
}

module.exports = MySQL;