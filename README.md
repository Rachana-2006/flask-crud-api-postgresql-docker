# flask-crud-api-postgresql-docker
A Flask-based REST API project for managing users with CRUD (Create, Read, Update, Delete) operations. The project uses Flask and SQLAlchemy for backend development and database management, providing API endpoints to create, retrieve, update, and delete user information.

# Flask CRUD REST API with PostgreSQL, Docker & Docker Compose

A simple **CRUD REST API** built using **Python Flask, Flask-SQLAlchemy, PostgreSQL, Docker, and Docker Compose**.

This project demonstrates how to build, containerize, run, and test a REST API connected to a PostgreSQL database.

The project is based on the following tutorial/video:

**Video:** [Build a CRUD REST API in Python using Flask, SQLAlchemy, Postgres, Docker and Docker Compose](https://youtube.com/live/fHQWTsWqBdE)

---

## 📌 Features

This project provides the following CRUD operations for users:

* Create a user
* Get all users
* Get a user by ID
* Update a user
* Delete a user

### Technologies Used

* **Python**
* **Flask**
* **Flask-SQLAlchemy**
* **PostgreSQL**
* **Docker**
* **Docker Compose**
* **Postman**
* **TablePlus** (optional, for viewing the database)

---

## 🏗️ Project Architecture

The application contains two Docker services:

```text
                    ┌─────────────────────┐
                    │      Postman        │
                    │   API Testing Tool  │
                    └──────────┬──────────┘
                               │
                               │ HTTP
                               ▼
                    ┌─────────────────────┐
                    │     Flask API       │
                    │      Port 4000      │
                    │                     │
                    │ Flask + SQLAlchemy  │
                    └──────────┬──────────┘
                               │
                               │ Database Connection
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Port 5432      │
                    │                     │
                    │       users         │
                    │       table         │
                    └─────────────────────┘
```

Docker Compose manages both the Flask application and PostgreSQL database containers.

---

# 🚀 Getting Started

Follow the steps below to run this project on your local machine.

## 1. Prerequisites

Before running the project, install:

* Git
* Docker Desktop
* Postman (for API testing)
* TablePlus (optional, for database testing)

Make sure Docker Desktop is running before executing the Docker commands.

---

# 2. Clone the Repository

Open your terminal or PowerShell and run:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

For example:

```bash
git clone https://github.com/YOUR_USERNAME/flask-crud-api.git
```

Move into the project directory:

```bash
cd flask-crud-api
```

---

# 3. Check the Project Files

The project should contain:

```text
flask-crud-api/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

# 4. Start PostgreSQL

Run the PostgreSQL container:

```bash
docker compose up -d flask_db
```

The `-d` option runs the container in detached mode.

Check the running containers:

```bash
docker compose ps
```

You should see the PostgreSQL container running.

You can also check the logs:

```bash
docker compose logs flask_db
```

Look for a message indicating that PostgreSQL is ready to accept connections.

---

# 5. PostgreSQL Database Configuration

The PostgreSQL container uses the following configuration:

```text
Host: localhost
Port: 5432
Username: postgres
Password: postgres
Database: postgres
```

The database is stored using a Docker volume so that the PostgreSQL data can persist.

The PostgreSQL service is defined in `docker-compose.yml`.

---

# 6. Optional: Connect Using TablePlus

You can use TablePlus to check the PostgreSQL database.

Create a PostgreSQL connection with:

```text
Host: localhost
Port: 5432
User: postgres
Password: postgres
Database: postgres
```

Test the connection.

If the connection is successful, PostgreSQL is running correctly.

> TablePlus is optional. You do not need TablePlus to run the Flask API.

---

# 7. Build the Flask Docker Image

From the project directory, run:

```bash
docker compose build
```

This command builds the Flask application Docker image using the `Dockerfile`.

You can check the available Docker images using:

```bash
docker images
```

---

# 8. Start the Flask Application

Run:

```bash
docker compose up -d flask_app
```

You can check the containers using:

```bash
docker compose ps
```

You should have both services running:

```text
flask_app
flask_db
```

---

# 9. Check Flask Application

The Flask application runs on:

```text
http://localhost:4000
```

The test endpoint is:

```text
GET http://localhost:4000/test
```

Open the URL in your browser or test it using Postman.

Expected response:

```json
{
    "message": "test route"
}
```

If you receive this response, the Flask application is running successfully.

---

# 🔄 CRUD API Endpoints

The application provides the following endpoints.

| Operation     | HTTP Method | Endpoint      |
| ------------- | ----------- | ------------- |
| Test API      | GET         | `/test`       |
| Create User   | POST        | `/users`      |
| Get All Users | GET         | `/users`      |
| Get User      | GET         | `/users/<id>` |
| Update User   | PUT         | `/users/<id>` |
| Delete User   | DELETE      | `/users/<id>` |

The complete base URL is:

```text
http://localhost:4000
```

---

# 📝 1. Test API

### Request

```http
GET http://localhost:4000/test
```

### Expected Response

```json
{
    "message": "test route"
}
```

---

# 📝 2. Create a User

### Request

```http
POST http://localhost:4000/users
```

In Postman select:

```text
Body
→ raw
→ JSON
```

Example request body:

```json
{
    "username": "ramya",
    "email": "ramya@example.com"
}
```

Click **Send**.

A new user will be stored in PostgreSQL.

You can create multiple users by sending different requests.

---

# 📝 3. Get All Users

### Request

```http
GET http://localhost:4000/users
```

This returns all users stored in the PostgreSQL database.

Example:

```json
[
    {
        "id": 1,
        "username": "ramya",
        "email": "ramya@example.com"
    }
]
```

---

# 📝 4. Get a Specific User

To retrieve one user, provide the user's ID.

### Request

```http
GET http://localhost:4000/users/1
```

Replace `1` with the required user ID.

Example:

```json
{
    "id": 1,
    "username": "abc",
    "email": "abc@example.com"
}
```

---

# 📝 5. Update a User

To update an existing user:

### Request

```http
PUT http://localhost:4000/users/1
```

In Postman:

```text
Body
→ raw
→ JSON
```

Example:

```json
{
    "username": "abc_updated",
    "email": "abc_updated@example.com"
}
```

Click **Send**.

The selected user's information will be updated.

You can verify the update using:

```http
GET http://localhost:4000/users/1
```

---

# 📝 6. Delete a User

To delete a user:

### Request

```http
DELETE http://localhost:4000/users/1
```

Replace `1` with the ID of the user you want to delete.

After deleting the user, verify it using:

```http
GET http://localhost:4000/users
```

The deleted user should no longer appear in the list.

---

# 🐳 Docker Commands

### Start all services

```bash
docker compose up -d
```

### Start only PostgreSQL

```bash
docker compose up -d flask_db
```

### Start only Flask

```bash
docker compose up -d flask_app
```

### Build the application

```bash
docker compose build
```

### Check running containers

```bash
docker compose ps
```

### View application logs

```bash
docker compose logs flask_app
```

### View PostgreSQL logs

```bash
docker compose logs flask_db
```

### Stop the containers

```bash
docker compose down
```

---

# 🗄️ Database Persistence

PostgreSQL uses a Docker volume:

```text
pgdata
```

This volume stores the PostgreSQL database data outside the temporary container filesystem.

Therefore, removing and recreating the containers does not automatically remove the stored database data.

To remove the containers **and** database volume:

```bash
docker compose down -v
```

> ⚠️ Use `docker compose down -v` carefully because it removes the PostgreSQL volume and therefore deletes the stored database data.

---

# 🔧 Environment Configuration

The Flask application connects to PostgreSQL using the `DB_URL` environment variable.

Inside Docker Compose, the database connection uses the PostgreSQL service name:

```text
flask_db
```

The connection follows this format:

```text
postgresql://postgres:postgres@flask_db:5432/postgres
```

Important:

Inside Docker, use:

```text
flask_db
```

instead of:

```text
localhost
```

because the Flask container communicates with the PostgreSQL container through the Docker network.

---

# 📂 Project Structure

```text
flask-crud-api/
│
├── app.py                 # Flask application and API endpoints
│
├── requirements.txt       # Python dependencies
│
├── Dockerfile             # Instructions to build Flask Docker image
│
├── docker-compose.yml     # Flask + PostgreSQL services
│
└── README.md              # Project documentation
```

---

# 📦 Python Dependencies

The project uses:

```text
Flask
Flask-SQLAlchemy
psycopg2-binary
```

The dependencies are listed in:

```text
requirements.txt
```

Docker installs them automatically while building the Flask image.

---

# 🔍 How the Application Works

The flow of the application is:

```text
Client / Postman
       │
       ▼
Flask REST API
       │
       ▼
Flask-SQLAlchemy
       │
       ▼
PostgreSQL
       │
       ▼
Users Table
```

### Create

```text
POST /users
```

Creates a new user.

### Read

```text
GET /users
GET /users/<id>
```

Retrieves users.

### Update

```text
PUT /users/<id>
```

Updates an existing user.

### Delete

```text
DELETE /users/<id>
```

Deletes a user.

---

# 🧪 Testing

The API can be tested using **Postman**.

Recommended testing order:

```text
1. GET /test

2. POST /users
   Create user

3. POST /users
   Create another user

4. GET /users
   Check all users

5. GET /users/1
   Check one user

6. PUT /users/1
   Update user

7. GET /users/1
   Verify update

8. DELETE /users/1
   Delete user

9. GET /users
   Verify deletion
```

---

# 🛠️ Troubleshooting

## Docker is not running

If you see an error similar to:

```text
failed to connect to the docker API
```

make sure **Docker Desktop is running** and then try:

```bash
docker compose ps
```

---

## Check whether containers are running

Run:

```bash
docker compose ps
```

You should see:

```text
flask_app
flask_db
```

with a running status.

---

## Check Flask logs

If the API is not responding:

```bash
docker compose logs flask_app
```

---

## Check PostgreSQL logs

If Flask cannot connect to the database:

```bash
docker compose logs flask_db
```

---

## Restart the project

You can restart everything with:

```bash
docker compose down
docker compose up -d
```

---

# 🎥 Tutorial

This project follows the concepts demonstrated in the original tutorial:

**Build a CRUD REST API in Python using Flask, SQLAlchemy, Postgres, Docker and Docker Compose**

https://youtube.com/live/fHQWTsWqBdE

The original tutorial covers Flask, SQLAlchemy, PostgreSQL, Docker, Docker Compose, TablePlus and Postman.

---

# 📚 What I Learned

Through this project, I practiced:

* Building REST APIs using Flask
* CRUD operations
* Connecting Flask with PostgreSQL
* Using Flask-SQLAlchemy
* Writing a Dockerfile
* Creating multiple services using Docker Compose
* Connecting containers using Docker networking
* Using Docker volumes for database persistence
* Testing APIs using Postman
* Checking PostgreSQL using TablePlus
* Understanding the relationship between an API and a database

---

# ⭐ Acknowledgements

This project was created by following and learning from the tutorial by **Francesco Ciulla**.

Original tutorial:

https://youtube.com/live/fHQWTsWqBdE

If this project helped you understand Flask, PostgreSQL and Docker, consider giving the repository a ⭐.
