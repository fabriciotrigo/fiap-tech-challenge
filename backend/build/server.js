"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Vari\xE1veis de Ambiente Inv\xE1lidas", _env.error.format());
  throw new Error("");
}
var env = _env.data;

// src/app.ts
var import_swagger = require("@fastify/swagger");
var import_swagger_ui = require("@fastify/swagger-ui");
var import_fastify = require("fastify");
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/http/controllers/postagem/create.ts
var import_zod2 = require("zod");

// src/lib/db.ts
var import_pg = require("pg");
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var Database = class {
  pool;
  client;
  constructor() {
    this.pool = new import_pg.Pool(CONFIG);
    this.connection();
  }
  async connection() {
    try {
      this.client = await this.pool.connect();
    } catch (error) {
      console.error(`Erro de conex\xE3o com o banco de dados: ${error}`);
      throw new Error(`Erro de conex\xE3o com o banco de dados: ${error}`);
    }
  }
  get clientInstance() {
    return this.client;
  }
};
var database = new Database();

// src/repositories/postagem.repository.ts
var PostagemRepository = class {
  async findById(id) {
    const result = await database.clientInstance?.query(
      `SELECT * FROM postagem WHERE postagem.id = $1`,
      [id]
    );
    return result?.rows[0];
  }
  async findAll() {
    const result = await database.clientInstance?.query(
      `SELECT p.* FROM postagem p ORDER BY p.id`
    );
    return result?.rows ?? [];
  }
  async searchByText(text) {
    const result = await database.clientInstance?.query(
      `
            SELECT *
            FROM postagem
            WHERE disciplina ILIKE $1
               OR texto_postagem ILIKE $1
               OR autor ILIKE $1
            ORDER BY id
            `,
      [`%${text}%`]
    );
    return result?.rows ?? [];
  }
  async create({ texto_postagem, disciplina, autor }) {
    const result = await database.clientInstance?.query(
      `INSERT INTO postagem (texto_postagem, disciplina, autor) VALUES ($1, $2, $3) RETURNING *`,
      [texto_postagem, disciplina, autor]
    );
    return result?.rows[0];
  }
  async deleteById(id) {
    const result = await database.clientInstance?.query(
      `DELETE FROM postagem p WHERE p.id = $1`,
      [id]
    );
    return (result?.rowCount ?? 0) > 0;
  }
  async update({ id, texto_postagem, disciplina, autor }) {
    const result = await database.clientInstance?.query(
      `UPDATE postagem
                SET texto_postagem = $2,
                    disciplina = $3,
                    autor = $4
              WHERE id = $1
              RETURNING *`,
      [id, texto_postagem, disciplina, autor]
    );
    return result?.rows[0];
  }
};

// src/use-cases/create-postagem.ts
var CreatePostagemUseCase = class {
  constructor(postagemRepository) {
    this.postagemRepository = postagemRepository;
  }
  async handler(postagem) {
    return this.postagemRepository.create(postagem);
  }
};

// src/http/controllers/postagem/create.ts
async function create(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    //id: z.number(),
    texto_postagem: import_zod2.z.string(),
    disciplina: import_zod2.z.string(),
    autor: import_zod2.z.string()
  });
  const { texto_postagem, disciplina, autor } = registerBodySchema.parse(request.body);
  const postagemRepository = new PostagemRepository();
  const createPostagemUseCase = new CreatePostagemUseCase(postagemRepository);
  const postagem = await createPostagemUseCase.handler({ texto_postagem, disciplina, autor });
  return reply.status(201).send(postagem);
}

// src/http/controllers/postagem/findById.ts
var import_zod3 = __toESM(require("zod"));

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/use-cases/findById-postagem.ts
var findByIdUseCase = class {
  constructor(postagemRepository) {
    this.postagemRepository = postagemRepository;
  }
  async handler(postagemId) {
    const postagem = await this.postagemRepository.findById(postagemId);
    if (!postagem) throw new ResourceNotFoundError();
    return postagem;
  }
};

// src/http/controllers/postagem/findById.ts
async function findById(request, reply) {
  const registerParamsSchema = import_zod3.default.object({
    id: import_zod3.default.coerce.number()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const postagemRepository = new PostagemRepository();
  const findByIdPostagemUseCase = new findByIdUseCase(postagemRepository);
  const postagem = await findByIdPostagemUseCase.handler(id);
  return reply.status(200).send(postagem);
}

// src/use-cases/findAll-postagem.ts
var findAllUseCase = class {
  constructor(postagemRepository) {
    this.postagemRepository = postagemRepository;
  }
  async handler() {
    const postagem = await this.postagemRepository.findAll();
    if (!postagem) throw new ResourceNotFoundError();
    return postagem;
  }
};

// src/http/controllers/postagem/findAll.ts
async function findAll(request, reply) {
  const postagemRepository = new PostagemRepository();
  const findAllPostagemUseCase = new findAllUseCase(postagemRepository);
  const postagem = await findAllPostagemUseCase.handler();
  return reply.status(200).send(postagem);
}

// src/http/controllers/postagem/deleteById.ts
var import_zod4 = __toESM(require("zod"));

// src/use-cases/delete-postagem.ts
var deleteByIdUseCase = class {
  constructor(postagemRepository) {
    this.postagemRepository = postagemRepository;
  }
  async handler(postagemId) {
    const postagem = await this.postagemRepository.deleteById(postagemId);
    if (!postagem) throw new ResourceNotFoundError();
    return postagem;
  }
};

// src/http/controllers/postagem/deleteById.ts
async function deleteById(request, reply) {
  const registerParamsSchema = import_zod4.default.object({
    id: import_zod4.default.coerce.number()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const postagemRepository = new PostagemRepository();
  const deleteByIdPostagemUseCase = new deleteByIdUseCase(postagemRepository);
  const postagem = await deleteByIdPostagemUseCase.handler(id);
  return reply.status(200).send(postagem);
}

// src/http/controllers/postagem/search.ts
var import_zod5 = require("zod");

// src/use-cases/serachByText-postagem.ts
var SearchPostagemUseCase = class {
  constructor(postagemRepository) {
    this.postagemRepository = postagemRepository;
  }
  async handler(text) {
    if (!text || text.trim() === "") {
      return [];
    }
    const postagem = await this.postagemRepository.searchByText(text);
    if (!postagem) throw new ResourceNotFoundError();
    return postagem;
  }
};

// src/http/controllers/postagem/search.ts
async function search(request, reply) {
  const registerParamsSchema = import_zod5.z.object({
    q: import_zod5.z.string()
  });
  const { q } = registerParamsSchema.parse(request.query);
  const postagemRepository = new PostagemRepository();
  const searchPostagemUseCase = new SearchPostagemUseCase(postagemRepository);
  const postagem = await searchPostagemUseCase.handler(q);
  return reply.status(200).send(postagem);
}

// src/http/controllers/postagem/update.ts
var import_zod6 = require("zod");

// src/use-cases/update-postagem.ts
var UpdatePostagemUseCase = class {
  constructor(postagemRepository) {
    this.postagemRepository = postagemRepository;
  }
  async handler(postagem) {
    const result = await this.postagemRepository.update(postagem);
    if (!result) throw new ResourceNotFoundError();
    return result;
  }
};

// src/http/controllers/postagem/update.ts
async function update(request, reply) {
  const registerParamsSchema = import_zod6.z.object({
    id: import_zod6.z.coerce.number()
  });
  const registerBodySchema = import_zod6.z.object({
    texto_postagem: import_zod6.z.string(),
    disciplina: import_zod6.z.string(),
    autor: import_zod6.z.string()
  });
  const { id } = registerParamsSchema.parse(request.params);
  const body = registerBodySchema.parse(request.body);
  const postagemRepository = new PostagemRepository();
  const updatePostagemUseCase = new UpdatePostagemUseCase(postagemRepository);
  const postagem = await updatePostagemUseCase.handler({ id, ...body });
  return reply.status(201).send(postagem);
}

// src/http/controllers/postagem/routes.ts
var import_zod7 = require("zod");
async function postagemRoutes(app2) {
  const postagemResponseSchema = import_zod7.z.object({
    id: import_zod7.z.coerce.number(),
    texto_postagem: import_zod7.z.string(),
    disciplina: import_zod7.z.string(),
    autor: import_zod7.z.string()
  });
  app2.get("/postagem/:id", {
    schema: {
      description: "Busca postagem por ID",
      tags: ["Postagem"],
      params: import_zod7.z.object({
        id: import_zod7.z.coerce.number()
      }),
      response: {
        200: postagemResponseSchema
      }
    }
  }, findById);
  app2.get("/postagem", {
    schema: {
      description: "Lista todas as postagens",
      tags: ["Postagem"],
      response: {
        200: import_zod7.z.array(postagemResponseSchema)
      }
    }
  }, findAll);
  app2.get("/postagem/search", {
    schema: {
      description: "Busca postagem por texto",
      tags: ["Postagem"],
      querystring: import_zod7.z.object({
        q: import_zod7.z.string().min(1, "Informe um texto para busca")
      }),
      response: {
        200: import_zod7.z.array(postagemResponseSchema)
      }
    }
  }, search);
  app2.post("/postagem", {
    schema: {
      description: "Cria uma nova postagem",
      tags: ["Postagem"],
      body: import_zod7.z.object({
        texto_postagem: import_zod7.z.string(),
        disciplina: import_zod7.z.string(),
        autor: import_zod7.z.string()
      }),
      response: {
        200: import_zod7.z.array(postagemResponseSchema)
      }
    }
  }, create);
  app2.delete("/postagem/:id", {
    schema: {
      description: "Busca postagem por ID",
      tags: ["Postagem"],
      params: import_zod7.z.object({
        id: import_zod7.z.coerce.number()
      }),
      response: {
        204: import_zod7.z.undefined()
      }
    }
  }, deleteById);
  app2.put("/postagem/:id", {
    schema: {
      description: "Atualiza postagem",
      tags: ["Postagem"],
      params: import_zod7.z.object({
        id: import_zod7.z.coerce.number()
      }),
      body: import_zod7.z.object({
        texto_postagem: import_zod7.z.string(),
        disciplina: import_zod7.z.string(),
        autor: import_zod7.z.string()
      }),
      response: {
        200: import_zod7.z.array(postagemResponseSchema)
      }
    }
  }, update);
}

// src/utils/global-error-handler.ts
var import_zod8 = require("zod");
var errorHandlerMap = {
  ZodError: (error, _, reply) => {
    return reply.status(400).send({
      message: "Validation error",
      ...error instanceof import_zod8.ZodError && { error: error.format() }
    });
  },
  ResourceNotFoundError: (error, __, reply) => {
    return reply.status(404).send({ message: error.message });
  }
};
var globalErrorHandler = (error, _, reply) => {
  if (env.NODE_ENV === "development") {
    console.error(error);
  }
  const handler = errorHandlerMap[error.constructor.name];
  if (handler) return handler(error, _, reply);
  return reply.status(500).send({ message: "Internal server error" });
};

// src/app.ts
var app = (0, import_fastify.fastify)().withTypeProvider();
app.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
app.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
app.register(import_swagger.fastifySwagger, {
  openapi: {
    info: {
      title: "API de Exemplo",
      description: "Documenta\xE7\xE3o da API de exemplo utilizando Fastify",
      version: "1.0.0"
    }
  },
  transform: import_fastify_type_provider_zod.jsonSchemaTransform
});
app.register(import_swagger_ui.fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.register(postagemRoutes);
app.setErrorHandler(globalErrorHandler);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log(`Servidor rodando na porta ${env.PORT}`);
});
