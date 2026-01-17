import { Postagem } from "../entities/postagem.entity";
import { PostagemRepository } from "../repositories/postagem.repository";

export class CreatePostagemUseCase {
    constructor(private postagemRepository: PostagemRepository) {}

    async handler(postagem: Postagem): Promise<Postagem | undefined> {
        return this.postagemRepository.create(postagem)
    }
}