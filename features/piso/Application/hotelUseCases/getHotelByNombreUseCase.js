class GetHotelByNombreUseCase {
    constructor({ hotelRepository }) {
        this.hotelRepository = hotelRepository;
    }

    async execute(nombre) {
        const hotel = await this.hotelRepository.getHotelsByNombre(nombre);
        if (!hotel) {
            const err = new Error(`Hotel with nombre ${nombre} not found`);
            err.statusCode = 404;
            throw err;
        }

        if (typeof hotel.getAll === 'function') {
            return { hotel: hotel.getAll() };
        }

        return { hotel };
    }
}

module.exports = GetHotelByNombreUseCase;
