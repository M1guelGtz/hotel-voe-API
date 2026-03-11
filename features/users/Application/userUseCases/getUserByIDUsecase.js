class GetUsersByIdUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async execute(id) {
        const employee = this.userRepository.getEmployeeById
            ? await this.userRepository.getEmployeeById(id)
            : await this.userRepository.getUsersById(id);
        if (!employee) {
            const err = new Error('Empleado no encontrado');
            err.statusCode = 404;
            throw err;
        }
        return employee;
    }
    
}

module.exports = GetUsersByIdUseCase;