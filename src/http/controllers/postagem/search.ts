import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PostagemRepository } from "../../../repositories/postagem.repository";
import { SearchPostagemUseCase } from "../../../use-cases/serachByText-postagem";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        q: z.string()
    })

    const { q } = registerParamsSchema.parse(request.query)

    const postagemRepository = new PostagemRepository()

    const searchPostagemUseCase = new SearchPostagemUseCase(postagemRepository)

    const postagem = await searchPostagemUseCase.handler(q)

    return reply.status(200).send(postagem)
}