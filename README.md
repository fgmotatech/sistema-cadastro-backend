# Sistema de Cadastro — Backend

API REST para cadastro, autenticação e gerenciamento de usuários, construída com Node.js, Express e MySQL.

**Frontend deste projeto:** [sistema-cadastro-frontend](https://github.com/fgmotatech/sistema-cadastro-frontend)
**Demo:** [crud-cadastro-frontend.netlify.app](https://crud-cadastro-frontend.netlify.app/)

> ⚠️ O servidor está hospedado no plano gratuito do Render e pode levar até **50 segundos** para responder à primeira requisição após um período de inatividade.

## Tecnologias

- Node.js + Express 5
- MySQL (via `mysql2`)
- JWT (`jsonwebtoken`) para autenticação
- `bcrypt` para hash de senhas
- `helmet` para headers de segurança
- `express-rate-limit` para limitar tentativas de login
- `cors` para controle de origem das requisições
- `dotenv` para variáveis de ambiente

## Estrutura do projeto

```
├── controllers/
│   ├── authController.js       # lógica de login
│   └── usuarioController.js    # cadastro, dados do usuário, exclusão
├── db/
│   ├── db.js                   # pool de conexão MySQL
│   └── usuarios.js             # queries de acesso a dados
├── middleware/
│   └── authMiddleware.js       # validação do token JWT
├── routes/
│   ├── authRoutes.js
│   └── usuarioRoutes.js
├── utils/
│   └── token.js                # geração/verificação de JWT
├── validators/
│   └── usuarioValidator.js     # validação dos dados de cadastro
└── server.js                   # ponto de entrada da aplicação
```

## Como executar localmente

1. Clone o repositório e instale as dependências:

   ```bash
   git clone https://github.com/fgmotatech/sistema-cadastro-backend.git
   cd sistema-cadastro-backend
   npm install
   ```

2. Crie um arquivo `.env` na raiz com as seguintes variáveis:

   ```env
   JWT_SECRET=sua-chave-secreta
   DB_HOST=localhost
   DB_USER=seu-usuario
   DB_PASSWORD=sua-senha
   DB_NAME=nome-do-banco
   DB_PORT=3306
   ```

3. Inicie o servidor:

   ```bash
   node server.js
   ```

   O servidor sobe em `http://localhost:5000`.

## Rotas da API

| Método | Rota          | Autenticação | Descrição                          |
| ------ | ------------- | ------------ | ----------------------------------- |
| POST   | `/usuario`    | Não          | Cadastra um novo usuário            |
| POST   | `/login`      | Não          | Autentica e retorna um token JWT    |
| GET    | `/usuario/me` | Sim (Bearer) | Retorna os dados do usuário logado  |
| DELETE | `/usuario/me` | Sim (Bearer) | Exclui a conta do usuário logado    |

### Exemplo — Cadastro

```http
POST /usuario
Content-Type: application/json

{
  "nomeCompleto": "Maria Silva",
  "celular": "11987654321",
  "email": "maria@exemplo.com",
  "senha": "SenhaForte1!"
}
```

### Exemplo — Login

```http
POST /login
Content-Type: application/json

{
  "email": "maria@exemplo.com",
  "senha": "SenhaForte1!"
}
```

Resposta:

```json
{
  "mensagem": "Login realizado com sucesso.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { "id": "...", "nome": "Maria Silva", "email": "maria@exemplo.com" }
}
```

## Segurança

- Senhas armazenadas com hash `bcrypt`
- Tokens JWT com expiração de 2 horas
- Rate limiting de 5 tentativas de login a cada 15 minutos por IP
- Headers de segurança via `helmet`
- Validação de dados de entrada em todas as rotas de escrita

## Próximos passos

- [ ] Adicionar testes automatizados
- [ ] Adicionar documentação via Swagger/OpenAPI
- [ ] Adicionar paginação/listagem de usuários (admin)