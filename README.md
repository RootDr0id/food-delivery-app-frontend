# Taste of Algeria — Food Delivery Frontend

A React application for browsing restaurants, searching menus, placing food orders, and tracking order progress. Restaurant owners can manage their restaurant, menu, and incoming orders.

## Tech stack

- React 18 and TypeScript
- Vite
- React Router
- Auth0 authentication
- React Query for API data fetching
- Tailwind CSS and shadcn/ui-style components
- React Hook Form and Zod for forms and validation
- Stripe Checkout for payments
- Sonner for toast notifications

## Requirements

- Node.js and npm
- A running instance of the [Food Delivery Backend](https://github.com/RootDr0id/food-delivery-app-backend)
- An Auth0 application configured for this frontend

## Environment configuration

Create a `.env` file in the project root and provide the values for:

```env
VITE_API_BASE_URL=
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_CALLBACK_URL=
VITE_AUTH0_AUDIENCE=
```

Use the URL of your running backend for `VITE_API_BASE_URL`. Configure the Auth0 values to match your Auth0 tenant and application. The callback URL must be allowed in the Auth0 application's callback settings.

Vite exposes variables prefixed with `VITE_` to the browser bundle. These values are configuration, not secrets; never put private API keys or server-side credentials in this file.

## Install and run

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run TypeScript project checks and create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Application functionality

- Browse and search restaurants by city, cuisine, and search term.
- View restaurant details and menu items.
- Add and remove items from a session-persisted cart.
- Sign in with Auth0 and manage delivery profile details.
- Create Stripe Checkout sessions through the backend.
- View orders and track their status.
- Restaurant owners can create or update restaurant details, manage menu information, view orders, and update order statuses.

## Order status flow

The interface displays these backend order statuses:

1. Placed
2. Awaiting Restaurant Confirmation
3. In Progress
4. Out for Delivery
5. Delivered

## Related project

The backend API is maintained separately: [food-delivery-app-backend](https://github.com/RootDr0id/food-delivery-app-backend).
