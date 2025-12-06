class GetHotelByEmailUseCase {
    constructor({ hotelRepository }) {
        this.hotelRepository = hotelRepository;
    }

    async execute(email) {
        const hotel = await this.hotelRepository.getHotelsByEmail(email);
        if (!hotel) {
            const err = new Error(`Hotel with email ${email} not found`);
            err.statusCode = 404;
            throw err;
        }

        /*

        if (typeof hotel.getAll === 'function') {
            return { hotel: hotel.getAll() };
        }

        */

        return { hotel };
    }
}

module.exports = GetHotelByEmailUseCase;
