import { Users } from '../entities/users.entity'
import { database } from '../lib/db'

export class UsersRepository {
    public async findByUsername(username: string): Promise<Users | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM users WHERE users.username = $1`,
            [username]
        )
        
        return result?.rows[0]
    }

    public async create({ username, password, nivel}: Users): Promise<Users | undefined> {
        const result = await database.clientInstance?.query<Users>(
            `INSERT INTO users (username, password, nivel) VALUES ($1, $2, $3) RETURNING *`,
            [username, password, nivel]
        )

        return result?.rows[0]
    }

    public async findByNivel(nivel: number): Promise<Users[] | undefined> {
        const result = await database.clientInstance?.query<Users>(
            `SELECT * FROM users WHERE users.nivel = $1`,
            [nivel]
        )

        return result?.rows ?? [ ]
    }

    public async deleteUsers(id: number): Promise<boolean> {
        const result = await database.clientInstance?.query<Users>(
            `DELETE FROM users u WHERE u.id = $1`,
            [id]
        )

        return (result?.rowCount ?? 0) > 0
    }

    public async updateUsers({ id, nivel}: {id: number, nivel: number}): Promise<Users | undefined> {
        const result = await database.clientInstance?.query<Users>(
            `UPDATE users
                SET nivel = $2
              WHERE id = $1
              RETURNING *`,
            [id, nivel]
        )

        return result?.rows[0]
    }
}