import { Users } from "../entities/users.entity";
import { UsersRepository } from "../repositories/users.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserRequest {
  id: number
  nivel: number
}

export class UpdateUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async handler({ id, nivel }: UpdateUserRequest): Promise<Users | undefined> {
        const result = await this.usersRepository.updateUsers({id, nivel})
        if (!result) throw new ResourceNotFoundError()
        return result
    }
}