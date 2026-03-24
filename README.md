# Blog Educacional
## Pós Tech FIAP - Full Stack Development (7FSDT)

Aplicação fullstack desenvolvida para fins educacionais, permitindo a criação, edição e visualização de postagens por diferentes perfis de usuários (professores e alunos).

---

## 📌 Sobre o projeto

O sistema consiste em uma plataforma de blog educacional onde:

- Professores podem criar, editar e excluir postagens
- Alunos podem visualizar conteúdos
- O sistema é dividido em frontend e backend

---

## 📁 Arquitetura

```
. 
├── .github/ 
├── backend/ → API REST 
├── frontend/ → Interface web 
├── .env
├── docker-compose.yml
└── README.md
```

[backend/README](./backend/README.md)

[frontend/README](./frontend/README.md)

---

## ⚙️ Como executar o projeto

### 1️⃣ Clonar repositório
```bash
git clone https://github.com/fabriciotrigo/fiap-tech-challenge.git 
cd fiap-tech-challenge
```

---

### 2️⃣ Configuração das Variáveis de Ambiente do Backend

Crie e configure um arquivo .env na raíz do projeto da mesma forma como demonstrado em ./backend/.env.example:

```bash
PORT=  
ENV=  
DATABASE_USER=  
DATABASE_HOST=  
DATABASE_NAME=  
DATABASE_PASSWORD=  
DATABASE_PORT=  
JWT_SECRET= 
```

### 3️⃣ Configuração da Variável de Ambiente do Frontend

Para execução com docker crie um arquivo .env.production na pasta ./frontend com o conteúdo abaixo:

```bash
NETX_PUBLIC_API_URL=http://api:3000
```

---

### 4️⃣ Subir com Docker
```bash
docker-compose up --build
```
---

### 5️⃣ Acessar aplicações

- Backend:  http://localhost:3000
- Swagger:  http://localhost:3000/docs
- Frontend:  http://localhost:3001

---

## 🔐 Autenticação

O sistema utiliza JWT para autenticação.

Após login:
- O token é gerado no backend
- Armazenado no frontend
- Enviado nas requisições protegidas

---

## 👤 Perfis de usuário

| Nível | Tipo        | Permissões             |
|-------|-------------|------------------------|
|   1   | Professor   | Criar, editar, excluir |
|   2   | Aluno       | Visualizar             |

---

## 🔗 Principais endpoints

### Usuários
- POST /users
- POST /users/signin
- GET /user/:username

### Postagens
- GET /postagem
- GET /postagem/:id
- GET /postagem/search?q=texto
- POST /postagem
- PUT /postagem/:id
- DELETE /postagem/:id

---

## 📌 Observações

- O backend deve estar rodando para o frontend funcionar
- Certifique-se de que as portas 3000 e 3001 estejam disponíveis

---

## 👨‍💻 Autor 

Fabrício Boschette Trigo - RM368000