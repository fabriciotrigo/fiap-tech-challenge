import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UsersRepository } from "../../../repositories/users.repository";
import { deleteUsersUseCase } from "../../../use-cases/delete-users";

export async function deleteUsers(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const usersRepository = new UsersRepository()

    const deleteUseCase = new deleteUsersUseCase(usersRepository)

    const users = await deleteUseCase.handler(id)

    return reply.status(204).send(
        
    )
}