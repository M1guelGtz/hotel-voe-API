class User {
    constructor({ id = null, username, password = null } = {}) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

module.exports = User;
