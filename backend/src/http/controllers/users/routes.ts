import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByUsername } from './findByUsername'
import { signin } from './signin'
import { findByNivel } from './findByNivel'
import { deleteUsers } from './deleteUsers'
import { updateUsers } from './updateUsers'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users/nivel/:nivel', findByNivel)
  app.get('/users/:username', findByUsername)
  app.post('/users', create)
  app.post('/users/signin', signin)
  app.delete('/users/:id', deleteUsers)
  app.patch('/users/:id/nivel', updateUsers)
}