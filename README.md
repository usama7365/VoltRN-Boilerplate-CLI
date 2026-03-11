# demo

This project was bootstrapped with [VoltRN Boilerplate CLI](https://www.npmjs.com/package/create-voltrn-boilerplate).

## Features

- **Framework:** Expo (managed workflow)
- **Navigation:** Expo Router (file-based routing)
- **Internationalization (i18n):** react-i18next with MMKV storage
- **Authentication:** JWT-based auth flow with @forward-software/react-auth
- **Theming:** Dark/Light mode with system detection and MMKV persistence
- **Splash Screen:** react-native-bootsplash with auto-hide
- **App Icons:** @forward-software/react-native-toolbox
- **TypeScript:** Strict mode enabled

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Expo CLI (`npx expo`)
- [Watchman](https://facebook.github.io/watchman/) (recommended)

## Getting Started

```bash
cd demo
npm install

# Required: generate native code for react-native-mmkv
npx expo prebuild
```

## Running the App

```bash
npx expo start -c
```

## Authentication Flow

This project includes a complete JWT-based authentication flow powered by [@forward-software/react-auth](https://www.npmjs.com/package/@forward-software/react-auth).

The example uses the [Platzi Fake Store API](https://fakeapi.platzi.com/en/about/introduction/) as a demo backend.

**Demo login credentials**

The API no longer accepts `changeme` — the demo user passwords on the server have been updated. Use these credentials:

| Email             | Password   |
|-------------------|------------|
| john@mail.com     | 123456789  |
| maria@mail.com    | 12345      |
| admin@mail.com    | admin123   |

Login with `john@mail.com` + `123456789` returns 201 and tokens; use these in the app when testing.

### Routes

**Public:**
- IntroScreen
- LoginScreen
- PublicHomeScreen

**Private (Tabs):**
- PrivateHomeScreen
- ProfileScreen
- SettingsScreen

**Private (Stack):**
- DetailsScreen

### Environment Management

Environment variables are stored in `.env.*` files (gitignored):

- `.env.development` Development environment
- `.env.staging` Staging environment
- `.env.production` Production environment
- `.env.example` Template with required keys (committed to git)

Switch environments using:

```bash
npm run env:dev      # Development
npm run env:stage    # Staging
npm run env:prod     # Production
```

This generates `src/env/env.js` (also gitignored) which is imported via `@env/env`.

## Internationalization (i18n)

This project uses [react-i18next](https://react.i18next.com/) with [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) for language persistence.

### Translation Files

Translations are located in `src/i18n/locales/`:

- `en.json` - English (default)
- `it.json` - Italian

### Adding a New Language

1. Create a new JSON file in `src/i18n/locales/` (e.g., `fr.json`)
2. Add the language to `src/i18n/languageConfig.ts`
3. Import and register it in `src/i18n/i18n.ts`

> **Note:** Since i18n uses `react-native-mmkv` (a native module), you must run `npx expo prebuild` before starting the app.

## Theming (Dark/Light Mode)

This project includes a theming system with dark/light mode support.

### Color Scheme Modes

- **Light** - Light theme
- **Dark** - Dark theme
- **System** (default) - Follows device system preference

### Usage

```tsx
import { useTheme } from '@theme';

function MyComponent() {
  const { theme, colorScheme, setColorScheme, isDark } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
}
```

### Customization

Edit color tokens in `src/theme/colors.ts` to match your brand.
The theme toggle is located in the Settings screen.

### Persistence

Theme preference is persisted using MMKV storage and restored on app launch.

## App Icons & Splash Screen

This project uses [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) for splash screens and [@forward-software/react-native-toolbox](https://github.com/forwardsoftware/react-native-toolbox) for app icon generation.

### Customize Splash Screen

1. Replace `assets/splashscreen.svg` (or `.png`) with your own logo
   - SVG recommended for best quality at all densities
   - If using PNG: minimum **1024x1024px**
2. Run:

```bash
npm run assets:splash
```

Available flags for customization:

| Flag | Description | Default |
|------|-------------|---------|
| `--background` | Background color (hex) | `1A1A2E` |
| `--logo-width` | Logo width at @1x in dp | `150` |
| `--platforms` | Target platforms | `android,ios` |
| `--dark-background` | Dark mode background (license key required) |  -|
| `--dark-logo` | Dark mode logo path (license key required) |  -|

### Customize App Icon

1. Replace `assets/icon.png` with your own image (PNG format, minimum **1024x1024px**)
2. Run:

```bash
npm run assets:icons
```

This generates all required sizes for both iOS and Android automatically.

## Project Structure

```
app/                    # File-based routing (Expo Router)
  (auth)/               # Auth route group
  (tabs)/               # Tab route group
  _layout.tsx
src/
  screens/              # Screen components
  components/           # Reusable components
  i18n/                 # Internationalization
    locales/            # Translation files
  mmkv/                 # MMKV storage setup
  theme/                # Theming system (dark/light mode)
  auth/                 # Auth client (JWT)
  hooks/                # Custom hooks
  env/                  # Environment configuration
scripts/
  set-environment.js    # Environment switching script
tsconfig.json
babel.config.js
```

## Path Aliases

The following import aliases are configured in `babel.config.js` and `tsconfig.json`:

| Alias | Path |
|-------|------|
| `@components/*` | `src/components/*` |
| `@screens/*` | `src/screens/*` |
| `@i18n/*` | `src/i18n/*` |
| `@mmkv/*` | `src/mmkv/*` |
| `@theme` | `src/theme` |
| `@auth/*` | `src/auth/*` |
| `@hooks/*` | `src/hooks/*` |
| `@env/*` | `src/env/*` |

## License

This project is licensed under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

---

Generated with [VoltRN Boilerplate CLI](https://www.npmjs.com/package/create-voltrn-boilerplate)