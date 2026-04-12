const express = require('express');
const app = express();
const db = require('./core/db');
const corsMiddleware = require('./core/middleware/cors');
const { init_users } = require('./features/users/infrastructure/dependences');
const { init_dishes } = require('./features/dishes/Infrastructure/dependences');
const { init_categories } = require('./features/categories/Infrastructure/dependences');
const { init_areas } = require('./features/areas/Infrastructure/dependences');
const { init_tables } = require('./features/tables/Infrastructure/dependences');
const { init_roles } = require('./features/roles/Infrastructure/dependences');
const { init_sessions } = require('./features/sessions/Infrastructure/dependences');
const { init_orders } = require('./features/orders/Infrastructure/dependences');
const { init_orderItems } = require('./features/order-items/Infrastructure/dependences');
const { init_tickets } = require('./features/tickets/Infrastructure/dependences');
const path = require('path');

const port = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(express.json());
// Servir archivos estáticos desde la carpeta public
app.use('/public', express.static(path.join(__dirname, 'public'))); 

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
        init_roles(app);
        init_areas(app);
        init_categories(app);
        init_dishes(app);
        init_tables(app);
        init_sessions(app);
        init_orders(app);
        init_orderItems(app);
        init_tickets(app);

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