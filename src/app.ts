import fastify from "fastify"
import { postagemRoutes } from "./http/controllers/postagem/routes"
import { globalErrorHandler } from "./utils/global-error-handler"

export const app = fastify()

app.register(postagemRoutes)

app.setErrorHandler(globalErrorHandler)