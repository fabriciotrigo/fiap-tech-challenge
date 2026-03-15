import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByUsername } from './findByUsername'
import { signin } from './signin'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users/:username', findByUsername)
  app.post('/users', create)
  app.post('/users/signin', signin)
}