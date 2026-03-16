import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { UsersRepository } from "../../../repositories/users.repository"
import { CreateUsersUseCase } from "../../../use-cases/create-users"
import { hash } from 'bcryptjs'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        //id: z.number(),
        username: z.string(),
        password: z.string(),
        nivel: z.number()
    })

    const { username, password, nivel } = registerBodySchema.parse(request.body)

    const hashedPassword = await hash(password, 8)
    const userWithHashedPassword = { username, password: hashedPassword, nivel }

    const usersRepository = new UsersRepository()
    const createUsersUseCase = new CreateUsersUseCase(usersRepository)

    const users = await createUsersUseCase.handler(userWithHashedPassword)

    return reply.status(201).send(users)

}