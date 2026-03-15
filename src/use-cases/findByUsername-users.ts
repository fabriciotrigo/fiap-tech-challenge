import { Users } from "../entities/users.entity"
import { UsersRepository } from "../repositories/users.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class FindByUsernameUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async handler(username: string): Promise<Users | undefined> {
        const users = await this.usersRepository.findByUsername(username)
        if (!users) throw new ResourceNotFoundError()
        return users
    }
}