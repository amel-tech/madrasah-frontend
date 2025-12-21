# Nizam - Madrasah Admin Application

Nizam is a Next.js application that serves as the administrative interface for the Madrasah platform. It provides comprehensive management tools and dashboards for platform administration.

## 🚀 Features

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth.js** - Authentication with Keycloak integration
- **next-intl** - Internationalization with routing support
- **Radix UI** - Accessible component primitives
- **T3 Env** - Type-safe environment variable validation
- **Monorepo Components** - Shared UI components and utilities

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.sample .env.local
```

## 🚀 Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:4001](http://localhost:4001) with your browser to see the result.


## 🌍 Internationalization (i18n)

Nizam uses **next-intl** for internationalization, integrating with the shared `@madrasah/i18n` package for centralized translation management.

### Supported Languages

- **English (en)** - Default language
- **Turkish (tr)**  
- **Arabic (ar)**

### Configuration

The i18n setup includes:

- **Routing**: Automatic locale detection and URL-based routing (`/en/home`, `/tr/home`, `/ar/home`)
- **Middleware**: Route matching and locale resolution
- **Request Configuration**: Server-side message loading with namespace filtering
- **Navigation**: Type-safe navigation hooks and components

### Usage Examples

#### Using Translations in Components

```tsx
import { useTranslations } from 'next-intl'

export function TabView() {
  const t = useTranslations('nizam')
  
  return (
    <div>
      <h1>{t('TabView.home')}</h1>
      <p>{t('TabView.decks')}</p>
    </div>
  )
}
```

#### Navigation with Locale Support

Make sure to use the locale-aware `Link` and navigation hooks from the i18n navigation module. That replaces standard Next.js navigation components to ensure locale is preserved.

```tsx
import { Link, useRouter, usePathname } from '~/lib/i18n/navigation'

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  
  return (
    <nav>
      <Link href="/home">Home</Link>
      <button onClick={() => router.push('/learning')}>
        Go to Learning
      </button>
    </nav>
  )
}
```

### Available Namespaces

- **`common`** - Shared translations (locale names, common UI elements)
- **`nizam`** - Nizam-specific translations (components, features)

See the readme of the `@madrasah/i18n` package for detailed instructions on adding new translations and managing them.


## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [next-intl](https://next-intl.dev/) - Internationalization
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [NextAuth.js](https://next-auth.js.org/) - Authentication

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev/docs)
- [Madrasah i18n Package](../../shared/i18n/README.md)

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Add translations for new features to all supported languages
3. Test internationalization with different locales
4. Update this README when adding new features or configurations
