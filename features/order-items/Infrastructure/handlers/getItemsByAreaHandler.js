class GetItemsByAreaHandler {
  constructor(getItemsByAreaUseCase) {
    this.getItemsByAreaUseCase = getItemsByAreaUseCase;
  }

  async handle(req, res) {
    try {
      const { areaId } = req.params;
      const items = await this.getItemsByAreaUseCase.execute(areaId);
      res.status(200).json(items);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = GetItemsByAreaHandler;
