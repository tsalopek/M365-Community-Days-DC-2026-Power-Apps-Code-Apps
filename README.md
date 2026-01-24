# M365 Community Days DC 2026 Event Website

A modern event website built with Next.js for M365 Community Days DC 2026 (January 29-30). Features event details, session listings with live filtering, sponsor information, and countdown timer.

## 🎯 Project Overview

This is a static event site demonstrating:
- **Next.js 14** for fast, server-rendered React components
- **Client-side filtering** for dynamic session views by track
- **Configuration-driven content** (single source of truth for all event data)
- **CSS Modules** for scoped, maintainable styling
- **TypeScript strict mode** for type safety

All content is managed through a single configuration file—no backend API required.

## 📁 Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root HTML layout with metadata
│   ├── page.tsx      # Main page entry point
│   ├── page.module.css
│   └── globals.css   # Global styles
├── components/       # React components (each with paired .module.css)
│   ├── Header.tsx
│   ├── HeroImage.tsx
│   ├── Hero.tsx
│   ├── SessionsList.tsx  # Client component with filtering
│   ├── Details.tsx
│   ├── Sponsors.tsx
│   ├── Footer.tsx
│   └── Countdown.tsx
└── config/
    └── eventConfig.ts    # Single source of truth for all event data
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
npm install
```

### Environment Setup
This project requires Azure AD authentication to access SharePoint sessions.

1. **Copy the environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Register an Azure AD Application:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Navigate to **Azure Active Directory > App registrations > New registration**
   - Name: "M365 Community Days DC 2026"
   - Leave defaults and click **Register**

3. **Add Redirect URI (critical for fixing AADSTS500113 error):**
   - In your app registration, go to **Authentication** (left sidebar)
   - Under "Platform configurations", click **Add a platform**
   - Select **Web**
   - Redirect URIs: `http://localhost:3000/api/auth/callback/azure-ad`
   - Click **Configure**

4. **Get credentials:**
   - Go to **Overview** tab → Copy **Application (client) ID** → Paste to `AZURE_AD_CLIENT_ID` in `.env.local`
   - Go to **Certificates & secrets** → **New client secret** → Copy the secret value → Paste to `AZURE_AD_CLIENT_SECRET`
   - Go back to **Overview** → Copy **Tenant ID** → Paste to `AZURE_AD_TENANT_ID`

5. **Generate NextAuth secret:**
   ```bash
   openssl rand -base64 32
   ```
   Copy output to `NEXTAUTH_SECRET` in `.env.local`

**Your `.env.local` should look like:**
```env
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=http://localhost:3000
AZURE_AD_CLIENT_ID=<your-client-id>
AZURE_AD_CLIENT_SECRET=<your-client-secret>
AZURE_AD_TENANT_ID=<your-tenant-id>
```

**Common Issues:**
- **Error: "No reply address is registered"** → You skipped step 3. Make sure to add the redirect URI in the **Authentication** section of your app registration.
- **Error: "Invalid client secret"** → Copy the secret value (not the secret ID) from Azure AD.
- **Sessions not loading after sign-in** → Verify your Azure AD tenant has access to the SharePoint site.

**Security Note:** `.env.local` is in `.gitignore` and will never be committed to the repository. Always use `.env.local.example` as a template and keep actual secrets secure.

### Development
```bash
npm run dev
```
Opens at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

### Production Build
```bash
npm run build
npm run start
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
- **Title**: Session title
- **Speaker**: Speaker name
- **Description**: Session description
- **TimeSlot**: Format "HH:MM AM/PM - HH:MM AM/PM" (e.g., "9:00 AM - 9:30 AM")
- **Room**: Room/location name
- **Track**: Track category (automatically creates filter buttons)

The site fetches sessions from SharePoint on load and automatically generates filter buttons based on track categories—no code changes needed.

### Updating Event Info
Modify properties in `eventConfig.event` (dates, location, description, ticket URL, etc.) in `src/config/eventConfig.ts`. All components consuming this data auto-update via React's reactivity.

### Adding a New Section
1. Create `src/components/YourSection.tsx` and `YourSection.module.css`
2. Export as: `export const YourSection: React.FC = () => { ... }`
3. Import and add to the render sequence in `src/app/page.tsx`

## 🛠️ Development Patterns

### Client vs Server Components
- **Server Components** (default): Static content like Header, Hero, Footer
- **Client Components**: Add `'use client';` at the top (e.g., SessionsList uses `useState` for filtering)

### Imports
Use path aliases (`@/`) for clean imports:
```typescript
import { eventConfig } from '@/config/eventConfig';
import { SessionsList } from '@/components/SessionsList';
```

### Styling
CSS Modules are scoped to components:
```tsx
import styles from './Component.module.css';
<button className={styles.buttonClass}>Click me</button>
```

## 🔧 Technology Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Language**: TypeScript 5.3+ (strict mode)
- **Styling**: CSS Modules
- **Build Tool**: Next.js built-in (Webpack)

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

For AI agents or code assistants: See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed architectural guidance and project patterns.
