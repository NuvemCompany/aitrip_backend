# Aitrip Backend

Aitrip Backend is an application for trip planning with AI integration, created with NestJS and Prisma. This project provides features for authentication, user preferences management, and integration with various services.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js v14 or higher
- Yarn or npm
- MySQL Database

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/aitrip-backend.git
    cd aitrip-backend
    ```

2. Install the dependencies:
    ```bash
    yarn install
    # or
    npm install
    ```

## Configuration

1. Copy the `.env.example` file to `.env` and configure the necessary environment variables:
    ```bash
    cp .env.example .env
    ```

2. Configure the database URL in the `.env` file:
    ```env
    DATABASE_URL=mysql://username:password@localhost:3306/aitrip
    ```

## Available Scripts

- **Start the application:**
    ```bash
    yarn start
    # or
    npm start
    ```

- **Start the application in development mode:**
    ```bash
    yarn start:dev
    # or
    npm run start:dev
    ```

- **Run Prisma migrations:**
    ```bash
    npx prisma migrate dev
    ```

- **Generate Prisma client:**
    ```bash
    npx prisma generate
    ```

- **Run tests:**
    ```bash
    yarn test
    # or
    npm test
    ```

## Project Structure

```plaintext
src/
├── app.module.ts                 # Root module of the application
├── auth/                         # Authentication module
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── ...
├── common/                       # Common module with utilities, guards, and decorators
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   │   └── user.decorator.ts
│   ├── enums/
│   │   └── role.enum.ts
│   └── guards/
│       ├── auth.guard.ts
│       └── role.guard.ts
├── prisma/                       # Prisma configuration
│   ├── prisma.service.ts
│   └── schema.prisma
├── preferences/                  # Preferences module
│   ├── dto/
│   │   ├── create-preference.dto.ts
│   │   └── update-preference.dto.ts
│   ├── entities/
│   │   └── preference.entity.ts
│   ├── preferences.controller.ts
│   ├── preferences.module.ts
│   ├── preferences.service.ts
│   └── repositories/
│       └── preferences.repository.ts
├── users/                        # Users module
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   └── repositories/
│       └── users.repository.ts
└── main.ts                       # Application entry file
```

## Usage

### Authentication

1. **User registration:**
    - Method: POST
    - URL: `/auth/register`
    - Payload:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password",
      "confirm_password": "password"
    }
    ```

2. **User login:**
    - Method: POST
    - URL: `/auth/login`
    - Payload:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password"
    }
    ```

### Preferences Management

1. **Create preference:**
    - Method: POST
    - URL: `/preferences`
    - Headers: `Authorization: Bearer YOUR_ACCESS_TOKEN`
    - Payload:
    ```json
    {
      "type": "activity",
      "value": "cultural"
    }
    ```

2. **List user preferences:**
    - Method: GET
    - URL: `/preferences`
    - Headers: `Authorization: Bearer YOUR_ACCESS_TOKEN`

3. **Update preference:**
    - Method: PATCH
    - URL: `/preferences/:id`
    - Headers: `Authorization: Bearer YOUR_ACCESS_TOKEN`
    - Payload:
    ```json
    {
      "type": "activity",
      "value": "outdoor"
    }
    ```

4. **Delete preference:**
    - Method: DELETE
    - URL: `/preferences/:id`
    - Headers: `Authorization: Bearer YOUR_ACCESS_TOKEN`

## Endpoints

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: User login

### Users

- `GET /users`: List all users (example of a protected endpoint)
- `GET /users/:id`: Get details of a specific user

### Preferences

- `POST /preferences`: Create a new preference
- `GET /preferences`: List all preferences of the authenticated user
- `GET /preferences/:id`: Get details of a specific preference of the authenticated user
- `PATCH /preferences/:id`: Update a preference of the authenticated user
- `DELETE /preferences/:id`: Delete a preference of the authenticated user

## Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
