const Hotel = require('../../Domain/hotel');

class CreateHotelUseCase {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    execute(hotelData) {
        if (!hotelData || typeof hotelData.nombre !== 'string' || hotelData.nombre.trim() === '') {
            const err = new Error('`nombre` is required and must be a non-empty string');
            err.statusCode = 400;
            throw err;
        }

        const hotel = new Hotel({
            nombre: hotelData.nombre.trim(),
            direccion: hotelData.direccion,
            telefono: hotelData.telefono,
            email: hotelData.email,
            activo: hotelData.activo !== undefined ? hotelData.activo : true
        });

        if (typeof this.hotelRepository.postHotels === 'function') {
            return this.hotelRepository.postHotels(hotel);
        }

        throw new Error('Repository does not implement a known save/post method');
    }
}

module.exports = CreateHotelUseCase;
