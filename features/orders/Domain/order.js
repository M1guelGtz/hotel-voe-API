class Order {
  id;
  session_id;
  waiter_id;
  created_at;
  status;

  constructor({ id, session_id, waiter_id, created_at, status = 'pending' }) {
    this.id = id;
    this.session_id = session_id;
    this.waiter_id = waiter_id;
    this.created_at = created_at;
    this.status = status;
  }
}

module.exports = Order;
