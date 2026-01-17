import { FastifyReply, FastifyRequest } from "fastify";
import { PostagemRepository } from "../../../repositories/postagem.repository";
import { findAllUseCase } from "../../../use-cases/findAll-postagem";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
    const postagemRepository = new PostagemRepository()

    const findAllPostagemUseCase = new findAllUseCase(postagemRepository)

    const postagem = await findAllPostagemUseCase.handler()

    return reply.status(200).send(postagem)
}