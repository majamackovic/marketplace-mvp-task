# marketplace-mvp-task

Full-stack marketplace MVP inspired by KupujemProdajem. Built with Angular (Signals), NestJS, and Prisma. Showcasing a high-velocity 'vibe coding' workflow with AI assistance.

## KP Clone Challenge - Work plan

## Objective

To build a functional MVP (Minimum Viable Product) of a marketplace platform inspired by "KupujemProdajem" within a 48-hour timeframe, utilizing an AI-assisted "vibe coding" workflow.

## Engineering Principles & Architecture

- **AHA Principle (Avoid Hasty Abstractions):** Prioritizing code readability and speed. Avoiding premature abstractions and complex patterns (like overly shared modules) until a clear need arises.
- **Data-First Approach:** Establishing a robust Database Schema (Prisma) as the foundation, ensuring it dictates the API structure and Frontend requirements.
- **Signals-Driven UI:** Leveraging Angular Signals for efficient state management, ensuring high performance and reactivity with minimal boilerplate.
- **AI-Assisted Velocity:** Using Cursor and Claude as "sparring partners" for rapid prototyping, refactoring, and generating high-quality boilerplate code.

## Development Roadmap

- Phase 1: Foundation
- [ x ] Setting up environment (Docker, Angular, NestJS)
- [ x ] repository setup and initial commit, gitignore edit
- [ x ] defining Prisma schema with MVP tables (Ads, Categories, Users, Images)
- [ x ] Seeding database with realistic data for development and testing

- Phase 2: Backend Core (NestJS & Prisma)
- [ x ] Created AdsModule with full CRUD functionality
- [ x ] Implemented CreateAdDto and UpdateAdDto for request validation
- [ x ] Integrated class-validator and class-transformer for robust data handling
- [ x ] Resolved database connectivity issues with @prisma/adapter-pg
- [ x ] Enabled CORS for frontend-to-backend communication
- [ x ] Implemented CategoriesModule (Read-only) for ad categorization

- Phase 3: Frontend Foundation (Angular & Tailwind)
- [ x ] Integrated Tailwind CSS for modern and responsive UI
- [ x ] Configured HttpClient and global app providers
- [ x ] Created shared AdsClient for API communication
- [ x ] Implemented AdsListComponent using Angular Signals
- [ x ] Developed AdsService with RxJS-to-Signal interop (toSignal)
- [ x ] Built responsive Grid UI for ad listings using modern @for and @if syntax
