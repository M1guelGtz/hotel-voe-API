class GetHotelsByActivoUseCase {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    execute() {
        return this.hotelRepository.getHotelsByActivo();
    }
}

module.exports = GetHotelsByActivoUseCase;

