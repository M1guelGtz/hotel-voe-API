class InMemoryUserRepository {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  async postUsers(user) {
    const newUser = { id: this.nextId++, name: user.name, email: user.email };
    this.users.push(newUser);
    return newUser;
  }

  async getUsers() {
    return this.users.slice();
  }
}

module.exports = InMemoryUserRepository;
