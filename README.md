# Data Challange - API para analíse de fluxo de concorrentes

Uma API construida com NodeJS, Typescript, Arquivos CSV como base de dados e Cypress!

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)


## Sobre

Está API foi desenvolvida utilizando o framework [Express](https://expressjs.com), que facilita todo a estrutura de middlewares e rotas para utilização de métodos HTTP.

Para realização dos testes unitários, foi utilizado a biblioteca [Cypress](https://www.cypress.io/), que é uma plataforma Javascript para testes end-to-end, com uma interface poderosa e bem explicativa, além de facíl compreensão dos resultados
## Stack utilizada

**Back-end:** Express, Typescript, Cors, DotEnv, JsonWebToken, Morgam, Nodemon, TS-Node, CSV-Parse, zLib, Async-CSV, Node-gzip.

**Testes:** Cypress

## Rodando localmente

Primeiramente você deve ter o NodeJS e NPM instalados! [Link para download](https://nodejs.org/)

Clone o projeto no local desejado

```bash
  git clone https://github.com/dinoMarinho/data-challenge.git
```

Entre no diretório do projeto

```bash
  cd data-challenge
```

***[IMPORTANTE]*** Clone o arquivo ".env-example" e renomeio para ".env", e preencha a SECRET com "analysis"

Execute o comando de instalação das depêndencias do projeto:

```bash
  npm i
```

Inicie o servidor local com o seguinte comando:

```bash
  npm run dev
```

Aguarde o servidor carregar as informações do CSV e subir a aplicação na porta 3500
## Rodando os testes

Primeiramente você deve ter o NodeJS e NPM instalados! [Link para download](https://nodejs.org/)

***[IMPORTANTE]*** A API deve estar online para realizar os testes!

Abra um novo terminal com a pasta do projeto aberta e execute o seguinte comando: 

```bash
  npm run test
```

Agora o Cypress deve executar os testes e mostar os resultados

***[OPCIONAL]*** Caso queira ver o teste pela interface gráfica do Cypress, pode executar o seguinte comando:

```bash
  npm run test.open
```

Logo abrirá a interface gráfica do Cypress, onde você deve clicar no link conténdo o nome:

```bash
  analysis.spec.js
```

O Cypress abrirá um aba do navegador controlada por ele e irá mostrar o teste sendo executado em tempo real!
## Deploy

Para fazer o deploy desse projeto, primeiro vamos gerar a build do projeto com o seguinte comando:

```bash
  npm run build
```

E então podemos subir essa pasta no servidor desejado. ***Recomendo subir esse projeto em um container Docker NodeJS!***



## Documentação da API

A API se autentica através de um TOKEN JWT, passado utilizando um Bearer token no **header**, **Com execessão da rota de autenticar usuário, todas as rotas necessitam do token de autenticação, então não se esqueça de enviar ele no header como no exemplo abaixo:**

**Usuários**

#### Autenticar Usuários

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

Retorno: Status e response com token para utilizar nas outras requisições

#### Buscar aulas

**Analíse**

```http
  GET /analysis/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório** ID do concorrente |

Retorno: Status e response com as informações das aulas


## Referência

 - [NodeJS](https://nodejs.org/en/)
 - [Cypress](https://www.cypress.io/)
 - [Typescript](https://www.typescriptlang.org/)
 - [Bcrypt](https://www.npmjs.com/package/bcrypt)
 - [Cors](https://www.npmjs.com/package/cors)
 - [DotEnv](https://www.npmjs.com/package/dotenv)
 - [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
 - [Morgam](https://www.npmjs.com/package/morgan)
 - [Nodemon](https://www.npmjs.com/package/nodemon)
 - [TS-Node](https://www.npmjs.com/package/ts-node)
 - [Async-CSV](https://www.npmjs.com/package/async-csv)
 - [zLib](https://www.npmjs.com/package/zlib)
 - [Gunzip-file](https://www.npmjs.com/package/gunzip-file)
 - [CSV-parse](https://www.npmjs.com/package/csv-parse)
## Bônus

Dentro da pasta `postman` tem a colletion, com as variáveis já setadas na colletion, bastando importar no POSTMAN e executar os métodos
