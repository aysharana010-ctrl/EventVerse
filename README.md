# EventVerse

A college event management platform where students can register, join clubs, sign up for events, and receive certificates.

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite 8, Tailwind CSS v4   |
| Backend  | Node.js, Express 4                  |
| Database | PostgreSQL 16                       |

---

## Project Structure

```
eventVerse/
├── frontend/       # React + Vite app
├── backend/        # Express API server
├── docker-compose.yml
└── .env
```

---

## Prerequisites

### macOS

1. **Homebrew** — package manager for macOS. Install it if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Node.js 20+**
   ```bash
   brew install node
   ```
   Or use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:
   ```bash
   nvm install 20 && nvm use 20
   ```

3. **PostgreSQL 16**
   ```bash
   brew install postgresql@16
   brew services start postgresql@16
   ```
   Add the CLI tools to your PATH (add this to `~/.zshrc` or `~/.bash_profile`):
   ```bash
   export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
   ```

4. **Docker Desktop** *(only needed for the Docker workflow)*
   Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)

---

### Windows

1. **Node.js 20+**
   Download and run the installer from [nodejs.org](https://nodejs.org). Choose the LTS version.
   Verify the install:
   ```powershell
   node -v
   npm -v
   ```

2. **PostgreSQL 16**
   Download the installer from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/).
   During setup, note the **username** (default: `postgres`) and **password** you set — you'll need these for the `.env` file.
   The installer also adds `psql` to your PATH automatically.

3. **Git Bash or WSL2** *(recommended for running shell commands)*
   - Git Bash ships with the Git for Windows installer: [git-scm.com](https://git-scm.com)
   - Alternatively, enable WSL2 and install Ubuntu from the Microsoft Store for a full Linux environment.

4. **Docker Desktop** *(only needed for the Docker workflow)*
   Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/). WSL2 backend is recommended on Windows.

---

## Environment Variables

Create a `.env` file in the backend root before running anything:

```env
# Database
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=eventverse
DB_HOST=localhost
DB_PORT=5432

# Backend
PORT=3000
```

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:3000
```

> When using Docker, `DB_HOST` should be set to `postgres` (the Docker service name) instead of `localhost`.

---

## Local Development

Run each of the three services in a separate terminal.

### 1. Database (PostgreSQL) — Port `5432`

**First time only** — create the database:

```bash
psql -U your_db_user -c "CREATE DATABASE eventverse;"
```

On **Windows** using the default postgres superuser:
```powershell
psql -U postgres -c "CREATE DATABASE eventverse;"
```

Once created, PostgreSQL just needs to be running in the background. On macOS it starts automatically via Homebrew services. On Windows it runs as a Windows Service after installation and starts on boot by default.

---

### 2. Backend — Port `3000`

```bash
cd backend
npm install
npm run dev
```

`nodemon` watches for file changes and restarts the server automatically.

**First time only** — run migrations after the server has started successfully:

```bash
npm run migrate
```

The API will be available at `http://localhost:3000`.
Health check endpoint: `http://localhost:3000/health`

---

### 3. Frontend — Port `5173`

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Running with Docker

Docker Compose spins up all three services — **PostgreSQL**, **backend**, and **frontend**.

### Start

```bash
docker compose up --build
```

### Start in background

```bash
docker compose up --build -d
```

### Stop

```bash
docker compose down
```

### Stop and remove volumes (wipes database)

```bash
docker compose down -v
```

**Ports exposed by Docker:**

| Service    | Port   |
|------------|--------|
| PostgreSQL | `5432` |
| Backend    | `3000` |
| Frontend   | `5173` |

> Startup order is managed automatically: PostgreSQL must pass its health check before the backend starts, and the backend must be up before the frontend starts.

> Make sure `DB_HOST=postgres` in your `.env` when running via Docker (not `localhost`).