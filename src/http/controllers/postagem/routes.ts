import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findById } from "./findById";
import { findAll } from "./findAll";
import { deleteById } from "./deleteById";
import { search } from "./search";
import { update } from "./update";

export async function postagemRoutes(app: FastifyInstance) {
    app.get('/postagem/:id', findById)
    app.get('/postagem', findAll)
    app.get('/postagem/search', search)
    app.post('/postagem', create)
    app.delete('/postagem/:id', deleteById)
    app.put('/postagem/:id', update)
}