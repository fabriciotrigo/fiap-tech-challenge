import { Postagem } from "../entities/postagem.entity"
import { PostagemRepository } from "../repositories/postagem.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

export class SearchPostagemUseCase {
    constructor(private postagemRepository: PostagemRepository) {}

    async handler(text: string): Promise<Postagem[]> {
        if (!text || text.trim() === '') {
            return []
        }

        const postagem = await this.postagemRepository.searchByText(text)
        if (!postagem) throw new ResourceNotFoundError()
        return postagem
    }
}