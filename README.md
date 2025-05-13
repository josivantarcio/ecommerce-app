# E-commerce Application

A modern full-stack e-commerce platform built with Spring Boot (Java 21) and React. Features secure authentication with JWT, PostgreSQL database, and Material-UI components. The application follows REST API principles and implements best practices for security and scalability.

## Backend (Spring Boot)

### Prerequisites
- Java 21
- Maven
- PostgreSQL

### Setup
1. Create a PostgreSQL database named `ecommerce`
2. Update the database credentials in `api/src/main/resources/application.yml` if needed
3. Navigate to the `api` directory
4. Run the application:
```bash
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080/api`

## Frontend (React)

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup
1. Navigate to the `frontend` directory
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Features
- User authentication (login/register)
- JWT-based security
- Protected routes
- Material-UI components
- Redux state management

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

## Security
- JWT token-based authentication
- Password encryption
- Protected API endpoints

## Development
- Backend: Spring Boot 3.2.3
- Frontend: React with TypeScript
- Database: PostgreSQL
- Authentication: JWT
- UI Framework: Material-UI

## Estrutura do Projeto

O projeto está dividido em duas principais pastas:

- **`frontend`**: Contém o código para o frontend do aplicativo, desenvolvido com React.
- **`backend`**: Contém o código para o backend do aplicativo, desenvolvido com Node.js e Express.

## Instalação

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em sua máquina. Você pode verificar se já os tem com os seguintes comandos:

```bash
node -v
npm -v
```

### Configuração do Frontend

1. Navegue até a pasta `frontend`:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```

   O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

### Configuração do Backend

1. Navegue até a pasta `backend`:

    ```bash
    cd backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicie o servidor:

    ```bash
    npm start
    ```

   O backend estará disponível em [http://localhost:5000](http://localhost:5000) (ou em outra porta se configurada).

## Funcionalidades

- **Frontend**: Interface de usuário responsiva e intuitiva para navegação de produtos, adição ao carrinho e finalização da compra.
- **Backend**: APIs RESTful para gerenciamento de produtos, carrinho de compras e processamento de pedidos.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para este projeto, por favor, siga estes passos:

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b minha-nova-funcionalidade`).
3. Faça suas alterações e commit (`git commit -am 'Adiciona nova funcionalidade'`).
4. Envie para o repositório remoto (`git push origin minha-nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue no repositório ou entrar em contato diretamente.

---

Obrigado por usar o **Ecommerce App**!
---
