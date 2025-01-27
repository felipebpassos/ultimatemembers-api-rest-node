# Ultimate Members (backend)

![Interface da API](https://github.com/felipebpassos/felipebpassos/blob/main/print-api.png?raw=true)

👉 [Live Link](https://members-area-react-ts-tailwind.vercel.app/)

📚 [API (Swagger UI)](https://ultimatemembers-api-rest-node.onrender.com/api/v1.0/api-docs/)

Veja também: [Frontend](https://github.com/felipebpassos/members-area-react-ts-tailwind)

## Descrição do Projeto

Este é o projeto backend de **Área de Membros para Cursos Online** desenvolvido com as seguintes tecnologias:
- **Node.js** com **Express** para a construção da API;
- **Sequelize** para ORM e interação com banco de dados MySQL;
- **JWT (JSON Web Tokens)** para autenticação de usuários;
- **bcrypt.js** para criptografia de senhas;
- **dotenv** para gerenciamento de variáveis de ambiente;
- **Swagger** para documentação e uso interativo da API.

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

#### Auth
Gerenciamento de login, registro e autenticação

- **POST** `/api/v1.0/auth/register`: Cadastro de novo usuário (somente administradores)
- **POST** `/api/v1.0/auth/login`: Login de usuário
- **GET** `/api/v1.0/auth/validate-token`: Validação do token JWT

#### Banners
Gerenciamento de banners

- **POST** `/api/v1.0/banners`: Criar um novo banner (Somente administradores)
- **GET** `/api/v1.0/banners`: Obter todos os banners
- **PUT** `/api/v1.0/banners/{id}`: Atualizar um banner existente (Somente administradores)
- **DELETE** `/api/v1.0/banners/{id}`: Deletar um banner (Somente administradores)

#### Lessons
Gerenciamento de aulas

- **POST** `/api/v1.0/lessons`: Criar uma nova aula (Somente administradores)
- **PUT** `/api/v1.0/lessons/{id}`: Atualizar uma aula existente (Somente administradores)
- **DELETE** `/api/v1.0/lessons/{id}`: Deletar uma aula (Somente administradores)

#### Modules
Gerenciamento de módulos e aulas associadas

- **POST** `/api/v1.0/modules`: Criar um novo módulo (somente administradores)
- **GET** `/api/v1.0/modules`: Obter todos os módulos
- **PUT** `/api/v1.0/modules/{id}`: Atualizar um módulo existente (somente administradores)
- **DELETE** `/api/v1.0/modules/{id}`: Deletar um módulo (somente administradores)
- **GET** `/api/v1.0/modules/{id}/lessons`: Obter aulas de um módulo específico

#### Users
Gerenciamento de usuários

- **GET** `/api/v1.0/users/profile`: Obter perfil do usuário autenticado
- **PUT** `/api/v1.0/users/profile`: Atualizar dados de um usuário (somente administradores)
- **GET** `/api/v1.0/users/`: Obter usuários paginados (somente administradores)
- **DELETE** `/api/v1.0/users/{uuid}`: Deletar um usuário (somente administradores)

---

## Swagger

A documentação interativa da API foi gerada utilizando o **Swagger**. Você pode acessar a documentação da API em [https://ultimatemembers-api-rest-node.onrender.com/api/v1.0/api-docs/](https://ultimatemembers-api-rest-node.onrender.com/api/v1.0/api-docs/) após iniciar o servidor.

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
/middleware           # Middlewares para autenticação, validação, etc.
/utils                # Funções utilitárias
index.js              # Ponto de entrada do servidor Express
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
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=members_area
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=expiration_time
</code>
</pre>

5. Inicie o servidor de desenvolvimento:

<pre>
<code>
node index.js
</code>
</pre>

O servidor será iniciado na porta 3000 por padrão.

---

## Próximos Passos

- Implementar a edição de dados no frontend em painel administrativo, com ações para adicionar, editar ou remover módulos e aulas.
- Continuar o desenvolvimento de novas funcionalidades como: integração com marketplaces (Kiwify, Hotmart), salvar progresso, download de arquivos, multitenancy com whitelabel, comunidade, gameficação e etc.
- Adicionar testes para validar o fluxo da aplicação.
