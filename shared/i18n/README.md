# @madrasah/i18n

Internationalization (i18n) package for Madrasah applications, providing centralized translation resources and Tolgee integration.

## Overview

This package provides a shared internationalization solution for all Madrasah apps, supporting multiple languages with structured namespacing for different applications and common resources.

## Supported Languages

- **English (en)** - Default language
- **Turkish (tr)**
- **Arabic (ar)**

## Package Structure

```
src/
  locales/
    en/           # English translations
    tr/           # Turkish translations
    ar/           # Arabic translations
    index.ts      # Main resources export
```

## Namespaces

The package organizes translations into the following namespaces:

- **`common`** - Shared translations across all applications
- **`tedris`** - Tedris application specific translations
- **`nizam`** - Nizam application specific translations
- **`nazir`** - Nazir application specific translations

## Installation

This package is part of the Madrasah monorepo and is automatically available to all apps within the workspace.

```bash
# Install dependencies
npm install

# Build the package
npm run build
```

## Usage

Import the resources object to access all translations:

```typescript
import { resources } from '@madrasah/i18n'

// Access translations by language and namespace
const englishCommon = resources.en.common
const turkishTedris = resources.tr.tedris
const arabicNizam = resources.ar.nizam
```

### Example Translation Structure

```json
{
  "locales": {
    "ar": "العربية",
    "en": "English", 
    "tr": "Türkçe"
  },
  "welcome": "welcome"
}
```

## Key Format Convention

The package follows a **component-based key format** for organizing translation strings. This approach ensures consistency and makes it easy to locate and manage translations.

### Key Structure

The key format follows this pattern:
```
{language}.{namespace}.{Component}.{property}
```

### Examples

```typescript
// Component-based keys
en.tedris.TabView.decks     // "Decks"
en.tedris.TabView.home      // "Home" 
en.tedris.TabView.learning  // "Learning"

// Nested component structure
en.nizam.LoginForm.title           // Login form title
en.nizam.LoginForm.submitButton    // Submit button text
en.nizam.LoginForm.validation.required  // Validation message

// Common translations
en.common.locales.ar        // "العربية"
en.common.locales.en        // "English"
en.common.locales.tr        // "Türkçe"
```

### JSON Structure

In the translation files, this translates to nested objects:

```json
{
  "TabView": {
    "decks": "Decks",
    "home": "Home",
    "learning": "Learning"
  },
  "LoginForm": {
    "title": "Login",
    "submitButton": "Submit",
    "validation": {
      "required": "This field is required"
    }
  }
}
```

### Usage in Applications

```typescript
// Using i18next
t('tedris:TabView.decks')           // Returns "Decks"
t('nizam:LoginForm.title')          // Returns "Login"
t('common:locales.en')              // Returns "English"
```

## Tolgee Integration

This package integrates with [Tolgee](https://tolgee.io/) for translation management and synchronization.

### Configuration

1. Copy `.env.example` to `.env`
2. Fill in your Tolgee credentials:

```bash
TOLGEE_API_URL=your_tolgee_api_url
TOLGEE_PROJECT_ID=your_project_id
TOLGEE_API_KEY=your_api_key
```

### Tolgee Commands

```bash
# Pull latest translations from Tolgee
npm run pull

# Push local translations to Tolgee
npm run push

# Synchronize translations (pull + push)
npm run sync
```

### Tolgee Configuration

The `tolgee.config.js` defines:

- **Languages**: `en`, `tr`, `ar`
- **Namespaces**: `common`, `tedris`, `nizam`, `nazir`
- **File Structure**: `{languageTag}/{namespace}.{extension}`
- **Format**: `JSON_TOLGEE`

## Development

### Scripts

```bash
# Build the package
npm run build

# Watch mode for development
npm run dev

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build artifacts
npm run clean
```

### Adding New Translations

1. Add translations to the appropriate JSON files in `src/locales/{language}/{namespace}.json`
2. Build the package: `npm run build`
3. Sync with Tolgee: `npm run sync`

### Adding New Languages

1. Create a new directory under `src/locales/` (e.g., `fr/`)
2. Add the language-specific JSON files for each namespace
3. Create an `index.ts` file to export the translations
4. Update `src/locales/index.ts` to include the new language
5. Update `tolgee.config.js` to include the new language in the languages array

### Adding New Namespaces

1. Create new JSON files for the namespace in each language directory
2. Update each language's `index.ts` to export the new namespace
3. Update `tolgee.config.js` to include the new namespace

## File Structure

```
shared/i18n/
├── src/
│   └── locales/
│       ├── index.ts              # Main export
│       ├── en/
│       │   ├── index.ts          # English exports
│       │   ├── common.json       # Common English translations
│       │   ├── tedris.json       # Tedris app English translations
│       │   ├── nizam.json        # Nizam app English translations
│       │   └── nazir.json        # Nazir app English translations
│       ├── tr/                   # Turkish translations (same structure)
│       └── ar/                   # Arabic translations (same structure)
├── dist/                         # Built output
├── tolgee.config.js              # Tolgee configuration
├── package.json
├── tsconfig.json
├── .env.example                  # Environment variables template
└── README.md
```

## Dependencies

### Runtime Dependencies

- **`dotenv`** - Environment variables loading

### Development Dependencies

- **`@tolgee/cli`** - Tolgee command line interface
- **`typescript`** - TypeScript compiler

## TypeScript Support

The package provides full TypeScript support with proper type definitions for all translation resources.

## Best Practices

1. **Namespace Organization**: Keep application-specific translations in their respective namespaces
2. **Common Resources**: Use the `common` namespace for shared translations across applications
3. **Component-Based Keys**: Follow the component-based key format `{Component}.{property}` (e.g., `TabView.decks`, `LoginForm.submitButton`)
4. **Hierarchical Structure**: Use nested objects for complex components (e.g., `LoginForm.validation.required`)
5. **Descriptive Naming**: Use clear, descriptive names that reflect the UI element or context
6. **Regular Sync**: Regularly sync translations with Tolgee to keep them up-to-date
7. **Type Safety**: Leverage TypeScript types for translation keys to prevent runtime errors

## Contributing

When adding new translations:

1. Follow the existing naming conventions
2. Add translations to all supported languages
3. Test the translations in the target applications
4. Sync with Tolgee to share with the translation team
5. Update this README if adding new namespaces or languages

## License

ISC