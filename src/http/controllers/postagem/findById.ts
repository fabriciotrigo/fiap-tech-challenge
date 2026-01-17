import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PostagemRepository } from "../../../repositories/postagem.repository";
import { findByIdUseCase } from "../../../use-cases/findById-postagem";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const postagemRepository = new PostagemRepository()

    const findByIdPostagemUseCase = new findByIdUseCase(postagemRepository)

    const postagem = await findByIdPostagemUseCase.handler(id)

    return reply.status(200).send(postagem)
}