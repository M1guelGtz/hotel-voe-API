class GetHotelsUseCase {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    execute() {
        return this.hotelRepository.getHotels();
    }
}

module.exports = GetHotelsUseCase;
