import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PostagemRepository } from "../../../repositories/postagem.repository"
import { UpdatePostagemUseCase } from "../../../use-cases/update-postagem"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const registerBodySchema = z.object({
        texto_postagem: z.string(),
        disciplina: z.string(),
        autor: z.string()
    })

    const { id } = registerParamsSchema.parse(request.params)
    const body = registerBodySchema.parse(request.body)

    const postagemRepository = new PostagemRepository()
    const updatePostagemUseCase = new UpdatePostagemUseCase(postagemRepository)

    const postagem = await updatePostagemUseCase.handler({ id, ...body })

    return reply.status(201).send(postagem)

}