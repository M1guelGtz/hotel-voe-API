# app-api

API con arquitectura hexagonal (minimal)

Requisitos
- Node.js 18+
- MySQL (opcional si usas MySQL adapter)

Variables de entorno (.env)

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_SCHEMA=your_schema
DB_CONN_LIMIT=10
# Use in-memory adapter (for dev/tests)
USE_IN_MEMORY=false
```

Comandos

```
npm install
npm start
```

Endpoints
- `GET /health` -> devuelve `{ status: 'ok' }` si DB disponible
- `GET /users` -> lista usuarios
- `POST /users` -> crea usuario JSON `{ name: '...', email: '...' }`

Notas
- La carpeta `features/users/Domain` contiene el port (contrato). En JS no se fuerza el contrato; los adaptadores deben implementar los métodos descritos allí (`postUsers`, `getUsers`).
- Para pruebas usa `USE_IN_MEMORY=true`.
