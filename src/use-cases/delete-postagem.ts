//import { Postagem } from "../entities/postagem.entity"
import { PostagemRepository } from "../repositories/postagem.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class deleteByIdUseCase {
    constructor(private postagemRepository: PostagemRepository) {}

    async handler(postagemId: number): Promise<boolean> {
        const postagem = await this.postagemRepository.deleteById(postagemId)
        if (!postagem) throw new ResourceNotFoundError()
        return postagem
    }
}