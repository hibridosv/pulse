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

### Authentication Details (NextAuth.js)

The project uses NextAuth.js for authentication, configured with a `CredentialsProvider` to interact with the Laravel API.

- **Configuration File**: `src/app/api/auth/[...nextauth]/route.ts`
- **Provider**: `CredentialsProvider` for username/password authentication against the Laravel API's OAuth token endpoint.
- **Session Management**: `jwt` and `session` callbacks are used to store and expose the `accessToken` obtained from Laravel.
- **Custom Login Page**: The login page is explicitly set to the root path (`/`) via the `pages` option in NextAuth.js configuration (`signIn: '/'`).
- **Middleware Protection**: `src/middleware.ts` is configured to protect specific routes (`/dashboard`, `/protected`, `/products`) by redirecting unauthenticated users to the custom login page.

## Key Project Conventions

- **Component Structure**: [To be defined]
- **State Management**: Zustand stores are used for global and feature-specific state.
- **API Requests**: All API requests are handled through a centralized `httpService` using `axios`. This service automatically injects the NextAuth.js `accessToken` into request headers and provides basic error handling.
  - **Service File**: `src/services/httpService.ts`
  - **Base URL**: Configured via `process.env.NEXT_PUBLIC_API_URL`. Ensure this environment variable is set in `.env.local`.
  - **Authentication Flow**: The service intercepts requests to add the `Bearer` token from the active NextAuth.js session. It also includes a response interceptor to handle `401 Unauthorized` errors (e.g., for token expiration).
- **Linting**: ESLint with the `next` configuration is used to maintain code quality.
- **Import Alias**: The project uses `@/*` to reference files from the `src` directory.
