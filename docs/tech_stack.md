# Technology Stack

This project leverages a modern, type-safe, and performance-oriented stack.

## Frontend (apps/web)
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Fast HMR)
- **Language**: TypeScript
- **Styling**: [TailwindCSS](https://tailwindcss.com/) (Utility-first CSS) + `clsx`/`tailwind-merge`
- **State Management**:
  - Global: [Zustand](https://github.com/pmndrs/zustand) (Simple, unopinionated)
  - Async/Server: [TanStack Query](https://tanstack.com/query/latest) (Caching, Auto-refetch)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **HTTP Client**: [Ky](https://github.com/sindresorhus/ky) (Lightweight Fetch wrapper)
- **UI Components**:
  - Icons: [Lucide React](https://lucide.dev/)
  - Toasts: [Sonner](https://sonner.emilkowal.ski/)

## Backend (apps/api)
- **Runtime**: Node.js
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: MongoDB + [Mongoose](https://mongoosejs.com/) (ODM)
- **Authentication**:
  - [JsonWebToken (JWT)](https://jwt.io/) for statutory auth
  - [Argon2](https://github.com/ranisalt/node-argon2) for secure password hashing
- **File Storage**: [Cloudinary](https://cloudinary.com/) (Avatar uploads)
- **Validation**: [Zod](https://zod.dev/) (Runtime schema validation)
- **Security & Middleware**:
  - [Helmet](https://helmetjs.github.io/) (Security Headers)
  - [Cors](https://github.com/expressjs/cors) (Cross-Origin Resource Sharing)
  - [Cookie-Parser](https://github.com/expressjs/cookie-parser) (Cookie handling)
  - [Dotenv](https://github.com/motdotla/dotenv) (Environment variables)
- **Logging**: [Winston](https://github.com/winstonjs/winston) (Transport) + [Morgan](https://github.com/expressjs/morgan) (HTTP)
- **Testing**: [Vitest](https://vitest.dev/) + [Supertest](https://github.com/ladjs/supertest)

## Infrastructure & Tooling
- **Monorepo**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **API Testing**: [Bruno](https://www.usebruno.com/) (Collection available in `docs/bruno`)
- **Linting**: ESLint + Prettier
