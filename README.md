# marketplace-mvp-task

Full-stack marketplace MVP inspired by KupujemProdajem. Built with Angular (Signals), NestJS, and Prisma. Showcasing a high-velocity 'vibe coding' workflow with AI assistance.

## KP Clone Challenge - Work plan

## Objective

To build a functional MVP (Minimum Viable Product) of a marketplace platform inspired by "KupujemProdajem" within a 48-hour timeframe, utilizing an AI-assisted "vibe coding" workflow.

## Engineering Principles & Architecture

- **AHA Principle (Avoid Hasty Abstractions):** Prioritizing code readability and speed. Avoiding premature abstractions and complex patterns (like overly shared modules) until a clear need arises.
- **Data-First Approach:** Establishing a robust Database Schema (Prisma) as the foundation, ensuring it dictates the API structure and Frontend requirements.
- **Signals-Driven UI:** Leveraging Angular Signals for efficient state management, ensuring high performance and reactivity with minimal boilerplate.
- **AI-Assisted Velocity:** Using Cursor and Gemini as "sparring partners" for rapid prototyping, refactoring, and generating high-quality boilerplate code.

🛠️ Project Roadmap & Progress
Phase 1: Foundation & Infrastructure
[x] Monorepo Setup: Workspace orchestration with Nx, Angular, and NestJS.
[x] Persistence Layer: Database schema design with Prisma ORM (Ads, Users, Categories).
[x] Environment: Standardized development with Docker and .env configuration.
[x] Data Seeding: Automated database seeding for rapid development and testing.

Phase 2: Backend Core (API & Security)
[x] Ads & Categories CRUD: Robust API endpoints with DTO validation (class-validator).
[x] Authentication System: Secure JWT implementation with Passport strategies and bcrypt hashing.
[x] Database Connectivity: Optimized PostgreSQL integration and error handling.
[x] CORS & Security: Configured cross-origin resource sharing and protected routes via Guards.

Phase 3: Frontend Architecture (Modern Angular)
[x] UI Framework: Integrated Tailwind CSS for responsive, mobile-first design.
[x] State Management: Fully reactive architecture using Angular Signals.
[x] Auth Flow: Secure Login/Register flow with Functional Interceptors for token handling.
[x] Routing & Protection: Implemented Auth Guards to secure private routes and enhance UX.

🚀 Next Steps
[ ] Image Upload: Integration with AWS S3 or Cloudinary.
[ ] Search Engine: Implementing full-text search and advanced filters.
[ ] Real-time Chat: Messaging system for buyers and sellers using WebSockets.
