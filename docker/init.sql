CREATE TABLE postagem (
  id SERIAL PRIMARY KEY,
  disciplina varchar NOT NULL,
  texto_postagem varchar NOT NULL,
  autor varchar NOT NULL
);