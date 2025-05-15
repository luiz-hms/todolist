# 📋 TodoList Fullstack App (Laravel + Next.js)

Este é um projeto fullstack desenvolvido com **Laravel 10 (PHP)** no backend e **Next.js (React + TypeScript)** no frontend. A API foi desenvolvida utilizando **JWT para autenticação**, com funcionalidades completas de gerenciamento de **Usuários, Todos e Tasks**. O banco de dados utilizado é **MySQL** e todo o ambiente local pode ser executado com **Laragon**.

---

## 🚀 Funcionalidades da API

| #  | Endpoint | Método | Descrição |
|----|----------|--------|-----------|
| 1. | `/api/register` | `POST` | Registrar novo usuário |
| 2. | `/api/login` | `POST` | Login do usuário |
| 3. | `/api/me` | `GET` | Retorna o usuário autenticado |
| 4. | `/api/refresh` | `POST` | Atualiza o token JWT |
| 5. | `/api/logout` | `POST` | Logout do usuário |
| 6. | `/api/todos` | `POST` | Criar uma nova Todo |
| 7. | `/api/todos` | `GET` | Listar todas as Todos do usuário |
| 8. | `/api/todos/{id}` | `PUT` | Atualizar uma Todo |
| 9. | `/api/todos/{id}` | `DELETE` | Deletar uma Todo |
| 10. | `/api/todos/{todo_id}/tasks` | `POST` | Criar uma Task para uma Todo |
| 11. | `/api/todos/{todo_id}/tasks` | `GET` | Listar todas as Tasks de uma Todo |
| 12. | `/api/todos/{todo_id}/tasks/{task_id}` | `PUT` | Atualizar uma Task |
| 13. | `/api/todos/{todo_id}/tasks/{task_id}` | `DELETE` | Deletar uma Task |

> ⚠️ **Observação:** a URL base da API gerada pelo Laragon é `http://todoapi.test`.

---

## 🧰 Pré-requisitos

- **Laragon** instalado ([Download aqui](https://laragon.org/download/))
- **PHP** e **Composer**
- **Node.js** e **npm**

---

## ⚙️ Como rodar o projeto

### 🔧 Backend (Laravel 10 + JWT)

#### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repo-backend.git
cd seu-repo-backend
```

#### 2. Instale as dependências
```bash
composer install
```

#### 3. Configure o `.env`
```bash
cp .env.example .env
```

#### 4. Edite o `.env` com suas configurações de banco de dados MySQL do Laragon adicionar no .env o secret gerado e manter JWT_TTL=120 para o token com duração de 2 horas:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_db
DB_USERNAME=root
DB_PASSWORD=
JWT_TTL=120
JWT_SECRET=
```

#### 5. Gere a chave da aplicação e rode as migrations
```bash
php artisan key:generate
php artisan migrate
```

#### 6. Instale e publique o JWT
```bash
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

#### 7. Configure o Virtual Host no Laragon

Vá em **Menu > Apache > sites-enabled** e adicione:
```ini
todoapi.test => C:\laragon\www\seu-repo-backend\public
```

Reinicie o Laragon.

#### 8. Rode o servidor (caso queira usar o artisan)
```bash
php artisan serve
```

Acesse: [http://todoapi.test](http://todoapi.test)

---

### 💻 Frontend (Next.js + TypeScript + Tailwind)

#### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repo-frontend.git
cd seu-repo-frontend
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Configure o `.env.local`
```bash
cp .env.example .env.local
```

#### 4. Adicione a URL da API no arquivo `.env.local`
```ini
NEXT_PUBLIC_API_URL=http://todoapi.test/api
```

#### 5. Rode o projeto
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## ✅ Tecnologias utilizadas

### Backend:
- Laravel 10
- JWT Auth (tymon/jwt-auth)
- MySQL
- Laragon

### Frontend:
- Next.js (React + TypeScript)
- Tailwind CSS v4
- React Hook Form + Zod
- Context API

---

## 📌 Observações

- A autenticação é baseada em **JWT com expiração de 2 horas**
- O frontend consome todos os endpoints protegidos via token
- O sistema de **todos** e **tasks** é individual por usuário
- O ambiente de desenvolvimento foi projetado para ser simples e intuitivo com Laragon

---

## 🤝 Contribuições

Sinta-se à vontade para abrir issues, enviar PRs ou sugerir melhorias!
