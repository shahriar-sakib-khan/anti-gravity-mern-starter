# Agent Rules (The Law)

> [!IMPORTANT]
> These rules are non-negotiable. You must adhere to them in every tool call.

## 1. General Philosophy
- **Deep Logging**:
    - Use `winston` for application logs.
    - Use `morgan` for HTTP logs.
    - **Requirement**: All logs must be persisted to a `logs/` directory (e.g., `logs/app.log`, `logs/access.log`). Never rely on transient console output.
- **Functional Over Class**: Always prefer React Functional Components with Hooks.
- **Strict TypeScript**: No `any`. No `// @ts-ignore`. If you can't type it, you don't understand it.
- **Junior-Friendly Documentation**:
    - Add comments to **every significant code block**.
    - Explain *Why* this logic exists, not just what it does.
    - Imagine the reader is a junior developer debugging this at 3 AM.
    - **Do not remove existing comments** unless the logic itself is removed.

## 2. Architecture & File Structure
- **Feature-First Architecture**:
    - Group related files by feature, not technical type.
    - **Example**: `src/features/user/components/UserCard.tsx`, `src/features/user/hooks/useUser.ts`
- **Shared Schemas (Single Source of Truth)**:
    - **Zod Schemas** must be defined in a **Shared Package** (e.g., `packages/shared`) or a dedicated shared folder.
    - Both Frontend (Forms) and Backend (Validation) must import from this single source.
    - Never duplicate schema logic.
- **Strict Boundaries**:
    - **Rule**: Frontend (`apps/web`) must NEVER import directly from Backend (`apps/api`).
    - **Communication**: STRICTLY via HTTP/REST.
    - **Shared Code**: Generic UI components (Buttons) and helpers go in `src/components` or `packages/`.

## 3. Code Style (Frontend)
- **Tailwind First**: Use utility classes. No CSS files.
- **State Management**:
    - **Global**: Zustand.
    - **Server State**: TanStack Query (React Query).
- **Hooks**: Isolate logic in custom hooks. Keep components for UI rendering only.
- **Lucide Icons**: Use `lucide-react`.

## 4. Code Style (Backend)
- **Controller-Service Pattern**:
    - **Routes**: Define endpoints.
    - **Controllers**: Handle HTTP basics (Req/Res) + **Zod Validation**.
    - **Services**: Business Logic + **Mongoose** DB Calls.
- **Schema Sharing**: Define Mongoose Schemas in a model file. Extend the shared zod schema if necessary.
- **Env Variables**: Access via `process.env`.
- **Async/Await**: Always use async/await.

## 5. Testing & Verification
- **Visual Verification**: When changing UI, you MUST use the **Sandboxed Browser tool** (Chromium) to take a screenshot and verify the visual result.
- **Backend TDD (Test Driven Development)**:
    - **Flow**: Write Test -> Run (Fail) -> Write Code -> Run (Pass) -> Refactor -> Next Feature.
    - **Infrastructure**: Use `mongodb-memory-server` for isolated integration testing (especially for RBAC and Auth flows).
    - **Coverage**: Test happy paths, edge cases (404, 500), and permission denials (403).
    - **Review**: Request User Review of the tests *before* writing the implementation.
    - **Protocol**:
        1. Write Test Plan & Tests.
        2. Get User Approval.
        3. ONLY THEN create the Implementation Plan for the code.
- **Unit Tests**: Vitest for all utility functions.

## 6. The Workflow Protocol (Full Cycle)
> [!CRITICAL]
> You must follow this exact loop for every feature. This is your "Must Follow" workflow.

### Phase 1: Plan & Document
1.  **Analyze**: Discuss the feature with the user.
2.  **Task Tracking**: Create or Update `task.md`. This is your living memory. Mark progress as you go.
3.  **Draft Plan**: Create or update `implementation_plan.md` for any logic-heavy task.
4.  **Review**: Check logic, dependencies, and architecture.
5.  **STOP**: Wait for User Approval of the plan.

### Phase 2: Audit
1.  **Dependencies**: Check `tech_stack.md`. Ensure compliance.
2.  **Files**: List files to be created/modified in your plan.

### Phase 3: Execution (TDD)
1.  **Test**: Write the failing test case first (Backend).
2.  **Implement**: Write the code to pass the test.
3.  **UI Verification**: If Frontend, use the Browser tool or seek explicit visual feedback (logs/toasts).

### Phase 4: Report
1.  **API Docs**: Create or Update Bruno `.bru` files for *every* new or modified API endpoint.
2.  **Test Verification**: Ensure `npm test` passes for new routes.
3.  **Documentation**: Update `walkthrough.md` if proof is needed.
4.  **Handover**: Notify User for final review.
