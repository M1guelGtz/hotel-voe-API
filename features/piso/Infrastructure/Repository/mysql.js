// Adapt this file to implement PisoRepository methods using MySQL
const PisoRepository = require('../../Domain/pisoRepository');

class MySQLPisoAdapter extends PisoRepository {
    // Implement all methods: postPisos, getPisos, getPisoById, getPisosByHotelId, getPisoByNumero, getPisoByNombre, getPisosByActivo, putPiso, deletePiso
    // Example:
    async postPisos(piso) {
        // Implement MySQL insert logic here
        throw new Error('Not implemented');
    }
    // ...implement other methods
}

module.exports = MySQLPisoAdapter;
