import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findById } from "./findById";
import { findAll } from "./findAll";
import { deleteById } from "./deleteById";
import { search } from "./search";
import { update } from "./update";
import { z } from "zod";

export async function postagemRoutes(app: FastifyInstance) { 

    const postagemResponseSchema = z.object({
        id: z.coerce.number(),
        texto_postagem: z.string(),
        disciplina: z.string(),
        autor: z.string(),
    })

    //app.get('/postagem/:id', findById)
    app.get('/postagem/:id', {
        schema: {
            description: 'Busca postagem por ID',
            tags: ['Postagem'],
            params: z.object({
                id: z.coerce.number(),
            }),
            response: {
                200: postagemResponseSchema
            },
        }           
    }, findById)

    //app.get('/postagem', findAll)
    app.get('/postagem', {
        schema: {
            description: 'Lista todas as postagens',
            tags: ['Postagem'],
            response: {
                200: z.array(postagemResponseSchema),
            },
        }
    }, findAll)

    //app.get('/postagem/search', search)
    app.get('/postagem/search', {
        schema: {
            description: 'Busca postagem por texto',
            tags: ['Postagem'],
            querystring: z.object({
                q: z.string().min(1, 'Informe um texto para busca'),
            }),
            response: {
                200: z.array(postagemResponseSchema),
            },
        },
    }, search)

    //app.post('/postagem', create)
    app.post('/postagem', {
        schema: {
            description: 'Cria uma nova postagem',
            tags: ['Postagem'],
            body: z.object({
                texto_postagem: z.string(),
                disciplina: z.string(),
                autor: z.string(),
            }),
            response: {
                200: z.array(postagemResponseSchema),
            },
        },
    }, create)

    //app.delete('/postagem/:id', deleteById)
    app.delete('/postagem/:id', {
        schema: {
            description: 'Busca postagem por ID',
            tags: ['Postagem'],
            params: z.object({
                id: z.coerce.number(),
            }),
            response: {
                204: z.undefined()
            },
        },
    }, deleteById)

    //app.put('/postagem/:id', update)
    app.put('/postagem/:id', {
        schema: {
            description: 'Atualiza postagem',
            tags: ['Postagem'],
            params: z.object({
                id: z.coerce.number(),
            }),
            body: z.object({
                texto_postagem: z.string(),
                disciplina: z.string(),
                autor: z.string(),
            }),
            response: {
                200: z.array(postagemResponseSchema),
            }
        },
    }, update)
}