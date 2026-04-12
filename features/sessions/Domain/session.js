class Session {
  id;
  table_id;
  waiter_id;
  opened_at;
  closed_at;
  status;

  constructor({ id, table_id, waiter_id, opened_at, closed_at = null, status = 'open' }) {
    this.id = id;
    this.table_id = table_id;
    this.waiter_id = waiter_id;
    this.opened_at = opened_at;
    this.closed_at = closed_at;
    this.status = status;
  }
}

module.exports = Session;
