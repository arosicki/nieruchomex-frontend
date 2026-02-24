# Nieruchomex – Frontend

**Live App:** https://nieruchomex.com/  
**Backend:** https://github.com/arosicki/nieruchomex-backend

Modern real estate frontend application built with **React + TypeScript** for browsing property listings (sales & rentals).  
This repository contains the complete client-side application powering the Nieruchomex platform.

## Overview

Nieruchomex is a responsive Single Page Application (SPA) designed to:

- Display real estate listings with rich property details
- Integrate interactive maps
- Connect seamlessly to a backend API
- Provide a fast and modern user experience

The project is structured for scalability, maintainability, and clean architecture.

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tanstack Router**
- **Tailwind CSS**
- **Mapbox GL**
- **ESLint + Prettier**

## Environment Variables

The project uses Vite, so environment variables must start with `VITE_`.

1. Copy the example file:

```bash
cp example.env .env
```

2. Update the variables in `.env` with your values:

```env
# Backend API endpoint
VITE_API_URL=https://your-backend-api.com

# Mapbox token for interactive maps
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

> Additional advanced settings can be configured in `src/config.ts` if needed.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/arosicki/nieruchomex-frontend.git
cd nieruchomex-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code
- `npm run format` – Format code with Prettier

## Features

- Responsive UI with Tailwind CSS
- Interactive property maps using Mapbox GL
- Filtering and search of property listings
- Integration with backend REST API
- Richtext editor for listing descriptions

## Project Structure

```
nieruchomex-frontend/
├─ public/              # Static assets
├─ src/
│  ├─ components/       # Reusable UI components
│  ├─ pages/            # Route pages
│  ├─ hooks/            # Custom React hooks
│  ├─ api/              # API calls
│  ├─ config.ts         # Advanced configuration
│  └─ main.tsx          # App entry point
├─ example.env           # Example environment variables
├─ package.json
└─ vite.config.ts
```
