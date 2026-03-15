import { Users } from "../entities/users.entity";
import { UsersRepository } from "../repositories/users.repository";

export class CreateUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async handler(users: Users): Promise<Users | undefined> {
        return this.usersRepository.create(users)
    }
}