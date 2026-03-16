import { Postagem } from "../entities/postagem.entity"
import { PostagemRepository } from "../repositories/postagem.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class findByIdUseCase {
    constructor(private postagemRepository: PostagemRepository) {}

    async handler(postagemId: number): Promise<Postagem | undefined> {
        const postagem = await this.postagemRepository.findById(postagemId)
        if (!postagem) throw new ResourceNotFoundError()
        return postagem
    }
}