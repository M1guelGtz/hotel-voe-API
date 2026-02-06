class HotelRepository {
    async postHotels(hotel) {
        throw new Error('postHotels method must be implemented');
    }

    async getHotels() {
        throw new Error('getHotels method must be implemented');
    }

    

    async getHotelsById(id) {
        throw new Error('getHotelsById method must be implemented');
    }

    async getHotelsByActivo() {
        throw new Error('getHotelsByActivo method must be implemented');
    }

    async getHotelsByNombre(nombre) {
        throw new Error('getHotelsByNombre method must be implemented');
    }

    async getHotelsByDireccion(direccion) {
        throw new Error('getHotelsByDireccion method must be implemented');
    }

    async getHotelsByTelefono(telefono) {
        throw new Error('getHotelsByTelefono method must be implemented');
    }

    async getHotelsByEmail(email) {
        throw new Error('getHotelsByEmail method must be implemented');
    }

    async putHotels(id, hotelData) {
        throw new Error('putHotels method must be implemented');
    }

    async deleteHotels(id) {
        throw new Error('deleteHotels method must be implemented');
    }
}

module.exports = HotelRepository;
