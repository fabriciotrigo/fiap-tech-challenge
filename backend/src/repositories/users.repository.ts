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
}