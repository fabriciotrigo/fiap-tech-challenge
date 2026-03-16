"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/postagem/create.ts
var create_exports = {};
__export(create_exports, {
  create: () => create
});
module.exports = __toCommonJS(create_exports);
var import_zod2 = require("zod");

// src/lib/db.ts
var import_pg = require("pg");

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

// src/lib/db.ts
var CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT
};
var Database = class {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
