# UI Package

This package contains shared UI components for the Madrasah frontend project. These components are built using React and styled with Tailwind CSS, following the Shadcn UI philosophy.

## Scripts

- `lint`: Lints the TypeScript and JavaScript files within this package using ESLint to ensure code quality and adherence to coding standards.
  ```bash
  pnpm run lint
  ```
- `generate:component`: Utilizes `pnpm dlx shadcn-ui add` to interactively generate and add new UI components from the Shadcn UI library. This command will prompt you to select which component you want to add.
  ```bash
  pnpm run generate:component
  ```

## Usage

To use components from this package in other parts of the monorepo, import them directly from `@madrasah/ui`.

Example:

```typescript
import { Button } from "@madrasah/ui";

function MyComponent() {
  return <Button>Click Me</Button>;
}
```