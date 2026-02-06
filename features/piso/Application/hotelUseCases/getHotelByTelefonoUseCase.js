class GetHotelByTelefonoUseCase {
    constructor({ hotelRepository }) {
        this.hotelRepository = hotelRepository;
    }

    async execute(telefono) {
        const hotel = await this.hotelRepository.getHotelsByTelefono(telefono);
        if (!hotel) {
            const err = new Error(`Hotel with telefono ${telefono} not found`);
            err.statusCode = 404;
            throw err;
        }

        if (typeof hotel.getAll === 'function') {
            return { hotel: hotel.getAll() };
        }

        return { hotel };
    }
}

module.exports = GetHotelByTelefonoUseCase;
