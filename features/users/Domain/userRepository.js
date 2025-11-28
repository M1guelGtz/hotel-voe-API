/**
 * Domain port / interface for a UserRepository (Hexagonal port)
 * Implementations (adapters) should implement `getUsers()` and `postUsers(user)`.
 */
class UserRepository {
    getUsers() {
        throw new Error('getUsers() not implemented');
    }

    postUsers(user) {
        throw new Error('postUsers() not implemented');
    }

    putUsers(user) {
        throw new Error('putUsers() not implemented');
    }

    getUsersById(userId) {
        throw new Error('getUsersById() not implemented');
    }

    getUserByEmail(email) {
        throw new Error('getUserByEmail() not implemented');
    }

    deleteUsers(userId) {
        throw new Error('deleteUsers() not implemented');
    }

    loginUser(email, password) {
        throw new Error('loginUser() not implemented');
    } 

    registerUser(user) {
        throw new Error('registerUser() not implemented');
    }
}

module.exports = UserRepository;