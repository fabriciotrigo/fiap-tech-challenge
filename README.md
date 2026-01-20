# Blog Educacional
## Tech Challenge 2 – Pós Tech FIAP - 7FSDT

---

## 📌 Descrição do Projeto

Sistema desenvolvido para o Tech Challenge da Fase 2. Aplicação de blogging educacional para permitir a criação, edição, exclusão e visualização de postagens por meio de uma API RESTful.

O projeto foi criado com foco em boas práticas de arquitetura, containerização e deploy em ambiente cloud.

---

## 🖥️ Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Fastify** (para criação de API)
- **PostgreSQL** (banco relacional para persistência de dados)
- **Zod** (validação e tipagem)
- **Swagger / OpenAPI** (documentação da API)
- **Docker & Docker Compose** (containerização)
- **GitHub Actions (CI/CD)** (automação de deploy)
- **Render (Cloud Hosting)** (simulação de deploy em produção)

---

## 📁 Estrutura do Projeto

O projeto segue a seguinte separação de responsabilidades:

- **Controllers**: lidam com HTTP (request/response)
- **Use Cases**: regras de negócio
- **Repositories**: acesso ao banco de dados

```
. 
├── .github/ 
│   └── workflows/  
│       └── main.yml  
├── docker/  
│   └── init.sql  
├── src/  
│   ├── entities/  
│   ├── env/  
│   ├── http/  
│   │   └── controllers/   
│   ├── lib/  
│   ├── respositories/  
│   ├── use-cases/  
│   ├── utils/  
│   ├── app.ts
│   └── server.ts  
├── tests/  
├── Dockerfile  
├── docker-compose.yml  
├── jest.config.js
├── package.json  
├── tsconfig.json  
└── README.md  
```

---

## 📝 Guia de Uso da API  

| Método   | Endpoint                      | Descrição                   |
| -------- | ----------------------------- | --------------------------- |
| `GET`    | `/postagem`                   | Lista todos os posts        |
| `GET`    | `/postagem/:id`               | Busca post pelo ID          |
| `GET`    | `/postagem/search?q=texto`    | Busca posts pelo texto      |
| `POST`   | `/postagem`                   | Cria novo post              |
| `PUT`    | `/postagem/:id`               | Atualiza post existente     |
| `DELETE` | `/postagem/:id`               | Remove um post              |

- **A documentação da API é gerada automaticamente com Swagger:**
- http://localhost:3000/docs ou 
- https://blog-tech2.onrender.com/docs 

---

## 📝 Guia de Instalação e Execução

### Pré-requisitos

-   **Node.js** v20+
-   **Docker & Docker Compose** (para backend e banco)
-   **PostgreSQL** (ou usar via Docker)
-   **Git**

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/fabriciotrigo/fiap-tech-challenge.git 
cd fiap-tech-challenge
```

### 2️⃣ Configuração das Variáveis de Ambiente

Crie e configure um arquivo .env na raíz do projeto da mesma forma como demonstrado em .env.example:

```bash
PORT=  
ENV=  
DATABASE_USER=  
DATABASE_HOST=  
DATABASE_NAME=  
DATABASE_PASSWORD=  
DATABASE_PORT=  
```

### 3️⃣ Execução com Docker 

```bash
# Inicia todos os serviços
docker-compose up 
```

#### 🐘 Banco de Dados
- O PostgreSQL roda em container
- O script ./docker/init.sql é executado automaticamente na primeira inicialização
- Os dados são persistidos via volume Docker  
  volumes:  
    - postgres_data:/var/lib/postgresql/data

### 4️⃣ Execução Manual (Desenvolvimento)

Na raíz do projeto:

```bash
npm install
npm run dev
```

#### ⚙️ Scripts Disponíveis

| Script | Comando       | Descrição                              |
| ------ | ------------- | -------------------------------------- |
| dev    | npm run dev   | Executa em modo desenvolvimento        |
| build  | npm run build | Transpila o projeto para produção      |
| start  | npm start     | Inicia a aplicação transpilada         |
| test   | npm test      | Executa os testes com Jest e supertest |

### 5️⃣ Acesso às Aplicações

-   **API**: http://localhost:3000 ou https://blog-tech2.onrender.com
-   **Documentação Swagger**: http://localhost:3000/docs ou https://blog-tech2.onrender.com/docs

---

## 🔁 CI/CD com GitHub Actions
### O projeto conta com pipeline automatizado que:
  - Executa o build
  - Cria a imagem Docker
  - Publica a imagem no Docker Hub
  - As credenciais são gerenciadas via GitHub Secrets

### Deploy
  - API hospedada via Render: https://blog-tech2.onrender.com 
  - Banco PostgreSQL gerenciado pelo Render
  - O Render utiliza a imagem do Docker Hub como base para criação dos containers de execução

---

## 📌 Desafios  

Particularmente, por tratarem-se de tecnologias com as quais eu ainda não havia tido contato na prática (como: Docker, desenvolvimento de APIs, GitHub Actions), essa segunda fase foi bastante desafiadora. Toda a parte para entendimento de alguns conceitos (como criação de imagens no docker, containers, estrutura e separação de responsabilidades conforme desenvolvimento do código) e escrita dos arquivos Dockerfile, docker-compose.yml e main.yml (github/workflows/) exigiu tempo de pesquisa e estudo.

👤 Autor </br>
Fabricio Boschette Trigo
