## Decisões da Aplicação

#### 1. **Docker**

**Docker** foi utilizado para garantir a consistência do ambiente de desenvolvimento e produção, eliminando problemas de dependências entre diferentes ambientes. O uso de containers facilita a escalabilidade e o deploy.

-   **Isolamento de Dependências**: Cada componente da aplicação, como o banco de dados PostgreSQL e o servidor Node.js, roda em containers separados.
-   **Orquestração Simples**: Com **Docker Compose**, podemos iniciar a aplicação, o banco de dados e outras dependências com um único comando.

#### 2. **PostgreSQL + Prisma ORM**

O **PostgreSQL** foi escolhido como banco de dados relacional por sua confiabilidade e performance, enquanto o **Prisma ORM** simplifica o gerenciamento de dados, oferecendo uma otima documentação e facilidade de configuração para a comunicação com o banco de dados.

-   **Migrations**: O Prisma facilita a criação de migrations no banco de dados, além de simplificar as consultas SQL.

#### 3. **Arquitetura**

A aplicação foi estruturada seguindo um padrão MVC simplificado:

-   **Routes**: Definem os endpoints e roteiam para os controladores.
-   **Controllers**: Lidam com a lógica de requisição e resposta.
-   **Services**: Contêm a lógica de negócios e interagem com o banco de dados através do Prisma.
-   **Middlewares**: Fazem a autenticação e tratam erros de forma centralizada, além de adicionar funcionalidades como CORS.