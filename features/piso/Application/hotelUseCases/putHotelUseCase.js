class PutHotelUseCase {
    constructor({ hotelRepository }) {
        this.hotelRepository = hotelRepository;
    }

    async execute(id, hotelData) {
        if (!hotelData || typeof hotelData.nombre !== 'string' || hotelData.nombre.trim() === '') {
            const err = new Error('nombre is required and must be a non-empty string');
            err.statusCode = 400;
            throw err;
        }

        return this.hotelRepository.putHotels(id, hotelData);
    }
}

module.exports = PutHotelUseCase;
