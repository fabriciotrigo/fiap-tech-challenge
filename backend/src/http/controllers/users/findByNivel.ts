import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UsersRepository } from "../../../repositories/users.repository";
import { FindByNivelUseCase } from "../../../use-cases/findByNivel-users";

export async function findByNivel(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        nivel: z.coerce.number()
    })

    const { nivel } = registerParamsSchema.parse(request.params)

    const usersRepository = new UsersRepository()

    const findByNivelUseCase = new FindByNivelUseCase(usersRepository)

    const users = await findByNivelUseCase.handler(nivel)

    return reply.status(200).send(users)
}