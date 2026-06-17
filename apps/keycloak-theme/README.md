# Madrasah Keycloak Theme

A custom Keycloak theme for the Madrasah project, built with Keycloakify v11, React 19, and Tailwind CSS v4.

## Overview

This theme provides a cohesive authentication experience for Madrasah users, integrating with the design system from [`@madrasah/ui`](../../shared/ui) and [`@madrasah/tokens`](../../shared/tokens) packages.

## Tech Stack

- **Keycloakify v11** - Keycloak theme development framework
- **React 19** - UI library
- **Tailwind CSS v4** - Styling framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Storybook** - Component development environment

## Folder Structure

```
apps/keycloak-theme/
├── src/                    # Source code
│   ├── account/           # Account theme components
│   ├── login/             # Login theme components
│   ├── email/             # Email theme templates
│   └── shared/            # Shared components and utilities
├── dist/                  # Vite build output
├── dist_keycloak/         # Keycloak theme JAR files
├── build/                 # Additional build artifacts
├── storybook-static/      # Storybook build output
├── .rendered/             # jsx-email build output
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Run Storybook for component development
npm run storybook
```

### Building

```bash
# Build the Keycloak theme JAR files
npm run build-keycloak-theme

# Build only the Keycloak theme (without Vite build)
npm run build:keycloak

# Format code with Prettier
npm run format
```

### Testing & Running

```bash
# Run Keycloak locally with the built theme
npm run run-keycloak
```

This command starts a Docker container with Keycloak and your custom theme loaded.
Access at: http://localhost:8080

- Username: `admin`
- Password: `admin`

## Development Workflow

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Component Development

For isolated component development, use Storybook:

```bash
npm run storybook
```

This opens Storybook at http://localhost:6006 where you can develop and test individual components.

### 3. Theme Development

Head to [Quick Start Guide](https://docs.keycloakify.dev/) for Keycloakify theme development.

### 4. Building for Production

```bash
# Build the complete theme
npm run build-keycloak-theme
```

This creates JAR files in `dist_keycloak/` that can be deployed to Keycloak.

### 5. Local Testing with Keycloak

```bash
# Build the theme first
npm run build-keycloak-theme

# Run Keycloak with your theme
npm run run-keycloak
```

Navigate to http://localhost:8080 and test your theme in a real Keycloak environment.

## Integration with Shared Packages

This theme leverages the monorepo's shared packages:

- **[`@madrasah/ui`](../../shared/ui)**: UI components and utilities
- **[`@madrasah/tokens`](../../shared/tokens)**: Design tokens and CSS variables
- **[`@madrasah/typescript-config`](../../shared/typescript-config)**: TypeScript configuration
- **[`@madrasah/eslint-config`](../../shared/eslint-config)**: ESLint rules

## Translations

Translations are now made from admin panel, but overridden keys should be added to viteconfig.

```js
  kcContextExclusionsFtl: `
            <@addToXKeycloakifyMessagesIfMessageKey str="loginAccountSubtitle" />
            ... add here
        `,
```

and when being called from the code you should use advancedMsg function.

```ts
  const { msg, msgStr, advancedMsg } = i18n;

  ...

  headerNode={advancedMsg("loginAccountTitle")}
```

## Troubleshooting

### Build Issues

1. Ensure Maven is installed and in PATH: `mvn --version`
2. Clear build cache: `rm -rf dist/ dist_keycloak/ build/`
3. Reinstall dependencies: `rm -rf node_modules && npm install`

### Theme Not Loading

1. Check JAR file exists in `dist_keycloak/`
2. Verify Keycloak version compatibility
3. Check Keycloak logs for errors

## Contributing

1. Follow the [main project guidelines](../../README.md)
2. Use shared configurations from the monorepo
3. Test theme in both development and Keycloak environments
4. Format code with `npm run format` before committing

## Links

- [Keycloakify Documentation](https://docs.keycloakify.dev/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Main Project README](../../README.md)
