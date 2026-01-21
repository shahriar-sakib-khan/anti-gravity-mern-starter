# Anti-Gravity MERN Starter 🚀

A high-performance, feature-rich **Modular Monolith MERN Stack Boilerplate** designed for scalability, security, and developer experience. Built with **Turborepo** for monorepo management.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)

## ✨ Features

- **🛡️ Advanced Authentication**: Secure JWT-based auth with HttpOnly cookies, refresh token rotation, and Argon2 password hashing.
- **bust Role-Based Access Control (RBAC)**: Built-in `admin` and `user` roles with middleware protection.
- **🏗️ Modular Monolith Architecture**: Clean separation of concerns with feature-based directory structure (`src/features/`).
- **📱 Modern UI/UX**: Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Includes a sleek Landing Page and Admin Dashboard.
- **📂 File Uploads**: Integrated **Cloudinary** support with `multer` for seamless profile picture uploads.
- **🔒 Security First**: Helmet, CORS, Rate Limiting, and Zod validation for all inputs.
- **🔎 Logging & Monitoring**: Structured logging with `Winston` and request logging with `Morgan`.
- **🧪 Testing Ready**: Configured with **Vitest** for backend testing and **Bruno** for API documentation.

## 🛠️ Tech Stack

### Frontend (`apps/web`)
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + clsx + tailwind-merge
- **State Management**: Zustand (Global) + TanStack Query (Server)
- **Forms**: React Hook Form + Zod
- **Routing**: React Router DOM v7

### Backend (`apps/api`)
- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Validation**: Zod
- **Auth**: JWT + Argon2

### DevOps & Tooling
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- pnpm (`npm i -g pnpm`)
- MongoDB (Local or Atlas)
- Cloudinary Account (for file uploads)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shahriar-sakib-khan/anti-gravity-mern-starter.git
    cd anti-gravity-mern-starter
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    - Copy `.env.example` to `.env` in `apps/api/`:
      ```bash
      cp apps/api/.env.example apps/api/.env
      ```
    - Fill in your secrets (MONGO_URI, JWT_SECRET, CLOUDINARY_URL, etc.).

4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```
    - **Frontend**: http://localhost:5173
    - **Backend**: http://localhost:3001

## 🧪 Testing & API Docs

- **Run Tests**:
  ```bash
  pnpm test
  ```
- **API Documentation**:
  Import the `docs/bruno` folder into [Bruno](https://www.usebruno.com/) to explore and test all API endpoints interactively.

## 🧠 Documentation & Antigravity Workflow

This project is built with the **Antigravity Protocol**—an "Agent-First" development philosophy. The `docs/` directory acts as the **Context Window** for both human developers and AI Agents (Cursor, Windsurf, etc.).

### 📂 The `docs/` Folder
- **`docs/agent_rules.md`**: The "Constitution". **Always ask your AI agent to read this file first.** It defines the coding style, strict architectural boundaries, and TDD workflow.
- **`docs/architecture.md`**: The blueprint of the Modular Monolith structure.
- **`docs/tech_stack.md`**: The definitive list of approved libraries and tools.
- **`docs/project_brief.md`**: The current project status and implementation plans.

### 🤖 How to "Prime" Your AI Agent
To get the best results when using AI coding assistants with this starter:

1.  **Open the Workspace**: Open the root folder in your editor.
2.  **Prime the Context**: Copy and paste this prompt to your agent:

    > "I am building with the Antigravity MERN Starter. Read `docs/agent_rules.md` (The Law), `docs/tech_stack.md`, and `docs/architecture.md`. Use `docs/project_brief.md` to understand the current status.
    >
    > We are following the **Antigravity Protocol**:
    > 1. **TDD is mandatory** for the backend.
    > 2. **Strict Boundaries**: Frontend never imports from Backend.
    > 3. **Documentation**: Keep `task.md` and `implementation_plan.md` updated.
    >
    > If this is a fresh start, please run `pnpm install` and verify the system with `pnpm test`.
    >
    > Let's start. My first objective is: [DESCRIBE YOUR GOAL HERE]"
3.  **Follow the Protocol**: The agent is trained (via the rules) to:
    - Update `task.md` for progress tracking.
    - Write tests *before* implementation (TDD).
    - Generate Bruno API docs automatically.

## 📂 Project Structure

```
├── apps/
│   ├── api/          # Express Backend
│   └── web/          # React Frontend
├── packages/
│   ├── eslint-config # Shared ESLint Config
│   └── typescript-config # Shared TS Config
├── docs/             # Documentation & Protocols
└── package.json      # Root Dependencies
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Shahriar Khan Sakib**
- Email: shahriarsakib.khan@gmail.com
- GitHub: [@shahriar-sakib-khan](https://github.com/shahriar-sakib-khan)
