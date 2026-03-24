# Blog Educacional - Frontend
## Tech Challenge - Fase 3 - Pós Tech FIAP - 7FSDT

Interface web da aplicação Blog Educacional, desenvolvida com Next.js e integrada ao backend em Fastify.

---

## 📌 Sobre o projeto

Este frontend permite que professores e alunos interajam com a plataforma de blog educacional, possibilitando:

- Login com autenticação JWT
- Listagem de postagens
- Criação de postagens (Professor)
- Edição de postagens (Professor)
- Exclusão de postagens (Professor)
- Visualização de postagens (Aluno)

---

## 🚀 Tecnologias utilizadas

- React
- Next.js 16
- Tailwind CSS (para estilização e responsividade)
- React Toastify (para feedback visual ao usuário)
- JWT (para autenticação de usuário)
- Docker

---

## 📁 Estrutura de pastas

```
. 
├── .github/ 
├── backend/  
├── frontend/  
│   ├── public/
│   ├── src/  
│   │   ├── app/
│   │   │   ├── (app)/
│   │   │   │   ├── postagem/
│   │   │   │   │   ├── criar/
│   │   │   │   │   ├── editar/
│   │   │   │   │   │   └──[id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   ├── contexts/
│   │   └── lib/
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   └── tsconfig.json
├── docker-compose.yml  
└── README.md  
```

---

## ⚙️ Como executar o projeto

```bash
git clone https://github.com/fabriciotrigo/fiap-tech-challenge.git 
cd fiap-tech-challenge
cd frontend
```

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Executar o Projeto

```bash
npm run dev
```

Aplicação disponível em: http://localhost:3001

Para pleno funcionamento o backend deverá estar em execução: http://localhost:3000

Para execução local crie um arquivo .env.local na pasta ./frontend com o conteúdo abaixo:

```bash
NETX_PUBLIC_API_URL=http://localhost:3000
```

Para execução com docker crie um arquivo .env.production na pasta ./frontend com o conteúdo abaixo:

```bash
NETX_PUBLIC_API_URL=http://api:3000
```

---

## 🔐 Autenticação

A aplicação utiliza autenticação baseada em JWT.

Após login, o token é armazenado no localStorage e utilizado nas requisições protegidas.

---

## 👤 Perfis de usuário

### Professor (nível 1)

- Criar postagens
- Editar postagens
- Excluir postagens

### Aluno (nível 2)

- Visualizar postagens

---

## 🔗 Integração com Backend

A aplicação consome as seguintes rotas (backend):

- POST /users/signin
- POST /users
- GET /postagem
- POST /postagem
- PUT /postagem/:id
- DELETE /postagem/:id

---

## 👨‍💻 Autor

Fabrício Boschette Trigo - RM368000