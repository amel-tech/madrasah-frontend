# @madrasah/services

This package provides a centralized, type-safe way to interact with backend APIs across the Madrasah frontend monorepo. It standardizes data fetching, authentication, and error handling for all applications.

## Architecture

The architecture is designed to be simple, scalable, and easy to use in both server-side and client-side contexts.

  - **`createHttpClient`**: A core factory function that creates a reusable, configured `fetch` client. It handles setting the base URL, authentication headers, and standardizing the response format.
  - **Domain-Specific Services**: For each backend service (e.g., `tedrisat`), a dedicated class (`TedrisatService`) is created. This class encapsulates all the related API endpoints, providing a clean and discoverable interface.

## Usage on Next.js

The services can be used in both Server Components and Client Components.

### 1\. Server-Side Usage (in Server Components)

For server-side data fetching (e.g., in a Next.js page), use the `getAuthenticatedApiService` utility.

```typescript
import { cookies } from "next/headers";
import { getAuthenticatedApiService } from "~/lib/services";

export default async function Page() {
  const cookieStore = await cookies();
  const api = getAuthenticatedApiService(cookieStore);
  const { data: cards, error } = await api.getCards();

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render cards...
}
```

### 2\. Client-Side Usage (with Hooks)

For client-side components, the `useApi` hook provides an authenticated instance of the `TedrisatService`.

```typescript
// apps/tedris/hooks/useApi.ts
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { TedrisatService, createTedrisatClient } from '@madrasah/services/tedrisat';
import { env } from '~/env';

export const useApi = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  const apiServiceInstance = useMemo(() => {
    if (status !== 'authenticated' || !accessToken) {
      return null;
    }
    const client = createTedrisatClient({
      baseUrl: env.NEXT_PUBLIC_TEDRISAT_API_BASE_URL!,
      token: accessToken
    });
    return new TedrisatService(client);
  }, [accessToken, status]);

  return { api: apiServiceInstance, status };
};
```

## How to Add a New Service

1.  **Create a New Directory**:
    Under `src/`, create a new directory for your service (e.g., `src/another-service`).

2.  **Define Types**:
    Create a `types.ts` file to define the data structures for the new service.

3.  **Create the Client**:
    Create a `client.ts` file that uses the core `createHttpClient` with the specific configuration for this new service.

4.  **Create the Service Class**:
    In `service.ts`, create a class that uses the client and defines methods for each endpoint.

5.  **Export Everything**:
    Export all the necessary modules from an `index.ts` file in your service's directory.

6.  **Update `package.json`**:
    Add an export path for the new service in `shared/services/package.json` to make it accessible to other packages in the monorepo.

## Error Handling

The `createHttpClient` is designed to provide a consistent and predictable error handling mechanism. It always returns an object with either `data` or `error`.

```typescript
const { data, error } = await api.getCards();

if (error) {
  // Handle the error string
  console.error(error);
} else {
  // Work with the data
  console.log(data);
}
```

This prevents runtime errors from unhandled promise rejections and simplifies data fetching logic in the components.

## Available Scripts

  - **`npm run lint`**: Lints the code in the package.
  - **`npm run typecheck`**: Runs the TypeScript compiler to check for type errors.