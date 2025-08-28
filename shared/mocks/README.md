# @madrasah/msw

This package contains mock API handlers using **Mock Service Worker (MSW)** for the Madrasah monorepo. It enables developers to run applications like `tedris-web` against a simulated backend, providing consistent and predictable data for development and testing without relying on a live API server.

## Architecture

This package is built on two core libraries:

  - **[Mock Service Worker (MSW)](https://mswjs.io/)**: An API mocking library that uses the Service Worker API to intercept actual network requests. It provides `setupServer` for Node.js environments (like Next.js server components) and `setupWorker` for the browser.
  - **[Faker.js](https://fakerjs.dev/)**: A library for generating massive amounts of realistic fake data.

The structure is organized by service domain:

  - **`src/tedrisat/faker.ts`**: Contains a custom, extended instance of Faker.js. It's augmented with domain-specific data generators like `faker.tedrisat.card()` and `faker.tedrisat.list()` to create realistic mock data for the Tedrisat service.
  - **`src/tedrisat/handlers/tedrisat.ts`**: Defines the MSW HTTP handlers for each endpoint in the `TedrisatService`. These handlers intercept requests and use the custom faker instance to return mock JSON responses.
  - **`src/tedrisat/handlers/index.ts`**: A factory function `createHandlers` that takes a base URL and returns an array of all the defined MSW handlers for a given service.

### Type-Safe Mocking
To ensure that the mock handlers stay in sync with the actual API services, this package uses a mapped type called MockApiHandlers. 

```typescript
type MockApiHandlers = {
  [K in keyof Service]: Service[K] extends (...args: any[]) => any ? HttpHandler : never;
};
```

This utility type iterates over every method defined in the TedrisatService from the shared/services package and enforces that a corresponding HttpHandler is implemented in the mock handlers file. This provides compile-time safety and guarantees that if a method is added, removed, or changed in the service layer, the mock implementation must be updated accordingly, preventing drift between the mocks and the real API contract.

## Integration and Usage

The mock handlers are integrated into the `tedris` application and can be enabled or disabled via environment variables.

### Enabling Mocks

To enable mocking, set the following environment variables in `.env` file in your application directory:

```env
API_MOCKING=enabled

# Do not forget to add the following line to enable/disable mocking on Next.js applications
NEXT_PUBLIC_API_MOCKING=enabled
```

When enabled, a "Mock API Active" indicator will appear in the application on the bottom right.

## How to Add New Mocks

To extend the mocking capabilities for a new API endpoint:

1.  **Extend the Faker Instance**:
    If your new endpoint returns a new data shape, add a corresponding data generator to `shared/mocks/src/tedrisat/faker.ts`.

    ```typescript
    // shared/mocks/src/tedrisat/faker.ts
    export const tedrisat = {
      // ... existing generators
      newDataType(id?: number): NewType {
        if(id) faker.seed(id);
        return {
          id: id ?? faker.number.int(),
          // ... other fake properties
        };
      }
    };
    ```

2.  **Add a New Handler**:
    Add a new MSW handler to the `tedrisatHandlers` factory in `shared/mocks/src/tedrisat/handlers/handlers.ts`.

    ```typescript
    // shared/mocks/src/tedrisat/handlers/handlers.ts
    export const tedrisatHandlers = (baseUrl: string): MockApiHandlers => {
      // ...
      const handlers: MockApiHandlers = {
        // ... existing handlers
        getNewData: http.get(`${baseUrl}/new-data`, (): HttpResponse<NewType[]> => {
          const items = faker.helpers.multiple(faker.tedrisat.newDataType, { count: 5 });
          return HttpResponse.json(items);
        }),
      }
      return handlers;
    };
    ```

The new handler will be automatically included wherever `createHandlers` is used, ensuring it works for both client and server environments.