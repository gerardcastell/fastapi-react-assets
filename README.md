# Financial Assets Manager

This is a full-stack web application for managing financial assets and calculating average interest rates. Built with FastAPI (Python) backend and React (TypeScript) frontend, showcasing clean architecture principles and comprehensive testing strategies.

## 🏗️ Architecture Overview

### Backend Architecture (Clean Architecture + DDD)

The backend follows **Clean Architecture** principles with **Domain-Driven Design** patterns:

```
backend/app/
├── contexts/           # Bounded contexts (Assets, Health, Shared)
│   ├── assets/         # Assets domain context
│   │   ├── domain/     # Core business logic
│   │   │   ├── entities/     # Domain entities (Asset, AssetsList)
│   │   │   ├── repositories/ # Repository interfaces
│   │   │   └── services/     # Domain services
│   │   ├── application/      # Use cases/application services
│   │   ├── infrastructure/   # External concerns (API, persistence)
│   │   └── containers/       # Dependency injection
│   └── shared/         # Shared domain concepts
├── core/               # Application core
│   ├── containers/     # Main DI container
│   └── settings/       # Configuration
└── main.py            # Application entry point
```

### Frontend Architecture (Feature-Based)

The frontend uses a **feature-based architecture** with clear separation of concerns:

```
frontend/src/
├── features/          # Feature modules
│   └── assets/        # Assets feature
│       ├── domain/    # Domain entities and repositories
│       ├── application/ # Application services
│       ├── infrastructure/ # API clients and external integrations
│       └── ui/        # UI components and hooks
├── pages/            # Page components
├── router/           # Routing configuration
└── shared/           # Shared utilities and configurations
```

## 🎯 Core Features

- **Asset Management**: Create and manage financial assets with interest rates
- **Average Interest Rate Calculation**: Real-time calculation and display of average interest rates
- **Dynamic Form Management**: Add/remove assets dynamically with validation
- **Real-time Updates**: Frontend automatically refreshes average interest rate after asset creation
- **Comprehensive Validation**: Both client-side and server-side validation with detailed error handling

## 🛠️ Technology Stack

### 🧠 Backend

- **FastAPI** - Modern, fast web framework for building APIs
- **Pydantic** - Data validation and settings management
- **Dependency Injector** - Dependency injection container
- **Python 3.12+** - Modern Python with type hints

### 🎨 Frontend

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - Modern React component library
- **React Hook Form** - Performant forms with easy validation
- **TanStack Query** - Powerful data synchronization for React
- **Zod** - TypeScript-first schema validation
- **Vite** - Fast build tool and dev server

### 📊 Testing Strategy

#### Backend Testing with `pytest`

- **Unit Tests**: Domain logic and services with
- **Integration Tests**: API endpoints with real HTTP requests

#### Frontend Testing with `Cypress`

- **E2E Tests**: Complete user workflows with Cypress

### ✅️ Code Quality with `pre-commit` hooks

- **Linting**: ESLint (frontend) + Ruff & MyPy (backend)
- **Formatting**: Prettier (frontend) + Ruff (backend)
- **Type Checking**: TypeScript + MyPy
- **Pre-commit Hooks**: Automated quality checks

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- uv (Python package manager)

### Backend Setup

```bash
cd backend

# Install dependencies
uv sync

# Run the development server
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd frontend

# Install **dependencies**
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Running Tests

**Backend Tests:**

```bash
cd backend
uv run pytest
```

**Frontend E2E Tests:**

```bash
cd frontend
npm run test:e2e
```

## 🤔 Design Decisions & Reasoning

### 1. Clean Architecture

**What I did:**
I structured the backend following Clean Architecture, splitting it into three main layers: domain, application, and infrastructure. At the first level, you may find the bounded contexts, which are the main areas of the business.

**Why:**

- It makes the project much easier to understand and maintain, each layer has a clear purpose.
- I can test each part independently, using mocks where needed.
- It gives me flexibility to change implementations later (for example, switching from in-memory storage to a real database).
- Most importantly, it keeps the business logic clean and isolated from technical details.

**Trade-offs:**

✅ Great maintainability, testability, and flexibility.

❌ Slightly more boilerplate and complexity at the start.

### 2. Dependency Injection with dependency-injector

**What I did:**
I use the dependency-injector library to manage dependencies throughout the backend app, since I feel very comfortable with the way of work it provides to developers.

**Why:**

- It makes testing much easier, so I can plug in mocks instead of real services.
- There’s a single place to define how everything is wired together.
- It handles lifecycle management cleanly (singletons, factories, etc.).
- It plays nicely with type hints, which improves safety and developer experience.

**Trade-offs:**

✅ Strong testability and clear configuration management.

❌ Requires a bit of setup and some learning to get used to.

### 3. In-Memory Persistence

**What I did:**
For now, data is stored in memory instead of connecting to a real database.

**Why:**

- It keeps things simple, without external dependencies or setup like Docker.
- Perfect for demos and quick local testing.
- Thanks to the repository pattern, I can easily replace it later with a real database.
- It speeds up early development.

**Trade-offs:**

✅ Very fast setup and iteration.

❌ Data disappears on restart, so not suitable for production.

### 4. Screaming Architecture and Feature-Based Frontend Structure

**What I did:**
At first level, I organized the frontend by feature, not by technical layers (like components, hooks, utils, etc.). This is because I want to keep the codebase as simple and easy to understand as possible, and the presentational layer in frontend apps takes more importance than in backend, since the UI represents most of the code in the repo. Although, I end up using clean architecture in the deeper layers of the code, because frontend apps also includes business logic, so it can benefit from it. I personally consider this mix of approaches as a good balance, which is more self-explanatory and easier to understand.

**Why:**

- It scales well, so new features can be added without touching unrelated parts.
- Teams can work in parallel on different features.
- Each feature keeps all its logic and UI together, which is easier to find and modify.
- It leads to a cleaner, more maintainable structure overall.

**Trade-offs:**

✅ Great for scalability and team collaboration.

❌ Can be verbose and complex for small projects.

### 5. React Hook Form + Zod Validation

**What I did:**
I chose React Hook Form for handling form state, combined with Zod for schema validation.

**Why:**

- React Hook Form uses uncontrolled inputs, so it avoids unnecessary re-renders and improves performance.
- Zod gives us runtime validation and generates TypeScript types automatically. Which really helps to localize
  errors quickly without spreading them across the codebase.
- The developer experience is excellent, with built-in error handling and good validation feedback.
- Both libraries are lightweight compared to other alternatives.

**Trade-offs:**

✅ Great performance and DX.

❌ Takes some time to master for advanced form use cases.

### 6. TanStack Query for Data Fetching

**What I did:**
I use TanStack Query (React Query) for handling server state and API requests.

**Why:**

- It automatically caches requests and refreshes data in the background.
- Built-in handling for loading and error states simplifies our code.
- Supports optimistic updates out of the box, giving users instant feedback.
- It also comes with excellent DevTools and debugging capabilities.

**Trade-offs:**

✅ Fantastic caching, error management, and DX. Once known the basics, it's a breeze to use.

❌ Slightly increases bundle size and has its own learning curve.

### 7. Material-UI for Styling

**What I did:**
I use Material-UI for styling the frontend app.

**Why:**

- It's a modern and popular component library that integrates well with React.
- It's a great way to keep the codebase consistent and easy to maintain.
- It's the library which I personally have more experience with, so it's easier to use for me.
  **Trade-offs:**

✅ Huge library with a lot of components and features, which makes it easier to build complex UIs. Also a great DX, with a lot of built-in features and utilities.

❌ Slightly increases bundle size and has its own learning curve.

### 8. Precommit Hooks emphasizing code quality

**What I did:**
I use precommit hooks to enforce code quality and consistency throughout the codebase.

**Why:**

- It helps to catch errors and bugs early, before they reach the production.
- It helps to keep the codebase consistent and easy to maintain.
- It enforces best practices and coding standards.
- It helps collaborators to focus on the features and business logic, instead of worrying about code quality.

**Trade-offs:**

✅ Great for code quality and consistency.

❌ Big effort to setup, since it requires some time to learn the basics and configure the rules.

## 🔄 Productionization Strategy

### 1. Database Integration

- Replace `InMemoryAssetsListRepository` with `PostgreSQLAssetsListRepository`
- Implement ORM like SQLAlchemy for database operations
- Add database migrations with Alembic
- Implement connection pooling (async is possible, but not necessary for now)
- Add database health checks

### 2. Authentication & Authorization

- Implement JWT-based authentication
- Add role-based access control (RBAC)
- Secure API endpoints with middleware
- Add user management features

### 3. API Scalability

- Implement API versioning

### 4. Monitoring & Observability

- Add logging from request ID
- Implement metrics collection
- Error tracking

### 5. Security Hardening

- Add rate limiting
- SQL injection prevention
- CORS configuration for production domains
- HTTPS enforcement
- Security headers middleware

### 6. Deployment Strategy

- **Containerization**: Docker containers for both frontend and backend
- **CI/CD**: GitHub Actions or CircleCI for automated testing, ensure code quality and deployment
- **Infrastructure**: Cloud-native approach (AWS/GCP/Azure)

### 7. Performance Optimization

- Database query optimization
- Redis caching layer
- CDN for static assets
- API response compression
- Frontend code splitting and lazy loading

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
