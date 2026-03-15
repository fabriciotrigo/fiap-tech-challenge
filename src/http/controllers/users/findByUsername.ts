import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UsersRepository } from "../../../repositories/users.repository";
import { FindByUsernameUseCase } from "../../../use-cases/findByUsername-users";

export async function findByUsername(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        username: z.string()
    })

    const { username } = registerParamsSchema.parse(request.params)

    const usersRepository = new UsersRepository()

    const findByUsernameUseCase = new FindByUsernameUseCase(usersRepository)

    const users = await findByUsernameUseCase.handler(username)

    return reply.status(200).send(users)
}