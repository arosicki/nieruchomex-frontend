# Nieruchomex – Backend

**Live App:** https://nieruchomex.com/  
**Frontend:** https://github.com/arosicki/nieruchomex-frontend

Modern backend API built with **Node.js, TypeScript, and Express** to power the Nieruchomex real estate platform.  
This repository contains all server-side logic, database models, and API endpoints for managing property listings, users, and related operations.

## Overview

Nieruchomex Backend is a RESTful API designed to:

- Serve property listing data (sales & rentals)
- Manage users, authentication, and roles
- Handle image uploads for listings
- Integrate with the frontend SPA seamlessly
- Provide a scalable and maintainable architecture

The backend is built for reliability, performance, and clean code practices.

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **ESLint + Prettier**
- **Docker (optional for development)**

## Environment Variables

Create a `.env` file based on `example.env` and fill in your database credentials and other secrets:

```env
# Server
PORT=4000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nieruchomex

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret

# Optional: Cloud storage for images
CLOUDINARY_URL=your_cloudinary_url
```

> Make sure to adjust database credentials and JWT secret according to your environment.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/arosicki/nieruchomex-backend.git
cd nieruchomex-backend
```

2. Install dependencies:

```bash
npm install
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

The API will run at `http://localhost:4000` by default.

## Scripts

- `npm run dev` – Start dev server with hot-reloading
- `npm run build` – Compile TypeScript for production
- `npm run start` – Run production build
- `npm run lint` – Lint code
- `npm run format` – Format code with Prettier
- `npx prisma migrate dev` – Apply database migrations
- `npx prisma studio` – Open Prisma Studio (database admin UI)

## Features

- CRUD operations for property listings
- User authentication & role management
- Image uploads and management
- Type-safe database operations via Prisma
- Secure API endpoints with JWT authentication
- Detailed error handling and validation

## Project Structure

```
nieruchomex-backend/
├─ src/
│  ├─ controllers/      # Route controllers
│  ├─ routes/           # API routes
│  ├─ middlewares/      # Express middlewares
│  ├─ models/           # Prisma models
│  ├─ utils/            # Helper functions
│  └─ server.ts         # App entry point
├─ prisma/
│  ├─ schema.prisma     # Database schema
│  └─ migrations/       # Database migrations
├─ example.env           # Example environment variables
├─ package.json
└─ tsconfig.json
```
