CREATE TABLE postagem (
  id SERIAL PRIMARY KEY,
  disciplina varchar NOT NULL,
  texto_postagem varchar NOT NULL,
  autor varchar NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nivel INTEGER NOT NULL
);