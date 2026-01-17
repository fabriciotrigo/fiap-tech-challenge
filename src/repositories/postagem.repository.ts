import { Postagem } from '../entities/postagem.entity'
import { database } from '../lib/db'

export class PostagemRepository {
    public async findById(id: number): Promise<Postagem | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM postagem WHERE postagem.id = $1`,
            [id]
        )
        
        return result?.rows[0]
    }

    public async findAll(): Promise<Postagem[] | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT p.* FROM postagem p ORDER BY p.id`,
        )

        return result?.rows ?? [ ]
    }

    public async searchByText(text: string): Promise<Postagem[]> {
        const result = await database.clientInstance?.query<Postagem>(
            `
            SELECT *
            FROM postagem
            WHERE disciplina ILIKE $1
               OR texto_postagem ILIKE $1
               OR autor ILIKE $1
            ORDER BY id
            `,
            [`%${text}%`]
        )

        return result?.rows ?? []
    }

    public async create({ texto_postagem, disciplina, autor}: Postagem): Promise<Postagem | undefined> {
        const result = await database.clientInstance?.query<Postagem>(
            `INSERT INTO postagem (texto_postagem, disciplina, autor) VALUES ($1, $2, $3) RETURNING *`,
            [texto_postagem, disciplina, autor]
        )

        return result?.rows[0]
    }

    public async deleteById(id: number): Promise<boolean> {
        const result = await database.clientInstance?.query<Postagem>(
            `DELETE FROM postagem p WHERE p.id = $1`,
            [id]
        )

        return (result?.rowCount ?? 0) > 0
    }

    public async update({ id, texto_postagem, disciplina, autor}: Postagem): Promise<Postagem | undefined> {
        const result = await database.clientInstance?.query<Postagem>(
            `UPDATE postagem
                SET texto_postagem = $2,
                    disciplina = $3,
                    autor = $4
              WHERE id = $1
              RETURNING *`,
            [id, texto_postagem, disciplina, autor]
        )

        return result?.rows[0]
    }
}