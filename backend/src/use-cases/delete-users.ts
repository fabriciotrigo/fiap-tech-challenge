import { UsersRepository } from "../repositories/users.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class deleteUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async handler(usersId: number): Promise<boolean> {
        const users = await this.usersRepository.deleteUsers(usersId)
        if (!users) throw new ResourceNotFoundError()
        return users
    }
}