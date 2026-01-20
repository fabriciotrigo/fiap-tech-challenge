import request from 'supertest'
import { app } from '../src/app'

describe('Postagem API', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('deve listar todas as postagens', async () => {
    const response = await request(app.server)
      .get('/postagem')
      .expect(200)

    expect(Array.isArray(response.body)).toBe(true)
  })

})
