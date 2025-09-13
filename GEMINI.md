# Project: Pulse

This document provides a reference for the technical stack and conventions used in this project.

## Core Technologies

- **Framework**: Next.js (v14+)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand

## Backend Integration

- **API**: The frontend consumes a Laravel API.
- **Authentication**: Authentication is handled via Laravel Passport (OAuth2).

## Key Project Conventions

- **Component Structure**: [To be defined]
- **State Management**: Zustand stores are used for global and feature-specific state.
- **API Requests**: [To be defined, e.g., using a dedicated API client, axios, or fetch wrappers]
- **Linting**: ESLint with the `next` configuration is used to maintain code quality.
- **Import Alias**: The project uses `@/*` to reference files from the `src` directory.
