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

## Notes about this phase

## Problem with prisma, it is generated in a new /generated folder instead of in @node_modules. Fixed by remowing from schema.prisma the output parameter

## Creating a seeder, and then executing it. Error because of the new version of Prisma - 7 no longer exposes your generated client directly from @prisma/client, which is why the old import { PrismaClient } from '@prisma/client' broke. Switched the seed script to import PrismaClient from the generated client in node_modules/.prisma/client and construct it with the required PrismaPg adapter plus DATABASE_URL, so the code now compiles and runs

- Phase 2: Backend integration
-
