class DeleteHotelUseCase {
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
        return this.hotelRepository.deleteHotels(id);
    }
}

module.exports = DeleteHotelUseCase;
