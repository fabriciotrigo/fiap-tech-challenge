import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { postagemRoutes } from "./http/controllers/postagem/routes";
import { usersRoutes } from "./http/controllers/users/routes";
import { globalErrorHandler } from "./utils/global-error-handler";
import fastifyJwt from "@fastify/jwt";
import { validateJwt } from "./http/middlewares/jwt-validate";
import { env } from "./env";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '15m' }
})

app.addHook('onRequest', validateJwt)

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API - Blog Educacional',
      description: 'Documentação da API do Blog Educacionale - Tech Challenge 2',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(postagemRoutes)
app.register(usersRoutes)

app.setErrorHandler(globalErrorHandler)