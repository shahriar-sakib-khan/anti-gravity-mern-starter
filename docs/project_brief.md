# Project Brief & Executive Summary

## Overview
**AntiGravity** is a production-ready MERN (MongoDB, Express, React, Node) seed designed for scalability, security, and developer experience. It goes beyond basic "Hello World" examples by implementing complex, real-world features like Role-Based Access Control (RBAC), secure file uploads, and a comprehensive Admin Dashboard.

## Features Delivered

### 🔐 Advanced Authentication
- **Secure Setup**: Implemented **Argon2** hashing and **JWT** (JSON Web Tokens) for stateless authentication.
- **Session Management**: Secure HttpOnly cookies for token storage with a robust **Refresh Token** rotation flow to keep users logged in securely.
- **UX**: Polished Login and Registration pages with validation, visibility toggles, and "Back to Home" navigation.

### 🛡️ Role-Based Access Control (RBAC)
- **Dual Roles**: System supports `User` and `Admin` roles.
- **Protected Routes**: Middleware ensures regular users cannot access Admin pages or APIs.
- **Admin Dashboard**: A dedicated interface for Admins to view system stats and manage users.

### 👥 User Management
- **Profile Management**: Users can update their Name and Email.
- **Avatar Uploads**: Integrated **Cloudinary** for scalable image hosting. Users can upload, view, and replace profile pictures.
- **Password Security**: Users can change their password; Admins can force-reset user passwords.
- **Account Deletion**: "Danger Zone" allows users to permanently delete their account (with confirmation modal).

### ⚡ Admin Capabilities
- **User Oversight**: View all registered users (Admins vs. Regular Users).
- **Role Management**: Promote trusted users to Admin or demote them.
- **User Moderation**: Admins can force-delete users (using a custom confirmation modal) or reset their passwords if they are locked out.

### 🎨 Modern UI/UX
- **Design System**: Built with **TailwindCSS** featuring specific design tokens (Glassmorphism, Gradients).
- **Responsive**: Fully mobile-responsive layouts for all pages.
- **Feedback**: Integrated **Sonner** for toast notifications (Success/Error feedback) and **Lucide** icons for visual clarity.

---

## 🚀 Adding Future Features (Developer & Agent Guide)

This section serves as a protocol for extending the AntiGravity seed. Follow this template to maintain architectural integrity and code quality.

### 🧠 Implementation Context
- **Architecture**: Modular Monolith. Code must be organized by **Feature Vertical** (e.g., `features/orders`) not technical layer.
- **Boundaries**: Strict API/Web separation. Frontend communicates ONLY via JSON REST API.
- **Testing**: TDD is **First-Class**. Backend logic must be tested before implementation.

### 📋 Feature Implementation Template

Copy this checklist into your `task.md` or issue tracker when starting a new feature.

#### Phase 1: Planning
- [ ] **Requirements**: Define the scope and business logic.
- [ ] **Artifacts**: Update `task.md`. Create `implementation_plan.md` (Required for complex features).

#### Phase 2: Backend (`apps/api`)
*Follows TDD (Test Driven Development)*
- [ ] **Tests**: Create `src/features/[feature]/[feature].controller.test.ts`. Write failing tests first.
- [ ] **Model**: Create/Update Mongoose Schema in `src/models/`.
- [ ] **Service**: Implement business logic in `src/features/[feature]/[feature].service.ts`.
- [ ] **Controller**: Implement request handling in `src/features/[feature]/[feature].controller.ts`.
- [ ] **Routes**: Register protected routes in `src/features/[feature]/[feature].routes.ts` and `src/index.ts`.

#### Phase 3: Frontend (`apps/web`)
- [ ] **State/API**: Create `src/features/[feature]/hooks/use[Feature].ts`. Use **Ky** for requests and **TanStack Query** for caching.
- [ ] **Components**: Build reusable UI components in `src/features/[feature]/components/`. Use **TailwindCSS** with mobile-first approach.
- [ ] **Page**: Assemble components in `src/pages/[PageName].tsx`.
- [ ] **Route**: Register new route in `src/App.tsx`.

#### Phase 4: Verification
- [ ] **Automated**: Run `pnpm test` (Backend).
- [ ] **Manual**: Verify responsive UI and happy/error paths in the browser.
