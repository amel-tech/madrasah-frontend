# madrasah-frontend

Online Medrese Projesinin frontend reposudur.

## Tech Stack
Next.js
TailwindCSS
Shadcn

## Project Bootstrap Requirements

- Node.js (LTS version recommended)
- pnpm (version 10.13.1 or higher)

Configurations and helper tooling should be complete
Base configuration and .env
This README should be edited properly

```
.
├── apps/                    # Each independent frontend app lives here
│   └── web/                 # Initial frontend app (Next.js)
│       ├── app/             # App Router structure
│       ├── components/      # Project-specific components
│       ├── lib/             # Local helpers and utilities
│       └── ...
│
├── shared/                  # Code shared across frontend apps
│   ├── ui/                  # Shared UI components (wrappers or common UIs)
│   ├── hooks/               # Shared React hooks
│   ├── utils/               # Shared utility functions
│   ├── types/               # Shared TypeScript types
│   └── ...
│
├── .env                     # Base environment variables (can be overridden per app)
├── turbo.json               # Turborepo configuration
├── package.json             # Root-level dependencies and scripts
└── tsconfig.base.json       # Shared TypeScript configuration
```

## Scripts

Here are the main scripts available in this project:

- `dev`: Starts the development servers for all applications defined in the `turbo.json` configuration. This command leverages Turborepo to run `dev` scripts concurrently across all workspaces.
  ```bash
  pnpm run dev
  ```

- `build`: Builds all applications for production. This command also uses Turborepo to run `build` scripts across all workspaces, optimizing them for deployment.
  ```bash
  pnpm run build
  ```

- `lint`: Runs linting checks across all packages to ensure code quality and adherence to defined coding standards.
  ```bash
  pnpm run lint
  ```

- `test`: Currently, this script outputs a placeholder message. In the future, it will be used to run tests for the project.
  ```bash
  pnpm run test
  ```

## Getting Started

1.  **Install pnpm:** If you don't have pnpm installed, you can install it globally using npm:
    ```bash
    npm install -g pnpm
    ```
2.  **Install Dependencies:** Navigate to the root of the project and install all dependencies:
    ```bash
    pnpm install
    ```
3.  **Start Development Servers:**
    ```bash
    pnpm run dev
    ```
    This will start the development servers for all applications.