class CreateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ session_id, waiter_id, items }) {
    if (!session_id) {
      const err = new Error('session_id is required');
      err.statusCode = 400;
      throw err;
    }

    if (!waiter_id) {
      const err = new Error('waiter_id is required');
      err.statusCode = 400;
      throw err;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      const err = new Error('items must be a non-empty array');
      err.statusCode = 400;
      throw err;
    }

    // Validate session exists and is open
    const session = await this.orderRepository.sessionExists(session_id);
    if (!session) {
      const err = new Error('Session not found or is not open');
      err.statusCode = 404;
      throw err;
    }

    // For each item, fetch product to get area_id, product_name, unit_price
    const enrichedItems = [];
    for (const item of items) {
      if (!item.product_id) {
        const err = new Error('Each item must have a product_id');
        err.statusCode = 400;
        throw err;
      }
      if (!item.quantity || item.quantity < 1) {
        const err = new Error('Each item must have a quantity of at least 1');
        err.statusCode = 400;
        throw err;
      }

      const product = await this.orderRepository.getProduct(item.product_id);
      if (!product) {
        const err = new Error(`Product with id ${item.product_id} not found`);
        err.statusCode = 404;
        throw err;
      }

      enrichedItems.push({
        product_id: item.product_id,
        area_id: product.area_id,
        product_name: product.name,
        unit_price: product.price,
        quantity: item.quantity,
        notes: item.notes || null,
      });
    }

    const order = await this.orderRepository.create(
      { session_id, waiter_id },
      enrichedItems
    );

    return order;
  }
}

module.exports = CreateOrderUseCase;
