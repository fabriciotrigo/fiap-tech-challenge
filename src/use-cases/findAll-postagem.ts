import { Postagem } from "../entities/postagem.entity"
import { PostagemRepository } from "../repositories/postagem.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class findAllUseCase {
    constructor(private postagemRepository: PostagemRepository) {}

    async handler(): Promise<Postagem[] | undefined> {
        const postagem = await this.postagemRepository.findAll()
        if (!postagem) throw new ResourceNotFoundError()
        return postagem
    }
}