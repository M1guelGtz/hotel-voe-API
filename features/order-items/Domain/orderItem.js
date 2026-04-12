class OrderItem {
  id;
  order_id;
  product_id;
  area_id;
  product_name;
  unit_price;
  quantity;
  notes;
  status;
  sent_to_area_at;
  ready_at;
  delivered_at;

  constructor({
    id,
    order_id,
    product_id,
    area_id,
    product_name,
    unit_price,
    quantity = 1,
    notes = null,
    status = 'pending',
    sent_to_area_at = null,
    ready_at = null,
    delivered_at = null,
  }) {
    this.id = id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.area_id = area_id;
    this.product_name = product_name;
    this.unit_price = unit_price;
    this.quantity = quantity;
    this.notes = notes;
    this.status = status;
    this.sent_to_area_at = sent_to_area_at;
    this.ready_at = ready_at;
    this.delivered_at = delivered_at;
  }
}

module.exports = OrderItem;
