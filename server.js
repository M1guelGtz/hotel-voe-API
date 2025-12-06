const express = require('express');
const app = express();
const db = require('./core/db');
const { init_users } = require('./features/users/infrastructure/dependences'); // Composition root: wire infrastructure -> application -> delivery
const { init_hotels } = require('./features/hotels/Infrastructure/dependences');

const port = process.env.PORT || 3000;

app.use(express.json()); 

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
});

(async function start() {
    try {
        const dbErr = await db.testConnection();
        if (dbErr) {
            console.error('DB connection failed:', dbErr);
            process.exit(1); 
        }
        console.log('Conexion a la base de datos Lista');
        

        //Aqui se añaden la inicializacion de los features
        init_users(app);
        init_hotels(app)

        // health endpoint
        app.get('/health', async (req, res) => {
            const err = await db.testConnection();
            if (err) return res.status(500).json({ status: 'unhealthy', error: String(err) });
            return res.json({ status: 'ok' });
        });

        app.listen(port, () => {
            console.log('Servidor escuchando en el puerto ' + port);
        });
    } catch (err) {
        console.error('Failed during startup:', err);
        process.exit(1);
    }
})();