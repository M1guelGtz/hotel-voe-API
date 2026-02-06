class GetPisosByHotelIdHandler {
    constructor(getPisosByHotelIdUseCase) {
        this.getPisosByHotelIdUseCase = getPisosByHotelIdUseCase;
    }

    async handle(req, res) {
        try {
            const pisos = await this.getPisosByHotelIdUseCase.execute(req.params.hotelID);
            res.status(200).json(pisos);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = GetPisosByHotelIdHandler;
