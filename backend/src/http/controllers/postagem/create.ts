import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { PostagemRepository } from "../../../repositories/postagem.repository"
import { CreatePostagemUseCase } from "../../../use-cases/create-postagem"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        //id: z.number(),
        texto_postagem: z.string(),
        disciplina: z.string(),
        autor: z.string()
    })

    const { texto_postagem, disciplina, autor } = registerBodySchema.parse(request.body)

    const postagemRepository = new PostagemRepository()
    const createPostagemUseCase = new CreatePostagemUseCase(postagemRepository)

    const postagem = await createPostagemUseCase.handler({ texto_postagem, disciplina, autor })

    return reply.status(201).send(postagem)

}