class GetHuespedByTipoDocumentoHandler {
    constructor(getHuespedByTipoDocumentoUseCase) {
        this.getHuespedByTipoDocumentoUseCase = getHuespedByTipoDocumentoUseCase;
    }

    async handle(req, res) {
        try {
            const { tipoDocumento } = req.params;
            const huespeds = await this.getHuespedByTipoDocumentoUseCase.execute(tipoDocumento);
            res.status(200).json(huespeds);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHuespedByTipoDocumentoHandler;