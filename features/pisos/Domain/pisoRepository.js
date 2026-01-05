class PisoRepository {
    async postPisos(piso) {
        throw new Error('postPisos method must be implemented');
    }

    async getPisos() {
        throw new Error('getPisos method must be implemented');
    }

    async getPisoById(id) {
        throw new Error('getPisoById method must be implemented');
    }

    async getPisosByHotelId(hotelID) {
        throw new Error('getPisosByHotelId method must be implemented');
    }

    async getPisoByNumero(numero) {
        throw new Error('getPisoByNumero method must be implemented');
    }

    async getPisoByNombre(nombre) {
        throw new Error('getPisoByNombre method must be implemented');
    }

    async getPisosByActivo() {
        throw new Error('getPisosByActivo method must be implemented');
    }

    async putPiso(id, pisoData) {
        throw new Error('putPiso method must be implemented');
    }

    async deletePiso(id) {
        throw new Error('deletePiso method must be implemented');
    }
}

module.exports = PisoRepository;
