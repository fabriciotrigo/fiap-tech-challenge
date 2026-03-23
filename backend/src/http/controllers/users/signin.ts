import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { SigninUseCase } from "../../../use-cases/signin"
import { compare } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UsersRepository } from '../../../repositories/users.repository'

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string()
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const usersRepository = new UsersRepository()

  const signinUseCase = new SigninUseCase(usersRepository)

  const user = await signinUseCase.handler(username)

  const doestPasswordMatch = await compare(password, user.password)

  if (!doestPasswordMatch) {
    throw new InvalidCredentialsError()
  }

  const token = await reply.jwtSign({ 
    username: user.username,
    nivel: user.nivel 
  })

  return reply.status(200).send({ token })
}