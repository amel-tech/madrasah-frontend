# Mocking Layer for the Application

This directory contains the setup files for implementing API mocking in the application using **Mock Service Worker (MSW)**. This setup allows the application to run against a simulated backend, which is crucial for development and testing, especially when the real backend is unavailable or for isolating frontend behavior.

## How It Works

The mocking is enabled conditionally based on environment variables and works seamlessly for both **Server Components** (on the Node.js server) and **Client Components** (in the browser).

### 1\. Server-Side Mocking (for Server Components)

  - **Entry Point**: `instrumentation.ts` in the root of the  app.
  - **Mechanism**: If the `API_MOCKING` environment variable is set to `'enabled'` and the code is running in a Node.js environment, the `instrumentation.ts` file imports the `server` from `mocks/server.ts`.
  - **`server.ts`**: This file uses `setupServer` from `msw/node` to create a server-side request interceptor. It imports the mock API handlers from the shared `@madrasah/msw` package.
  - **Execution**: `server.listen()` is called, which patches Node's native `fetch` module. Any server-side `fetch` calls made during the rendering of Server Components are intercepted and handled by the mock handlers.

### 2\. Client-Side Mocking (for Client Components)

  - **Entry Point**: The `<MSWComponent />` included in the root layout (`app/layout.tsx`).
  - **Mechanism**: This client component checks if the `NEXT_PUBLIC_API_MOCKING` environment variable is `'enabled'` in the browser.
  - **`browser.ts`**: If mocking is enabled, the component dynamically imports the `worker` from `mocks/browser.ts`. This file uses `setupWorker` from `msw/browser` to create a Service Worker-based request interceptor, again using the same shared handlers from `@madrasah/msw`.
  - **Execution**: `worker.start()` registers and activates the Service Worker in the browser. From that point on, any `fetch` requests made by Client Components are intercepted by the Service Worker and handled by the mock handlers.

## Enabling/Disabling Mocks

To control the mocking behavior, set the following variables in `.env`:

```env
# Enable/disable server-side mocking for Server Components
API_MOCKING=enabled

# Enable/disable client-side mocking for Client Components
NEXT_PUBLIC_API_MOCKING=enabled
```

Set both to `disabled` to connect to the real API backend.

## File Structure

  - **`server.ts`**: Configures and exports the MSW server for the Node.js environment. It should only be imported in server-side code.
  - **`browser.ts`**: Configures and exports the MSW worker for the browser environment. It should only be imported in client-side code (`'use client'`).

Both files import their request handlers from the centralized `@madrasah/msw` package, ensuring that mock logic is reusable and consistent across the entire application.