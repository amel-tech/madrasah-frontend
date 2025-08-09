# @madrasah/ui

A shared UI component library for the Madrasah project, built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design System** - Built with Radix UI primitives and Tailwind CSS
- 🌗 **Theme Support** - Dark/light mode with next-themes
- 📱 **Responsive** - Mobile-first responsive components
- ♿ **Accessible** - WAI-ARIA compliant components
- 🎯 **Type Safe** - Full TypeScript support
- 🔧 **Customizable** - Flexible styling with class-variance-authority

## Installation

This package is private and used within the Madrasah monorepo. Install dependencies:

```bash
npm install
```

## Usage

Import components, styles, and utilities from the package:

```tsx
// Components
import { Button } from "@madrasah/ui/components/button";
import { Select } from "@madrasah/ui/components/select";

// Styles
import "@madrasah/ui/globals.css";

// Utilities
import { cn } from "@madrasah/ui/lib/utils";

// Hooks
import { useTheme } from "@madrasah/ui/hooks/use-theme";
```

## Available Exports

### Components

- `./components/*` - All UI components (Button, Select, etc.)

### Styles

- `./globals.css` - Global styles and CSS variables

### Utilities

- `./lib/*` - Utility functions (cn, validators, etc.)

### Hooks

- `./hooks/*` - Custom React hooks

### Configuration

- `./postcss.config` - PostCSS configuration

## Development

### Adding New Components

To add new shadcn/ui components to the library, open `shared/ui` and run:

```bash
npx shadcn@latest add [component-name]
```

Examples:

```bash
# Add specific components
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form

# Add multiple components at once
npx shadcn@latest add dialog dropdown-menu form
```

The shadcn CLI will:

- Download the component source code
- Install any required dependencies
- Place components in the `src/components/` directory
- Update the components configuration

### Linting

```bash
npm run lint
```

### Component Structure

```
src/
├── components/          # UI components
│   ├── button.tsx
│   └── select.tsx
├── hooks/              # Custom hooks
├── lib/                # Utilities
│   └── utils.ts
└── styles/             # Global styles
    └── globals.css
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Radix UI** - Accessible primitives
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Conditional classes
- **Lucide React** - Icon library
- **next-themes** - Theme management
- **Zod** - Schema validation

## Design Tokens

The package uses CSS custom properties for consistent theming:

```css
:root {
  --background: /* ... */ --foreground: /* ... */ --primary: /* ... */ /* ... */;
}
```

## Contributing

1. Follow the established component patterns
2. Ensure accessibility standards
3. Add TypeScript types
4. Test in both light and dark themes
5. Run linting before committing

## Package Info

- **Version**: 0.0.0
- **Type**: ESM Module
- **Private**: Yes (monorepo internal)
- **License**: Private
