# Todo

This project is a simple Todo application built with Spring Boot for the backend and Next.js for the frontend. The application allows users to create, read, update, and delete todos.

# Features

### Spring Boot Backend

- RESTful API for managing projects and todos
- CRUD operations for projects and todos
- Mark todos as complete
- PostgreSQL

# Capabilities

### The application supports the following capabilities:

#### 1. Create a New Project

- Users can create new projects to organize their todos.

#### 2. Manage Todos Within a Project

- **_Add_**: Create new todos within a project.
- **_Edit_**: Modify the details of existing todos.
- **_Update_**: Change the status or other attributes of todos.
- **_Mark as Complete_**: Mark todos as complete when they are done.

### Next.js Frontend

- Responsive UI for interacting with the todo API
- Create, view, and manage projects
- Add, edit, update, and mark todos as complete within a project

#### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine.

#### Clone the Repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

#### Build and Run with Docker Compose

To build and run the application using Docker Compose, use the following commands:

```bash
docker-compose up --build
```

## Development

If you want to run the backend or frontend separately for development purposes, follow these steps:

#### Prerequisites

- [Node.js](https://nodejs.org/) (for Next.js build and development).
- [Java](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (for Spring Boot build and development)

### Backend (Spring Boot)

1. Navigate to the Frontend Directory:

```bash
cd backend
```

2. Change the DB Credential in application.yml

3. Run the Server:

```bash
mvn spring-boot:run
```

### Frontend (Next.js)

1. Navigate to the Frontend Directory:

```bash
cd frontend
```

2. Install Dependencies:

```bash
npm install
```

3. Run the Development Server:

```bash
npm run dev
```
