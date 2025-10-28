<h1 align="center">💬ComunicaIn</h1>
<p align="center">
  <strong>RESTful API</strong> developed with <strong>Node.js</strong>, using <strong>Express</strong> as the framework, <strong>Prisma ORM</strong> for managing the <strong>PostgreSQL</strong> database, and containerized using <strong>Docker Compose</strong>. This guide provides detailed instructions for setup, running the app, available routes, and running tests.
</p>

<h3 align="center">🔍 Additional Information</h3>
<p align="center">
  <a href="https://github.com/FerreiraWalter/comunicain/blob/main/GOOD_PRACTICES.md">Best Practices</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/FerreiraWalter/comunicain/blob/main/ARCHITECTURAL_DESIGN.md">Application Architecture</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/FerreiraWalter/comunicain/blob/main/API_DECISIONS.md">Decisions Made</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/FerreiraWalter/comunicain/blob/main/NEXT_STEPS.md">Next Steps</a>
</p>

## Prerequisites

Before starting, make sure you have the following tools installed:

- Node.js (version 18.x or higher)
- Docker
- Docker Compose

---

## Starting the Application

### Steps to Run:

1. **Clone the Repository**: Clone this repository to your local machine:

    ```bash
    git clone https://github.com/FerreiraWalter/comunicain.git
    cd comunicain
    ```

    Then run:

    ```bash
    npm install
    ```

    to install all dependencies.

2. **Start Containers with Docker Compose**: From the project directory, start the app with Docker Compose. This will build and run all required containers (Node.js app and PostgreSQL).

    ```bash
    docker compose up
    ```

---

## Available Routes

### 1. **Login Route**

#### **POST** `/auth/login`

- **Description**: Authenticates the user and returns a JWT token.  
- **Parameters**:
  - `username`: admin
  - `password`: admin  
- **Example**:

    ```bash
    curl -X POST http://localhost:3000/auth/login \
      -H 'Content-Type: application/json' \
      -d '{"username": "admin", "password": "admin"}'
    ```

> **Note**: The JWT token returned from login should be used in the `Authorization` header for protected routes (`/users`, `/external-api`).

---

### 2. **User Routes**

#### **GET** `/users`

- **Description**: Returns all active users.  
- **Example**:

    ```bash
    curl -X GET http://localhost:3000/users \
      -H 'authorization: Bearer <your_jwt_token>'
    ```

#### **GET** `/users/:id`

- **Description**: Returns a specific user by ID.  
- **Parameters**:
  - `id` (string): User ID  
- **Example**:

    ```bash
    curl -X GET http://localhost:3000/users/12345 \
      -H 'authorization: Bearer <your_jwt_token>'
    ```

#### **POST** `/users`

- **Description**: Creates a new user.  
- **Parameters**:
  - `name` (string): User name (minimum 2 characters)
  - `email` (string): Valid email
  - `bio` (string | optional): Valid bio  
- **Example**:

    ```bash
    curl -X POST http://localhost:3000/users \
      -H 'Content-Type: application/json' \
      -H 'authorization: Bearer <your_jwt_token>' \
      -d '{"name": "John Doe", "email": "john@example.com"}'
    ```

#### **PUT** `/users/:id`

- **Description**: Updates an existing user.  
- **Parameters**:
  - `name` (string): User name (minimum 2 characters)
  - `email` (string): Valid email
  - `bio` (string | optional): Valid bio  
- **Example**:

    ```bash
    curl -X PUT http://localhost:3000/users/12345 \
      -H 'Content-Type: application/json' \
      -H 'authorization: Bearer <your_jwt_token>' \
      -d '{"name": "Jane Doe"}'
    ```

#### **DELETE** `/users/:id`

- **Description**: Deactivates a user instead of permanently deleting them.  
- **Parameters**:
  - `id` (string): User ID  
- **Example**:

    ```bash
    curl -X DELETE http://localhost:3000/users/12345 \
      -H 'authorization: Bearer <your_jwt_token>'
    ```

---

### 3. **External API Routes**

#### **POST** `/external-api/data`

- **Description**: Requests data from an external API (OpenWeatherMap) and returns weather information.  
- **Example**:

    ```bash
    curl -X POST http://localhost:3000/external-api/data \
      -H 'authorization: Bearer <your_jwt_token>' \
      -H 'Content-Type: application/json' \
      -d '{
        "url": "https://api.openweathermap.org/data/2.5",
        "path": "/weather",
        "headers": {},
        "httpMethod": "GET",
        "body": {},
        "params": { "lat": "-10.9472", "lon": "-37.0731", "appid": "6640af658c4d4b9ebd7746b69b1d75df" },
        "query": {}
      }'
    ```

---

## Running Tests

The application uses **Jest**.

### Steps to Run Tests

1. **Install Dependencies** (if not already done):

    ```bash
    npm install
    npx prisma migrate
    ```

2. **Run Tests**: Execute all unit and integration tests with:

    ```bash
    npm run test
    ```
