class GetHuespedByDocumentoIdentidadHandler {
    constructor(getHuespedByDocumentoIdentidadUseCase) {
        this.getHuespedByDocumentoIdentidadUseCase = getHuespedByDocumentoIdentidadUseCase;
    }

    async handle(req, res) {
        try {
            const { documentoIdentidad } = req.params;
            const huesped = await this.getHuespedByDocumentoIdentidadUseCase.execute(documentoIdentidad);
            if (!huesped) {
                return res.status(404).json({ error: 'Huesped not found' });
            }
            res.status(200).json(huesped);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHuespedByDocumentoIdentidadHandler;