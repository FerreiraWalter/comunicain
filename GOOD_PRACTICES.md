## ⚠️ Middleware para Tratamento de Erros

### Implementação
<p>Foi implementado um middleware de tratamento de erros customizado que utiliza a classe `CustomError`. Ele captura todos os erros lançados durante o ciclo de vida de uma requisição e garante que a API responda de forma consistente, sem expor detalhes sensíveis.</p>

-   **Captura de Erros**: Qualquer erro gerado nas rotas, controladores ou serviços será capturado por esse middleware, garantindo que nenhum erro passe despercebido ou exponha informações sensíveis ao cliente.
-   **Customização**: Utilizando a classe `CustomError`, você pode definir mensagens personalizadas para erros, tornando as respostas mais claras para o cliente.
-   **Padronização de Respostas**: Todas as respostas de erro têm um formato JSON padronizado, facilitando o tratamento desses erros pelo cliente ou desenvolvedor frontend.
-   **Segurança**: O middleware oculta o stack trace dos erros, evitando que informações sensíveis do sistema sejam expostas. Isso é crucial para evitar que detalhes internos da aplicação sejam explorados por atacantes.
-   **Manutenção**: O tratamento centralizado de erros facilita o diagnóstico, pois todos os logs e mensagens são gerenciados em um único ponto. Isso permite uma depuração mais rápida e eficiente.

## 🔑 Autenticação por JWT para Proteger as Rotas:

### Implementação

A autenticação por **JWT (JSON Web Tokens)** foi implementada para garantir que apenas usuários autenticados possam acessar determinadas rotas. A chave secreta e o tempo de expiração dos tokens são gerenciados de forma centralizada no arquivo de configuração `auth.config.ts`.

**Arquivo de Configuração (`auth.config.ts`):**

    `export const authConfig = {
      secret: 'walter_comunicain',
      expiresIn: '1h',
    };` 

-   **Autenticação Baseada em Token**: Ao fazer login, o usuário recebe um token JWT que deve ser enviado no cabeçalho `Authorization` em todas as requisições a rotas protegidas.
-   **Proteção das Rotas**: As rotas protegidas, como `/users` e `/external-api`, só podem ser acessadas se o token JWT for válido. Isso garante que apenas usuários autenticados consigam realizar operações nessas rotas.
-   **Secret_key e Expiração**: A secret_key e o tempo de expiração do token são definidos no `auth.config.ts`, garantindo que a configuração seja centralizada e fácil de modificar.
-   **Segurança**: O uso de JWT garante que apenas usuários autenticados possam acessar rotas sensíveis, como a listagem, atualização e deleção de usuários. Isso reduz o risco de acessos não autorizados.
-   **Manutenção**: A autenticação é facilmente configurável através do `auth.config.ts`, permitindo alterar a chave secreta ou o tempo de expiração sem precisar modificar várias partes do código.

## 🌐 Configuração de CORS:

### Implementação

O **CORS (Cross-Origin Resource Sharing)** foi configurado para controlar quais origens podem acessar a API, limitando o escopo de requisições a partir de domínios confiáveis. Além disso, apenas métodos e cabeçalhos específicos foram permitidos, aumentando a segurança das interações.

-   **Métodos Permitidos**: Apenas os métodos `GET`, `POST`, `PUT` e `DELETE` são permitidos, de acordo com as operações principais que sua API realiza.
-   **Headers Permitidos**: Apenas os headers `authorization` (usado para autenticação JWT) e `Content-Type` (para indicar o tipo de conteúdo da requisição) são permitidos.
-   **Segurança**: O controle de CORS limita quais origens, métodos e cabeçalhos podem interagir com a API, evitando requisições maliciosas de domínios não confiáveis.
-   **Manutenção**: A configuração de CORS pode ser facilmente ajustada para permitir novos métodos ou cabeçalhos, conforme a API evolui, sem a necessidade de grandes mudanças no código.