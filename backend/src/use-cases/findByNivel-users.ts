import { Users } from "../entities/users.entity"
import { UsersRepository } from "../repositories/users.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class FindByNivelUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async handler(nivel: number): Promise<Users[] | undefined> {
        const users = await this.usersRepository.findByNivel(nivel)
        if (!users) throw new ResourceNotFoundError()
        return users
    }
}