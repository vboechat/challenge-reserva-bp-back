# RESERVA-BP (Back-end)

Repositório do desafio back-end para a Bem Protege.

## Getting Started

### Requirements

- Docker
- Node.JS 18.x
- NPM
- Recomendo o uso do Yarn para instalar as dependências, levando em conta o arquivo yarn.lock presente no repositório.
- Renomeie a .env.example para somente .env e preencha as variáveis de ambiente seguindo os comentários.

## Rodando em desenvolvimento localhost

### Instalando dependências

```bash
npm install
```

### Rodando o servidor

```bash
npm run start:dev
```

## Rodando em produção

### Instalando dependências

```bash
npm install
```

### Rodando o servidor

```bash
npm run start:migrate:prod # Ele aplicará as migrations para gerar as tabelas do banco de dados e executará em modo de produção.
```

## Rodando em produção com container e imagem Docker + Postgres

### Instalando dependências

```bash
npm install
```

### Criando imagem Docker

```bash
docker build -t reserva-bp .
```

### Subindo a API e o banco de dados

```bash
docker-compose up # (ou docker-compose up -d para rodar em background)
```

Obs.: Caso a API alegue erro dizendo que o banco de dados ainda está subindo, aguarde um pouco e reinicie a API.

## Rodando testes

### Instalando dependências

```bash
npm install
```

### Rodando os testes

```bash
npm run test
```

## Documentação

### Swagger

Foi requisitado a documentação da API no Swagger, portanto, ao subir a API, a documentação estará disponível em:
`<rota da api>/docs`

### Variáveis de ambiente

A documentação das variáveis de ambiente estão disponíveis no arquivo `.env.example`.
