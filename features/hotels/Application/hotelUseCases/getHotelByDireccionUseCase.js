class GetHotelByDireccionUseCase {
    constructor({ hotelRepository }) {
        this.hotelRepository = hotelRepository;
    }

    async execute(direccion) {
        const hotel = await this.hotelRepository.getHotelsByDireccion(direccion);
        if (!hotel) {
            const err = new Error(`Hotel with direccion ${direccion} not found`);
            err.statusCode = 404;
            throw err;
        }

        return {hotel};
        /*
        if (typeof hotel.getAll === 'function') {
            return { hotel: hotel.getAll() };
        }

        return {
            hotel: {
                hotelID: hotel.hotelID ?? hotel.id ?? null,
                nombre: hotel.nombre,
                direccion: hotel.direccion,
                telefono: hotel.telefono,
                email: hotel.email,
                activo: hotel.activo,
                fechaRegistro: hotel.fechaRegistro
            }
        };
        */
    }
}

module.exports = GetHotelByDireccionUseCase;
