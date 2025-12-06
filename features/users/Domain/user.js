class User {

    userID;
    personaID;
    hotelID;
    email;
    password;
    username;
    rol;
    activo;
    fechaRegistro;
    constructor({ id = null, username, password = null } = {}) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

module.exports = User;
