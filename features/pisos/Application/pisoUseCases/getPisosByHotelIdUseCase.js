class GetPisosByHotelIdUseCase {
    constructor({ pisoRepository }) {
        this.pisoRepository = pisoRepository;
    }

    async execute(hotelID) {
        const pisos = await this.pisoRepository.getPisosByHotelId(hotelID);
        if (!pisos || pisos.length === 0) {
            const err = new Error(`No pisos found for hotelID ${hotelID}`);
            err.statusCode = 404;
            throw err;
        }
        return { pisos };
    }
}

module.exports = GetPisosByHotelIdUseCase;
