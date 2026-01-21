# Architecture & Design

**Modular Monolith** managed by Turborepo. Optimized for scalability and strict separation.

## 🏗️ Structure & Boundaries

- **`apps/api`**: Backend REST API (Node.js/Express).
- **`apps/web`**: Frontend App (React/Vite).
- **`packages/*`**: Shared libs & config.

**Rules**:
1.  **Strict Separation**: Frontend communicates with Backend ONLY via HTTP/REST.
2.  **Shared Code**: Only `packages/` can be shared.
3.  **Feature-First**: Code grouped by Feature (e.g., `auth`, `user`).

---

## 📂 Directory Map

### Backend (`apps/api/src`)
- **`features/`**: Vertical Slices (Auth, User).
- **`middleware/`**: Global Middleware.
- **`services/`**: Shared Utility Services.
- **`models/`**: Mongoose Schemas.

### Frontend (`apps/web/src`)
- **`features/`**: Feature Modules (Hooks, Stores).
- **`components/`**: Shared UI Components.
- **`pages/`**: Route-level Pages.

---

## 🧩 Core Modules

### 1. Auth & Security
- **Stateless**: JWT (Statutory) + Argon2 (Hashing).
- **Sessions**: Refresh Tokens via HttpOnly Cookies.
- **RBAC**: Middleware enforces `User` vs `Admin` roles.

### 2. User Management
- **Profile**: Self-service updates (Name, Email, Password, Avatar).
- **Admin**: Full oversight (View, Promote, Demote, Delete, Reset Password).
- **Storage**: Cloudinary/Multer for Avatar uploads.

---

## 🎨 Guidelines

### Responsive Design
- **Mobile First**: Base styles for mobile, `sm:`/`md:` for larger screens.
- **Touch**: Min 44px targets.

### Development Protocol
1.  **Test First**: TDD is mandatory for Backend logic.
2.  **Implement**: Minimal code to pass.
3.  **Refactor**: Clean up.

[View Tech Stack](./tech_stack.md)
