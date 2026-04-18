# Cine-Discover

A full-stack, cinematic movie search and discovery web application built to cleanly demonstrate modern React architecture, API integration, and monorepo management.

## Overview

Cine-Discover is a modern React SPA (Single Page Application) powered by Vite. It allows users to seamlessly discover movies using the TMDB API. It features a stunning, full-bleed cinematic UI, smooth staggered animations, and immersive details modals.

This repository is structured as a **pnpm workspace monorepo** operating purely on Javascript. Each directory within the workspace manages its own individual scope and dependencies.

## Educational Documentation

If you are using this repository to learn React or understand the internal architecture, please refer to the extremely detailed system breakdown in the associated documentation docs:
- **Architecture Guide**: Outlines the complete data flow, from `main.jsx` injection down to `useState` logic.
- **Class vs Functional**: See how `BackendStatus.jsx` communicates with the backend, compared to the functional `Home.jsx` logic.
- **State Management**: Shows how API calls are cached using TanStack React Query.

## Key Features

- **Cinematic UI**: Full-bleed hero banner showcasing top trending movies.
- **Advanced Search**: Fast, debounced search across all TMDB movies.
- **Categorized Sections**: Discover Trending, Popular, and Top Rated movies easily.
- **Immersive Details Modal**: Includes cast, genres, runtime, and the movie tagline.
- **Persistent Favorites**: Save your favorite movies locally using browser storage.
- **Backend Monitoring**: Dedicated Class Component dashboard tracking Express API health.
- **Responsive Design**: Fully-responsive interface adapting beautifully from mobile to ultra-wide desktop monitors.

## Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS + Class Variance Authority (CVA)
- **State Management & Data**: TanStack React Query
- **UI Components**: Radix UI + Framer Motion
- **Package Manager**: pnpm
- **Backend API**: Node.js + Express 5

## Project Structure

- `artifacts/movie-discovery`: The main React Client Application frontend.
- `artifacts/api-server`: The Express Backend Server handling API health and infrastructure.
- `artifacts/mockup-sandbox`: An isolated sandbox environment for UI component design viewing.

## Local Development Setup

### Requirements

- Node.js (v24 or later)
- pnpm

### Getting Started

1. **Install Dependencies**
   Run the following command at the root of the project to install all workspace dependencies:
   ```bash
   pnpm install
   ```

2. **Set Environment Variables**
   Create a `.env.local` file inside the `artifacts/movie-discovery` directory with your TMDB API credentials (the ones you generated):
   ```env
   VITE_TMDB_ACCESS_TOKEN=your_access_token_here
   VITE_TMDB_API_KEY=your_api_key_here
   ```

3. **Run the Development Servers**
   To start the backend and frontend dev servers concurrently, run the following commands sequentially or in two separate terminal windows:
   ```bash
   # Start the Express API server (runs on port 5000)
   pnpm --filter @workspace/api-server run dev
   
   # Start the React frontend application (runs on port 5173 by default)
   pnpm --filter @workspace/movie-discovery run dev
   ```

4. **View the Application**
   Open your browser and navigate to `http://localhost:5173/`.

## Build for Production

To build all packages simultaneously across the monorepo using esbuild and Vite, run:
```bash
pnpm run build
```