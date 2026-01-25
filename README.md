# M365 Community Days DC 2026 Event Website

# Heads up, this repo is HEAVILY vibe coded, the intent of this repo is simply to demonstrate Power Apps Code Apps (Cut me some slack :D)

A modern event website built with **Vite** and **React 18** for M365 Community Days DC 2026 (January 29-30). Features event details, session listings with live filtering, sponsor information, and countdown timer.

## 📌 Branch Information

**Current Branch: `sharePoint-datasource-demo-start`**

This branch represents the beginning of the M365 Community Days DC demonstration. At this point, we have a functional website that connects to SharePoint as a data source using Azure AD authentication and MSAL. Sessions are dynamically fetched from SharePoint REST API.

**Note**: This branch cannot yet be deployed to Power Apps. The demonstration will progress through additional branches showing the migration path to Power Apps deployment.

## 🎯 Project Overview

This is a client-side React SPA with the following characteristics:
- **Vite** for lightning-fast development and optimized builds
- **React 18** for fast, reactive UI components
- **Client-side filtering** for dynamic session views by track
- **SharePoint REST API integration** for dynamic sessions data
- **Azure AD authentication** via MSAL (OAuth 2.0 with popup flow)
- **CSS Modules** for scoped, maintainable styling
- **TypeScript strict mode** for type safety

Sessions are fetched from SharePoint after authentication. Sponsors use static data.

## 📁 Project Structure

```
src/
├── main.tsx                # Vite entry point
├── App.tsx                 # Main app component
├── globals.css             # Global styles
├── components/             # React components (each with paired .module.css)
│   ├── Header.tsx
│   ├── HeroImage.tsx
│   ├── Hero.tsx
│   ├── SessionsList.tsx    # Client component with filtering
│   ├── Details.tsx
│   ├── Sponsors.tsx
│   ├── Footer.tsx
│   └── Countdown.tsx
├── config/
│   └── eventConfig.ts      # Event metadata & SharePoint URLs
├── services/
│   └── authService.ts      # SharePoint access token management
├── hooks/
│   └── useAuth.ts          # Custom auth hook
└── vite-env.d.ts           # Vite environment variable types
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm (or yarn/pnpm)

### Installation
```bash
npm install
```

### Environment Setup

1. **Copy the environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Update SharePoint URLs** (if needed):
   - Edit `.env.local` to add your SharePoint list REST API URLs
   - Format: `https://{tenant}.sharepoint.com/sites/{site}/_api/web/lists/GetByTitle('{list-name}')/items`

3. **For Production: Set up OAuth 2.0 with Azure AD**
   - Go to [Azure Portal](https://portal.azure.com)
   - Navigate to **Azure Active Directory > App registrations > New registration**
   - Name: "M365 Community Days DC"
   - Configure **Implicit grant** or use **Authorization Code Flow with PKCE** for SPA
   - Add Redirect URI: `http://localhost:3000` (for dev), or your production URL

### Development
```bash
npm run dev
```
Opens at [http://localhost:3000](http://localhost:3000) with Vite's hot reload enabled (HMR).

### Production Build
```bash
npm run build
```
Outputs optimized bundle to `dist/` directory.

### Preview Built Site
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 📋 Event Details

- **Event**: M365 Community Days DC 2026
- **Dates**: Thursday, January 29 – Friday, January 30, 2026
- **Location**: Microsoft Innovation Hub, Arlington, VA
- **Doors Open**: 8:30 AM | Sessions: 9:00 AM – 5:00 PM
- **Ticket**: $20 USD
- **Registration**: [aka.ms/m365dc/ticket](https://aka.ms/m365dc/ticket)
- **Charity Partner**: [Computer CORE](https://www.computercore.org/)

## 🎓 Content Management

### Adding a Session
Add a new item to the SharePoint list: [M365 Community Days DC 2026 Sessions](https://andworx.sharepoint.com/sites/M365CommunityDaysDC2026/Lists/M365%20Community%20Days%20DC%202026%20Sessions)

Required columns:
- **field_1** (Title): Session title
- **field_2** (Speaker): Speaker name
- **field_3** (Description): Session description
- **field_4** (TimeSlot): Format "HH:MM AM/PM - HH:MM AM/PM" (e.g., "9:00 AM - 9:30 AM")
- **field_5** (Room): Room/location name
- **field_6** (Track): Track category (automatically creates filter buttons)

The site fetches sessions from SharePoint on load and automatically generates filter buttons based on track categories—no code changes needed.

### Updating Event Info
Modify properties in `eventConfig.event` (dates, location, description, ticket URL, etc.) in `src/config/eventConfig.ts`. All components consuming this data auto-update via React's reactivity.

### Adding a New Section
1. Create `src/components/YourSection.tsx` and `YourSection.module.css`
2. Export as: `export const YourSection: React.FC = () => { ... }`
3. Import and add to the render sequence in `src/App.tsx`

## 🛠️ Development Patterns

### Authentication & API Calls
- **`authService.ts`**: Manages access token lifecycle (store, retrieve, validate, refresh)
- **`useAuth()`**: Custom hook for authentication state (isAuthenticated, isLoading, error)
- **Client-side fetching**: Components use `authService.fetchSharePointList()` to retrieve data

Example usage in SessionsList.tsx:
```typescript
const { isAuthenticated } = useAuth()
const data = await authService.fetchSharePointList(eventConfig.sharePointSessionsUrl)
```

### Styling
CSS Modules are scoped to components:
```tsx
import styles from './Component.module.css';
<button className={styles.buttonClass}>Click me</button>
```

Conditional classes:
```tsx
<div className={`${styles.active} ${isSelected ? styles.highlighted : ''}`}>
```

### Environment Variables
Vite prefixes environment variables with `VITE_`:
```typescript
const url = import.meta.env.VITE_SHAREPOINT_SESSIONS_URL
```

All `VITE_*` variables in `.env.local` are available at runtime.

## 🔧 Technology Stack

- **Framework**: Vite 5 + React 18
- **Language**: TypeScript 5.3+ (strict mode)
- **Styling**: CSS Modules
- **Build Tool**: Vite (Rollup-based)
- **Package Manager**: npm

## 📝 Migration from Next.js

If updating from the Next.js version:

1. **Entry point**: Changed from `src/app/page.tsx` to `src/main.tsx` → `src/App.tsx`
2. **Authentication**: Removed NextAuth.js → Custom client-side auth service
3. **API routes**: Removed `/api/*` routes → Direct SharePoint REST calls from components
4. **Environment variables**: Changed from `process.env.*` to `import.meta.env.VITE_*`
5. **Development port**: Changed from 3000 to 5173
6. **Build output**: Changed from `.next/` to `dist/`

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

For AI agents or code assistants: See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed architectural guidance and project patterns.
