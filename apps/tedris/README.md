# Tedris - Madrasah Frontend Application

Tedris is a Next.js application that serves as the main frontend for the Madrasah platform. It provides a modern, responsive web interface with integrated authentication through Keycloak.

## 🚀 Features

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth.js** - Authentication with Keycloak integration
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

## ⚙️ Environment Configuration

The application uses type-safe environment variables through `@t3-oss/env-nextjs`. Configure the following variables in your `.env.local` file:

### Server-side Variables

```env
KEYCLOAK_CLIENT_ID=madrasah-client
KEYCLOAK_CLIENT_SECRET=your-client-secret
KEYCLOAK_ISSUER=http://localhost:8080/realms/madrasah-dev
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

### Client-side Variables

```env
NEXT_PUBLIC_KEYCLOAK_ISSUER=http://localhost:8080/realms/madrasah-dev
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=madrasah-client
NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000
```

## 🔐 Keycloak OpenID Client Setup

To integrate with Keycloak, you need to configure an OpenID Connect client in your Keycloak realm.

### 1. Create a New Client

1. Log into your Keycloak Admin Console
2. Navigate to your realm (e.g., `madrasah-dev`)
3. Go to **Clients** → **Create client**
4. Configure the client:
   - **Client type**: `OpenID Connect`
   - **Client ID**: `madrasah-client`
   - **Name**: `Madrasah Application`

### 2. Client Configuration

Configure the following settings in the client:

#### General Settings

- **Client ID**: `madrasah-client`
- **Name**: `Tedris Application`
- **Description**: `Frontend application for Madrasah platform`

#### Access Settings

- **Root URL**: `http://localhost:3000` (for development)
- **Home URL**: `http://localhost:3000`
- **Valid redirect URIs**:
  - `http://localhost:3000/api/auth/callback/keycloak`
  - `https://your-production-domain.com/api/auth/callback/keycloak`
- **Valid post logout redirect URIs**:
  - `http://localhost:3000`
  - `https://your-production-domain.com`
- **Web origins**:
  - `http://localhost:3000`
  - `https://your-production-domain.com`

#### Capability Config

- **Client authentication**: `On` (to get client secret)
- **Authorization**: `Off`
- **Standard flow**: `On`
- **Direct access grants**: `Off`
- **Implicit flow**: `Off`
- **Service accounts roles**: `Off`

#### Advanced Settings

- **Access Token Lifespan**: `5 minutes` (or as per your requirements)
- **Client Session Idle**: `30 minutes`
- **Client Session Max**: `12 hours`

### 3. Client Secret

After creating the client:

1. Go to the **Credentials** tab
2. Copy the **Client Secret**
3. Add it to your `.env.local` file as `KEYCLOAK_CLIENT_SECRET`

### 4. Realm Configuration

Ensure your Keycloak realm has:

- **Login theme**: Set to your custom theme (if using keycloak-theme app)
- **Token settings**: Configure appropriate token lifespans
- **Security defenses**: Configure as per your security requirements

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Clean build artifacts
npm run clean
```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

```
apps/tedris/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── api/               # API routes
├── components/            # React components
│   └── keycloak/         # Keycloak-specific components
├── lib/                  # Utility libraries
│   └── auth_options.ts   # NextAuth configuration
├── env.ts                # Environment variable schema
├── env.sample            # Environment template
└── package.json          # Dependencies and scripts
```

## 📚 Shared Dependencies

This application uses shared packages from the monorepo:

- `@madrasah/ui` - Shared UI components
- `@madrasah/utils` - Utility functions
- `@madrasah/types` - TypeScript type definitions
- `@madrasah/hooks` - Shared React hooks

## 🐛 Troubleshooting

### Common Issues

1. **Keycloak Connection Issues**
   - Verify `KEYCLOAK_ISSUER` URL is accessible
   - Check client configuration in Keycloak admin
   - Ensure redirect URIs match exactly

2. **Environment Variable Errors**
   - Verify all required variables are set
   - Check variable names match `env.ts` schema
   - Restart development server after changes

3. **Authentication Callback Errors**
   - Verify redirect URI in Keycloak client settings
   - Check `NEXTAUTH_URL` matches your domain
   - Ensure client secret is correct

### Debugging

Enable NextAuth.js debug mode:

```env
NEXTAUTH_DEBUG=true
```

This will provide detailed logs for authentication flows.

## 📄 License

This project is part of the Madrasah platform by Amel Tech.
