import { FastifyReply, FastifyRequest } from 'fastify'

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const route = request.routeOptions.url
    const method = request.method
    const url = request.raw.url || ''

    if (((route === '/users' || route === '/users/signin' ) && method === 'POST')
       || url.startsWith('/docs')) return

    await request.jwtVerify()

  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' })
  }
}