# app-api

API con arquitectura hexagonal (minimal)

Requisitos
- Node.js 18+
- MySQL (opcional si usas MySQL adapter)

Variables de entorno (.env)

#para cada feature crear una rama

#separar en commits pequeños de cada cambio importante para que sea mas facil leer el codigo cambiado por commit

#Solicitar PR una vez completado cada feature para asignacion de feature nuevo

```
PORT=8000
DB_HOST=localhost
DB_USER=db_user
DB_PASS=passw0rd
DB_SCHEMA=_prj_sch
```

Comandos

```
npm install
npm start
```

Notas
- La carpeta `features/users/Domain` contiene el port (contrato). En JS no se fuerza el contrato; los adaptadores deben implementar los métodos descritos allí (`postUsers`, `getUsers`).
- Para pruebas usa `USE_IN_MEMORY=true`.
