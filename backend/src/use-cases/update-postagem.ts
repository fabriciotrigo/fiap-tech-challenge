import { Postagem } from "../entities/postagem.entity";
import { PostagemRepository } from "../repositories/postagem.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class UpdatePostagemUseCase {
    constructor(private postagemRepository: PostagemRepository) {}

    async handler(postagem: Postagem): Promise<Postagem | undefined> {
        const result = await this.postagemRepository.update(postagem)
        if (!result) throw new ResourceNotFoundError()
        return result
    }
}