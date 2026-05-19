import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { UsersRepository } from "../../../repositories/users.repository"
import { UpdateUsersUseCase } from "../../../use-cases/update-users"

export async function updateUsers(request: FastifyRequest, reply: FastifyReply) {
    
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const registerBodySchema = z.object({
        nivel: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)
    const { nivel } = registerBodySchema.parse(request.body)

    const usersRepository = new UsersRepository()
    const updateUsersUseCase = new UpdateUsersUseCase(usersRepository)

    const users = await updateUsersUseCase.handler({ id, nivel })

    return reply.status(204).send(users)

}