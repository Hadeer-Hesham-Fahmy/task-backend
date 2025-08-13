<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A production-ready <a href="http://nodejs.org" target="_blank">Node.js</a> backend built with <a href="https://nestjs.com/" target="_blank">NestJS</a>, featuring Redis, AWS SES, LogDna, and comprehensive JWT authentication (access & refresh tokens) with Passport.
</p>

## Key Features

- **Redis** for high-performance caching  
- **AWS SES** integration for reliable email delivery  
- **LogDna** logging for structured, real-time monitoring  
- **JWT Authentication** (access & refresh) using Passport  
- **Role-Based Access Control (RBAC)** ensuring fine-grained permissions for managers and users  
- Fully documented **API** with Swagger for easy testing and developer onboarding
- **Postman Collection** provided for seamless testing and integration of all endpoints
- **Task Dependencies**: tasks cannot be completed until all dependencies are resolved  
- **Advanced Filtering & Pagination**: filter tasks by status, priority, due date, assignee
- **Scalable Architecture**: supports multiple managers and allows tasks to be assigned to multiple users concurrently
- **Error Handling & Validation**: robust input validation and consistent API error responses  
- **Containerization Support**: ready for Docker deployment and scalable architecture 

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

- Create a `.env` file in the project root.  
- Populate it according to the `.env.example` provided, replacing variables as needed.  

4. **Start Redis**

Ensure Redis is running locally or update the `.env` with your Redis server configuration.  

5. **Run the application**

```bash
# Start in development mode
npm run start

# Start in watch mode (auto-reload)
npm run start:dev

# Start in production mode
npm run start:prod
```

## API Access

- **Swagger UI:** [http://localhost:3000/task-backend/docs#/](http://localhost:3000/task-backend/docs#/)  
- **Postman:** Import the `swagger.json` file located in the project root for immediate access.  

---

This system is built with maintainability, scalability, and security in mind, following professional engineering standards.
