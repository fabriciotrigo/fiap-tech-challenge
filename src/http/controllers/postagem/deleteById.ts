import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PostagemRepository } from "../../../repositories/postagem.repository";
import { deleteByIdUseCase } from "../../../use-cases/delete-postagem";

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const postagemRepository = new PostagemRepository()

    const deleteByIdPostagemUseCase = new deleteByIdUseCase(postagemRepository)

    const postagem = await deleteByIdPostagemUseCase.handler(id)

    return reply.status(200).send(postagem)
}