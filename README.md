<h1 align="center">💬ComunicaIn</h1> <p align="center"> <strong>API RESTful</strong> desenvolvida com <strong>Node.js</strong>, utilizando <strong>Express</strong> como framework, <strong>Prisma ORM</strong> para gerenciamento do banco de dados <strong>PostgreSQL</strong>  e containerização através de <strong>Docker Compose</strong>. Este guia fornece instruções detalhadas para configuração, execução, rotas disponíveis e como rodar os testes da aplicação. </p>

<h3 align="center">🔍 Informações extras </h3>
<p align="center">
  <a href="https://github.com/FerreiraWalter/comunicain/blob/main/GOOD_PRACTICES.md">Boas práticas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/FerreiraWalter/comunicain/blob/main/ARCHITECTURAL_DESIGN.md">Arquitetura da aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/FerreiraWalter/comunicain/blob/main/API_DECISIONS.md">Decisões tomadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://github.com/FerreiraWalter/comunicain/blob/main/NEXT_STEPS.md">Proximos passos</a>
</p>

## Pré-requisitos

Antes de iniciar, certifique-se de que possui as seguintes ferramentas instaladas:

-   Node.js (versão 18.x ou superior)
-   Docker
-   Docker Compose

----------

## Iniciando a Aplicação

### Passos para Rodar:

1.  **Clone o Repositório**: Para começar, clone este repositório em sua máquina local utilizando o comando:
    

    > git clone https://github.com/FerreiraWalter/comunicain.git
    > 
    > cd comunicain

	- Em seguida rode o comando:     `npm install` para instalar todas as dependências da aplicação.
    
2.  **Subir os Containers com Docker Compose**: Com o repositório clonado e dentro do diretório, inicie a aplicação com o Docker Compose. Esse comando irá construir e iniciar todos os containers necessários (aplicação Node.js e o PostgreSQL).

    `docker compose up`

## Rotas Disponíveis

Aqui estão todas as rotas disponíveis e como utilizá-las via **cURL**:

### 1. **Rota de Login**

#### **POST** `/auth/login`

-   **Descrição**: Faz a autenticação e retorna um token JWT.
-   **Parâmetros**:
    -   `username`: admin
    -   `password`: admin
-   **Exemplo**:

    >     `curl -X POST http://localhost:3000/auth/login \
    >     -H 'Content-Type: application/json' \
    >     -d '{"username": "admin", "password": "admin"}'`

    

**Obs**: O token JWT retornado no login deve ser utilizado nas demais rotas protegidas (como `/users`, `/external-api`) no cabeçalho `Authorization`.

### 2. **Rotas de Usuários**

#### **GET** `/users`

-   **Descrição**: Retorna todos os usuários ativos.
-   **Exemplo**:

    >   `curl -X GET http://localhost:3000/users \
    >    -H 'authorization: Bearer <seu_token_jwt>'`

    

#### **GET** `/users/:id`

-   **Descrição**: Retorna um usuário específico pelo ID.
-   **Parâmetros**:
    -   `id` (string): O ID do usuário.
-   **Exemplo**:

    >     `curl -X GET http://localhost:3000/users/12345 \
    >     -H 'authorization: Bearer <seu_token_jwt>'`

    

#### **POST** `/users`

-   **Descrição**: Cria um novo usuário.
-   **Parâmetros**:
    -   `name` (string): Nome do usuário (mínimo 2 caracteres).
    -   `email` (string): Email válido.
    -    `bio` (string | opcional): Bio válida.
-   **Exemplo**:
    >     `curl -X POST http://localhost:3000/users \
    >     -H 'Content-Type: application/json' \
    >     -H 'authorization: Bearer <seu_token_jwt>' \
    >     -d '{"name": "John Doe", "email": "john@example.com"}'`

    

#### **PUT** `/users/:id`

-   **Descrição**: Atualiza um usuário existente.
-   **Parâmetros**:
    -   `name` (string): Nome do usuário (mínimo 2 caracteres).
    -   `email` (string): Email válido.
    -   `bio` (string | opcional): Bio válida.
-   **Exemplo**:

>     `curl -X PUT http://localhost:3000/users/12345 \
>     -H 'Content-Type: application/json' \
>     -H 'authorization: Bearer <seu_token_jwt>' \
>     -d '{"name": "Jane Doe"}'`

#### **DELETE** `/users/:id`

-   **Descrição**: Desativa um usuário, em vez de removê-lo permanentemente.
-   **Parâmetros**:
    -   `id` (string): O ID do usuário.
-   **Exemplo**:

    > `curl -X DELETE http://localhost:3000/users/12345 \
    > -H 'authorization: Bearer <seu_token_jwt>'`

    

### 3. **Rotas para API Externa**

#### **POST** `/external-api/data`

-   **Descrição**: Faz uma requisição para uma API externa (neste caso, o OpenWeatherMap) e retorna os dados climáticos.

**Exemplo**:

    `curl -X POST http://localhost:3000/external-api/data \ 
     -H 'authorization: Bearer <seu_token_jwt>' \ 
	  -H 'Content-Type: application/json' \ 
     -d '{ "url": "https://api.openweathermap.org/data/2.5", "path": "/weather",
	"headers": {}, "httpMethod": "GET", "body": {}, "params": { "lat":
	"-10.9472", "lon": "-37.0731", "appid":
	"6640af658c4d4b9ebd7746b69b1d75df" }, "query": {} 
      }'`



## Como Rodar os Testes

A aplicação utiliza **Jest**. 
### Rodando os Testes

1.  **Instalar as Dependências**: Caso ainda não tenha instalado as dependências, utilize o seguinte comando:
    `npm install` 
    e em seguida:
    `npx prisma migrate`
    
2.  **Executar os Testes**: Para rodar todos os testes unitários e de integração, execute o seguinte comando:
    
    `npm run test` 
    
