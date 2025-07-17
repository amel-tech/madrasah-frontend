# Web Application

This is the main web application for the Madrasah frontend project, built with Next.js.

## Scripts

Here are the scripts available for this web application:

- `dev`: Starts the Next.js development server.
  ```bash
  pnpm run dev
  ```

- `build`: Builds the Next.js application for production.
  ```bash
  pnpm run build
  ```

- `start`: Starts the Next.js production server. This should be run after `pnpm run build`.
  ```bash
  pnpm run start
  ```

- `lint`: Runs ESLint to check for code quality and style issues.
  ```bash
  pnpm run lint
  ```

## Usage

To run this application locally, ensure you have followed the setup instructions in the root `README.md`.

1.  Navigate to the root of the project.
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server for all applications (including this one):
    ```bash
    pnpm run dev
    ```

Alternatively, you can run the `dev` script specifically for this app from the root directory:

```bash
pnpm --filter web dev
```
