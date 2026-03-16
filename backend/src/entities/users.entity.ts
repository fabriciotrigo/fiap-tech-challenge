export class Users {
    id?: number
    username: string 
    password: string
    nivel: number

    constructor(username: string, password: string, nivel: number) {
        this.username = username
        this.password = password
        this.nivel = nivel
    }
}