### Arquitetura da Aplicação

A aplicação foi estruturada seguindo um padrão MVC simplificado:

#### 1. **Docker**

A aplicação está containerizada, rodando os seguintes serviços:

-   **Node.js**: Contém o servidor Express e toda a lógica da aplicação.
-   **PostgreSQL**: Banco de dados relacional que armazena os dados dos usuários e outras entidades da aplicação.

#### 2. **Prisma ORM**

O Prisma atua como uma camada entre a aplicação e o PostgreSQL, mapeando entidades JavaScript para tabelas no banco de dados e facilitando a consulta, criação e atualização de registros.

#### 3. **Estrutura Interna (Routes, Controllers, Services e Middlewares)**

-   **Rotas (Routes)**: São responsáveis por expor os endpoints da API, como `/users` e `/auth`. Cada rota é mapeada para um controlador específico.
-   **Controladores (Controllers)**: Manipulam as requisições HTTP, extraem dados dos parâmetros e body da requisição, validam esses dados e chamam os serviços apropriados.
-   **Serviços (Services)**: Contêm a lógica de negócio e interage com o banco de dados via Prisma.
-   **Middlewares**: Interceptam as requisições para adicionar funcionalidades como autenticação JWT, verificação de CORS e tratamento de erros.

----------

### Diagrama da Arquitetura

             +-----------------------------------------------+
             |                  Docker Container             |
             +-----------------------------------------------+
             |                                               |
             |       +-------------------------------+       |
             |       |         Node.js               |       |
             |       +-------------------------------+       |
             |       |       - Express Framework     |       |
             |       |       - Routes                |       |
             |       |       - Controllers           |       |
             |       |       - Services              |       |
             |       |       - Middlewares           |       |
             |       +-------------------------------+       |
             |                     |                         |
             |                     V                         |
             |       +-------------------------------+       |
             |       |           Prisma ORM          |       |
             |       +-------------------------------+       |
             |                     |                         |
             +-----------------------------------------------+
                                  |
                                  V
             +-----------------------------------------------+
             |             Docker Container (DB)             |
             +-----------------------------------------------+
             |                                               |
             |       +-------------------------------+       |
             |       |           PostgreSQL          |       |
             |       +-------------------------------+       |
             |                                               |
             +-----------------------------------------------+

### Fluxo de Requisição
-   **Docker Containers**:
    -   **Node.js**: Está dentro de um container separado, que executa a lógica de negócio e interage com o banco de dados. O container encapsula o **Node.js**, **Express**, **Prisma**, e os **middlewares**. Ele também está conectado ao container de banco de dados através de uma rede Docker interna.
    -   **PostgreSQL**: Está rodando em outro container, separado do container da aplicação. Isso garante que o banco de dados tenha seu próprio ambiente isolado e facilita a escalabilidade e manutenção.
-  **Node.js**: O servidor Node.js recebe a requisição e passa pelos middlewares:
    -   **CORS**: Verifica se a origem da requisição é permitida.
    -   **Auth Middleware**: Verifica o token JWT nas rotas.
- **Controllers**: A requisição é roteada para o controlador correto, onde os parâmetros são validados.
-  **Services**: O controlador chama o serviço apropriado para interagir com o banco de dados via Prisma.
-   **Prisma ORM**: Atua como a ponte entre o **Node.js** e o **PostgreSQL**, traduzindo as operações SQL.
-  **PostgreSQL**: O banco de dados processa as operações (leitura, escrita, atualização, etc.) e retorna os dados para o Prisma, que os envia de volta ao serviço.