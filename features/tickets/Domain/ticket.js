class Ticket {
    id;
    session_id;
    waiter_id;
    subtotal;
    discount;
    tip;
    total;
    payment_method;
    notes;
    created_at;

    constructor({ id, session_id, waiter_id, subtotal, discount = 0, tip = 0, total, payment_method = 'efectivo', notes = null, created_at }) {
        this.id = id;
        this.session_id = session_id;
        this.waiter_id = waiter_id;
        this.subtotal = subtotal;
        this.discount = discount;
        this.tip = tip;
        this.total = total;
        this.payment_method = payment_method;
        this.notes = notes;
        this.created_at = created_at;
    }
}

module.exports = Ticket;
