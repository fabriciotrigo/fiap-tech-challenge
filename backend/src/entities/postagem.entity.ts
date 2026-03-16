export class Postagem {
    id?: number
    texto_postagem: string
    disciplina: string
    autor: string

    constructor(texto_postagem: string, disciplina: string, autor: string) {
        this.texto_postagem = texto_postagem
        this.disciplina = disciplina
        this.autor = autor
    }
}