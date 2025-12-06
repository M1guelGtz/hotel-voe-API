class GetHotelByEmailUseCase {
    constructor({ hotelRepository }) {
        this.hotelRepository = hotelRepository;
    }

    async execute(id) {
        const hotel = await this.hotelRepository.getHotelsById(id);
        if (!hotel) {
            const err = new Error(`Hotel with ID ${id} not found`);
            err.statusCode = 404;
            throw err;
        }

        if (typeof hotel.getAll === 'function') {
            return { hotel: hotel.getAll() };
        }

        return { hotel };
    }
}

module.exports = GetHotelByEmailUseCase;
