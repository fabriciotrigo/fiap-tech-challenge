import { UsersRepository } from '../repositories/users.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

export class SigninUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handler(username: string) {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}