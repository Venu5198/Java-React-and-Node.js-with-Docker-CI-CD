# DevOps Practice: Java, React, and Node.js Monorepo with Docker & CI/CD

## 1. Project Objective and Architecture

This repository is a hands-on DevOps practice monorepo demonstrating three independent micro-applications, their containerization with multi-stage Docker builds, local orchestration with Docker Compose, and continuous integration with GitHub Actions.

### Architecture Overview

```text
                                  +-----------------------+
                                  |   Developer / User    |
                                  +-----------+-----------+
                                              |
                     +------------------------+------------------------+
                     |                        |                        |
             Port 8080 (Host)         Port 3000 (Host)         Port 3001 (Host)
                     |                        |                        |
                     v                        v                        v
             +---------------+        +---------------+        +---------------+
             |   java-app    |        |   react-app   |        |   node-app    |
             |  Spring Boot  |        |  Nginx Alpine |        | Express (LTS) |
             |   Port 8080   |        |    Port 80    |        |   Port 3000   |
             +---------------+        +---------------+        +---------------+
                     ^                        ^                        ^
                     |                        |                        |
             +---------------+        +---------------+        +---------------+
             | Multi-Stage   |        | Multi-Stage   |        | Multi-Stage   |
             | Temurin 21 JRE|        | Vite -> Nginx |        | Node 22 Non-  |
             | Non-root user |        | Static Server |        | Root user     |
             +---------------+        +---------------+        +---------------+
                                              ^
                                              |
                                  +-----------+-----------+
                                  |  GitHub Actions (CI)  |
                                  | Tests, Builds, Images |
                                  +-----------------------+
```

The three applications remain decoupled and operate independently:
1. **Java Spring Boot API (`java-app`)**: Java 21 REST service with `/api/employees` and `/health`.
2. **React Frontend (`react-app`)**: Single-page application built with React 18 and Vite, served in production via Nginx Alpine with client-side routing support.
3. **Node.js Express API (`node-app`)**: Node.js 22 LTS REST service with `/api/products` and `/health`.

---

## 2. Prerequisites and Tool Versions

| Tool | Recommended Version | Purpose |
|---|---|---|
| **Docker Desktop / Engine** | `>= 24.0` (Tested on 29.8) | Container runtime and image builds |
| **Docker Compose** | `v2.x` | Multi-container orchestration |
| **Java Development Kit (JDK)** | OpenJDK / Temurin 21 | Local Java development and testing |
| **Apache Maven** | `>= 3.9` | Java dependency management and builds |
| **Node.js** | `>= 20 LTS` (Tested on 22 / 26) | Local Node and React execution |
| **npm** | `>= 10.x` | JavaScript package management |
| **curl / HTTPie / browser** | Any modern version | Verifying endpoints |

---

## 3. Repository Structure

```text
java-react-node-ci/
├── java-app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/devops/
│   │   │   │   ├── JavaAppApplication.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── EmployeeController.java
│   │   │   │   │   └── HealthController.java
│   │   │   │   └── model/
│   │   │   │       └── Employee.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/example/devops/
│   │           ├── EmployeeControllerTest.java
│   │           └── HealthControllerTest.java
│   ├── pom.xml
│   ├── Dockerfile
│   └── .dockerignore
├── react-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeTable.jsx
│   │   │   ├── Header.jsx
│   │   │   └── StatusCard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tests/
│   │   └── app.test.js
│   ├── index.html
│   ├── vite.config.js
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
├── node-app/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── health.js
│   │   │   └── products.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   └── api.test.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 4. Port Mappings

| Application | Container Port | Host Port | Protocol | Base URL |
|---|---:|---:|:---:|---|
| **Java API** | 8080 | 8080 | HTTP | `http://localhost:8080` |
| **React Frontend** | 80 | 3000 | HTTP | `http://localhost:3000` |
| **Node.js API** | 3000 | 3001 | HTTP | `http://localhost:3001` |

---

## 5. Running Each Application Locally (Without Docker)

### Java Application
```bash
cd java-app
mvn spring-boot:run
```
*Application starts at `http://localhost:8080`.*

### React Application
```bash
cd react-app
npm install
npm run dev
```
*Development server starts at `http://localhost:3000`.*

### Node.js Application
```bash
cd node-app
npm install
npm start
```
*API starts at `http://localhost:3000` (or `PORT=3001 npm start` to avoid port collisions).*

---

## 6. Running Unit and Automated Tests

### Java Unit Tests
Executes Spring Boot MockMvc tests for `/api/employees` and `/health`:
```bash
cd java-app
mvn test
```
*Or run inside a container without local Maven:*
```bash
docker run --rm -v "${PWD}/java-app:/build" -w /build maven:3.9.9-eclipse-temurin-21-alpine mvn test
```

### React Verification Tests
Verifies production bundle generation and critical asset packaging:
```bash
cd react-app
npm test
```

### Node.js API Tests
Runs automated API integration tests with native Node test runner and Supertest:
```bash
cd node-app
npm test
```

---

## 7. Building and Running Individual Docker Containers

### Java Application
```bash
# Build image
docker build -t java-app:local ./java-app

# Run container
docker run -d --name java-app -p 8080:8080 java-app:local

# Check health
curl http://localhost:8080/health
```

### React Application
```bash
# Build image
docker build -t react-app:local ./react-app

# Run container
docker run -d --name react-app -p 3000:80 react-app:local

# Check health
curl http://localhost:3000/health
```

### Node.js Application
```bash
# Build image
docker build -t node-app:local ./node-app

# Run container
docker run -d --name node-app -p 3001:3000 node-app:local

# Check health
curl http://localhost:3001/health
```

---

## 8. Docker Compose (Full Environment)

Docker Compose starts all three applications simultaneously with configured health checks and port mappings.

### Start All Services in Background
```bash
docker compose up -d --build
```

### Check Container and Health Status
```bash
docker compose ps
```

### View Live Logs
```bash
docker compose logs -f
```

### Stop Services Without Removing Data
```bash
docker compose stop
```

### Restart Stopped Services
```bash
docker compose start
```

### Tear Down and Remove Containers & Networks
```bash
docker compose down
```

---

## 9. API Endpoints and Example Responses

### 1. Java API

#### Health Endpoint
- **URL:** `GET /health`
- **Status:** `200 OK`
- **Response:**
```json
{
  "service": "java-app",
  "status": "UP",
  "timestamp": "2026-10-21T02:58:46.068Z"
}
```

#### Employees Endpoint
- **URL:** `GET /api/employees`
- **Status:** `200 OK`
- **Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "role": "DevOps Engineer",
    "department": "Infrastructure",
    "email": "alice.johnson@example.com"
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "role": "Backend Developer",
    "department": "Engineering",
    "email": "bob.smith@example.com"
  },
  {
    "id": 3,
    "name": "Carol Williams",
    "role": "Frontend Developer",
    "department": "Product Design",
    "email": "carol.williams@example.com"
  },
  {
    "id": 4,
    "name": "David Brown",
    "role": "Site Reliability Engineer",
    "department": "Operations",
    "email": "david.brown@example.com"
  }
]
```

---

### 2. React Application

#### Frontend Dashboard
- **URL:** `GET /`
- **Status:** `200 OK`
- **Response:** HTML SPA bundle with responsive dark-mode dashboard displaying status cards and employee directory.

#### Health Endpoint (Nginx Static Route)
- **URL:** `GET /health`
- **Status:** `200 OK`
- **Response:**
```json
{
  "status": "UP",
  "service": "react-app"
}
```

---

### 3. Node.js API

#### Health Endpoint
- **URL:** `GET /health`
- **Status:** `200 OK`
- **Response:**
```json
{
  "status": "UP",
  "service": "node-app",
  "timestamp": "2026-10-21T03:01:20.123Z",
  "uptime": 45.2
}
```

#### Products Endpoint
- **URL:** `GET /api/products`
- **Status:** `200 OK`
- **Response:**
```json
[
  {
    "id": 1,
    "name": "Cloud Server Standard",
    "category": "Compute",
    "price": 49.99,
    "inStock": true
  },
  {
    "id": 2,
    "name": "Managed PostgreSQL Instance",
    "category": "Database",
    "price": 99.00,
    "inStock": true
  },
  {
    "id": 3,
    "name": "Global CDN Acceleration",
    "category": "Networking",
    "price": 29.50,
    "inStock": true
  },
  {
    "id": 4,
    "name": "Application Load Balancer",
    "category": "Networking",
    "price": 35.00,
    "inStock": false
  },
  {
    "id": 5,
    "name": "Container Registry Storage",
    "category": "DevOps",
    "price": 15.00,
    "inStock": true
  }
]
```

---

## 10. How the GitHub Actions CI Workflow Operates

The CI workflow is defined in `.github/workflows/ci.yml`.

### Triggers
- `push` to `main` branch.
- `pull_request` targeting `main` branch.

### Security & Permissions
- Minimal permission scope: `permissions: contents: read`.
- Secrets or registry tokens are NOT embedded in repository code.

### 6 Automated Quality Gates
1. **Gate 1: Security & Secrets Scan (`security-gate`)**
   - Runs Gitleaks across the git commit history to detect leaked credentials, tokens, and private keys.
2. **Gate 2: Java Quality & Tests (`java-quality-gate`)**
   - Configures JDK 21 (Temurin) with Maven caching.
   - Executes Spring Boot MockMvc unit and integration tests with zero failure tolerance.
   - Compiles and packages application jar.
3. **Gate 3: React Lint, Audit & Build (`react-quality-gate`)**
   - Static code analysis with ESLint (`npm run lint`).
   - Dependency vulnerability audit with `npm audit --audit-level=high`.
   - Production Vite bundle build (`npm run build`).
   - Automated asset verification tests (`npm test`).
4. **Gate 4: Node.js Lint, Audit & API Tests (`node-quality-gate`)**
   - Static code analysis with ESLint (`npm run lint`).
   - Dependency vulnerability audit with `npm audit --audit-level=high`.
   - Automated API integration tests (`npm test`) using Node test runner and Supertest.
5. **Gate 5: Container Builds & Vulnerability Scanning (`container-security-gate`)**
   - Builds multi-stage Docker images (`java-app:ci`, `react-app:ci`, `node-app:ci`).
   - Runs Aquasecurity Trivy scanner for OS and library CVEs with severity `CRITICAL,HIGH`.
6. **Gate 6: Live Smoke Testing & Deployment Readiness (`smoke-test-gate`)**
   - Spins up all three containers using Docker Compose.
   - Executes automated HTTP checks against `/health`, `/api/employees`, `/health`, `/`, and `/api/products`.
   - Enforces HTTP 200 responses before allowing pipeline progression; tears down cleanly.
7. **Gate 7: Consolidated Approval (`quality-gate-approval`)**
   - Final approval status asserting all preceding gates passed.

---

### End-to-End 18-Step CI/CD Mapping
- **Step 1: Source** -> GitHub Actions trigger on push/PR to `main`.
- **Step 2: Pre-checks** -> GitHub branch protection rules & PR review gates.
- **Step 3: Dependency Install** -> `npm ci` with lockfiles; cached Maven repo.
- **Step 4: Static Code Analysis** -> ESLint across React and Node; Java compiler checks.
- **Step 5: Security Scanning** -> Gitleaks secret scanning & npm audit.
- **Step 6: Build** -> Multi-stage Docker builds & Vite production bundling.
- **Step 7: Unit Testing** -> Spring MockMvc & React asset tests.
- **Step 8: Integration Testing** -> Express + Supertest endpoint tests.
- **Step 9: Artifact Versioning** -> Tagged with git commit SHA and `:ci`.
- **Step 10: Artifact Storage** -> Extensible to GitHub Container Registry (GHCR).
- **Step 11: Deployment to Staging** -> Docker Compose staging deployment.
- **Step 12: Smoke Testing** -> Gate 6 automated curl health check verification.
- **Step 13: Acceptance Testing** -> End-to-end user flow testing.
- **Step 14: Approval Gate** -> GitHub Environments manual approval rules.
- **Step 15: Production Deployment** -> Zero-downtime rolling deployment.
- **Step 16: Post-Deployment Verification** -> Endpoint ping & synthetic transaction verification.
- **Step 17: Rollback Strategy** -> Automated rollback to previous image tag on failed health check.
- **Step 18: Monitoring & Feedback** -> Spring Actuator & `/health` probes.

---

## 11. Troubleshooting Common Errors

### Port Already in Use
- **Symptom:** `bind: address already in use` when starting containers.
- **Resolution:**
  - Verify if a local service is listening on port 8080, 3000, or 3001 using `netstat -ano | findstr :<port>` (Windows) or `lsof -i :<port>` (Linux/macOS).
  - Stop any existing containers using `docker ps` and `docker stop <container_id>`.

### Docker Engine Not Running
- **Symptom:** `failed to connect to the docker API at npipe:////./pipe/docker_engine`.
- **Resolution:** Ensure Docker Desktop or the Docker daemon service is running before executing Docker commands.

### Dependency Lock Mismatch
- **Symptom:** `npm ci can only install with an existing package-lock.json`.
- **Resolution:** Ensure `package-lock.json` is committed to git alongside `package.json`. If missing, generate it via `npm install` in the respective directory.

---

## 12. Known Limitations & Future Improvements

1. **In-Memory Data:** Currently, employee and product records are stored in memory without persistent database backing.
2. **Registry Publishing:** Container images are verified via build in CI, but not pushed to a remote registry (e.g., Docker Hub or AWS ECR). A future deployment workflow can push images using GitHub Secrets.
3. **End-to-End Orchestration:** React currently runs standalone; future work can introduce an API Gateway / reverse proxy (e.g. Traefik) and integrate dynamic fetch calls between frontend and backend APIs.
