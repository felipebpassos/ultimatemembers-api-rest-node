# Ultimate Members (backend)

![Interface da API](https://github.com/felipebpassos/felipebpassos/blob/main/print-api.png?raw=true)

## Descrição do Projeto

Este é o projeto backend de **Área de Membros para Cursos Online** desenvolvido com as seguintes tecnologias:
- **Node.js** com **Express** para a construção da API;
- **Sequelize** para ORM e interação com banco de dados MySQL;
- **JWT (JSON Web Tokens)** para autenticação de usuários;
- **bcrypt.js** para criptografia de senhas;
- **dotenv** para gerenciamento de variáveis de ambiente.

A aplicação gerencia o backend da plataforma de cursos online, com funcionalidades de autenticação, controle de usuários e acesso a conteúdos como módulos e aulas.

---

## Funcionalidades Principais

### Autenticação de Usuários:
- Registra novos usuários com criptografia de senhas.
- Faz login de usuários e retorna um token JWT para autenticação em requisições subsequentes.
- Protege rotas privadas com verificação de token.

### Controle de Acesso:
- Usuários logados podem acessar rotas privadas.
- Usuários não logados são redirecionados para a tela de login.
- Permite que apenas usuários autenticados acessem conteúdos como módulos e aulas.

### Rotas Implementadas:
- **POST `/auth/login`**: Rota de login, que retorna um token JWT.
- **POST `/auth/register`**: Rota de registro de um novo usuário.
- **GET `/dashboard`**: Rota protegida, retorna dados privados para o usuário logado.
- **GET `/modulos/:id`**: Rota para exibir as aulas de um módulo específico, com verificação de autenticação.
- **GET `/profile`**: Rota para obter informações do perfil do usuário autenticado.

---

## Estrutura de Pastas

O projeto segue uma **arquitetura modularizada**, onde cada pasta representa uma camada ou funcionalidade específica:

<pre>
<code>
/config               # Arquivos de configuração (ex: banco de dados, JWT)
/controllers          # Funções responsáveis por lidar com as requisições HTTP
/models               # Modelos do Sequelize (usuários, módulos, aulas)
/routes               # Arquivos de definição de rotas
/services             # Lógica de negócio (ex: autenticação, manipulação de dados)
/middlewares          # Middlewares para autenticação, validação, etc.
/utils                # Funções utilitárias
/server.js            # Ponto de entrada do servidor Express
.env                  # Variáveis de ambiente
.gitignore            # Arquivos e pastas ignorados pelo Git
package.json          # Dependências do projeto
package-lock.json     # Controle de versões das dependências
</code>
</pre>

---

## Configuração do Banco de Dados

- O banco de dados utilizado é o **MySQL**.
- As tabelas são gerenciadas pelo **Sequelize ORM**, e o esquema inclui tabelas como `users`, `modules`, `lessons`, etc.

---

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. Clone este repositório:

<pre>
<code>
git clone https://github.com/felipebpassos/members-area-backend.git
</code>
</pre>

2. Acesse o diretório do projeto:

<pre>
<code>
cd members-area-backend
</code>
</pre>

3. Instale as dependências:

<pre>
<code>
npm install
</code>
</pre>

4. Crie um arquivo `.env` com as variáveis de ambiente necessárias (exemplo: banco de dados, JWT secret):

<pre>
<code>
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=members_area
JWT_SECRET=your_jwt_secret
</code>
</pre>

5. Inicie o servidor de desenvolvimento:

<pre>
<code>
npm run dev
</code>
</pre>

O servidor será iniciado na porta 3000 por padrão.

---

## Próximos Passos

- Concluir a implementação de mais rotas e funcionalidades relacionadas a módulos e aulas.
- Realizar a integração com o frontend para substituir dados estáticos por dados dinâmicos da API.
- Implementar testes automatizados para as rotas da API e autenticação.
