class putUsersUseCase {
     constructor({ usersRepository }) {
         this.usersRepository = usersRepository;
     }
     
     async execute(id, userData) {
         if (!userData || typeof userData.name !== 'string' || userData.name.trim() === '') {
             const err = new Error('`name` is required and must be a non-empty string');
             err.statusCode = 400;
             throw err;
         }
         return this.usersRepository.putUsers(id, userData);
     }
}