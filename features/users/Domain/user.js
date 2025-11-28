class User {
    constructor({ id = null, name, email = null } = {}) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

module.exports = User;
