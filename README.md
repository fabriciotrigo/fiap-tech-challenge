FIAP Pós-Tech - Full Stack Development (7FSDT)
Fase 2 - Tech Challenge

# Blog Tech 2 🚀

API REST para um blog técnico, desenvolvida com **Node.js**, **Fastify**, **TypeScript** e **PostgreSQL**, utilizando **Docker**, **Docker Compose** e **CI/CD com GitHub Actions**.

O projeto foi criado com foco em boas práticas de arquitetura, containerização e deploy em ambiente cloud.

---

## 🧱 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Fastify**
- **PostgreSQL**
- **Docker & Docker Compose**
- **Zod** (validação de variáveis de ambiente)
- **GitHub Actions (CI/CD)**

---

## 📁 Estrutura do Projeto
.
├── docker/
│   └── init.sql
├── src/
│   ├── env/
│   │   └── index.ts
│   ├── server.ts
│   └── database.ts
├── build/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md

⚙️ Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:

PORT=3000
ENV=development
DATABASE_USER=user
DATABASE_HOST=postgres
DATABASE_NAME=teste
DATABASE_PASSWORD=123456
DATABASE_PORT=5432
⚠️ Nunca suba o arquivo .env para o repositório.

🐳 Executando com Docker Compose (Recomendado)
1️⃣ Subir aplicação + banco
docker compose up
2️⃣ Acessar a API
http://localhost:3000
🐘 Banco de Dados
O PostgreSQL roda em container

O script init.sql é executado automaticamente na primeira inicialização

Os dados são persistidos via volume Docker

volumes:
  - postgres_data:/var/lib/postgresql/data
🧪 Ambiente de Desenvolvimento
npm install
npm run dev
🏗️ Build para Produção
npm run build
npm start
📦 Scripts Disponíveis
Script	Descrição
dev	Executa em modo desenvolvimento
build	Compila o projeto para produção
start	Inicia a aplicação compilada
🔁 CI/CD com GitHub Actions
O projeto conta com pipeline automatizado que:

Executa o build

Cria a imagem Docker

Publica a imagem no Docker Hub

As credenciais são gerenciadas via GitHub Secrets.

☁️ Deploy
API hospedada via Render

Banco PostgreSQL gerenciado pelo Render

Imagem Docker pública no Docker Hub

📌 Boas Práticas Aplicadas
Multi-stage build no Dockerfile

Separação de ambiente (dev / prod)

Validação de variáveis de ambiente com Zod

Persistência de dados com volumes

Healthcheck no banco

CI/CD automatizado

👨‍💻 Autor
Fabrício Trigo

GitHub: https://github.com/seu-usuario

Docker Hub: https://hub.docker.com/u/seu-usuario