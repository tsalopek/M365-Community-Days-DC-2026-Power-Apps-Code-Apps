# Copilot Instructions for M365 Community Days DC 2026

## Project Overview
Next.js event website for M365 Community Days DC 2026 (Jan 29-30). Displays event details, session listings, and sponsor information with client-side filtering.

## Architecture & Data Flow

### Page Structure
Entry point: [src/app/page.tsx](src/app/page.tsx) - renders sequential sections via component composition:
```
Home → Header → HeroImage → Hero → SessionsList → Details → Sponsors → Footer
```

### Configuration Pattern
Event metadata lives in [src/config/eventConfig.ts](src/config/eventConfig.ts) (571 lines):
- `eventConfig.event`: Metadata (dates, location, description, ticket URL, charity partner)

Sessions are **fetched dynamically** from a SharePoint list:
- REST endpoint: `https://andworx.sharepoint.com/sites/M365CommunityDaysDC2026/_api/web/lists/GetByTitle('M365 Community Days DC 2026 Sessions')/items`
- [SessionsList.tsx](src/components/SessionsList.tsx) fetches on mount via `useEffect`
- Maps SharePoint columns (Title, Speaker, Description, TimeSlot, Room, Track) to Session interface
- Handles loading/error states gracefully

### Component Conventions
- Location: [src/components/](src/components/) - each component paired with `.module.css`
- Functional components with `React.FC` type annotation
- **Client Components**: Use `'use client';` directive (e.g., SessionsList with useState for filtering)
- **Server Components**: No directive (Header, Hero, Details, Footer—static content)
- Import config: `import { eventConfig } from '@/config/eventConfig'` (path alias via tsconfig baseUrl)

## Key Patterns

### Filtering & State
[SessionsList.tsx](src/components/SessionsList.tsx) exemplifies data fetching and client-side filtering:
- `useEffect` hook fetches sessions from SharePoint on component mount
- `useState<Session[]>(sessions)` stores fetched data
- `useState<string | null>(selectedTrack)` tracks active filter
- Derives unique tracks: `[...new Set(sessions.map(s => s.track))]`
- Renders conditional UI with loading/error states
- CSS toggle: `${styles.active}` class for visual state

### Styling
CSS Modules (`.module.css`) scoped to components. Import as: `import styles from './Component.module.css'`
Apply: `className={styles.sectionClass}` or `className={`${styles.btn} ${condition ? styles.active : ''}`}`

## Build & Development

### Available Scripts
```bash
npm run dev      # Start Next.js dev server (localhost:3000)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Next.js ESLint
```

### TypeScript Configuration
- **Strict mode**: `"strict": true` enforced
- **Path alias**: `@/*` maps to `./src/*` (required for imports)
- **Target**: ES2017
- No test script—test manually via dev server

## Common Tasks

### Adding a Session
Add a new item to the SharePoint list at: https://andworx.sharepoint.com/sites/M365CommunityDaysDC2026/Lists/M365%20Community%20Days%20DC%202026%20Sessions

Required columns:
- **Title**: Session title
- **Speaker**: Speaker name
- **Description**: Session description
- **TimeSlot**: Format "HH:MM AM/PM - HH:MM AM/PM" (e.g., "9:00 AM - 9:30 AM")
- **Room**: Room/location name
- **Track**: Track category (creates filter button automatically)

SessionsList auto-fetches on page load and derives tracks for filter buttons—no code changes needed.

### Updating Event Metadata
Modify properties under `eventConfig.event` in [eventConfig.ts](src/config/eventConfig.ts). Components consuming these (Hero, Details) auto-reflect changes via re-renders.

### Adding a New Section
1. Create component in [src/components/](src/components/): `YourSection.tsx` + `YourSection.module.css`
2. Export as named export: `export const YourSection: React.FC = () => { ... }`
3. Import in [src/app/page.tsx](src/app/page.tsx) and add to JSX render sequence
4. Use path alias imports: `import { eventConfig } from '@/config/eventConfig'`

## Important Notes
- Sessions are fetched from SharePoint REST API via [src/app/api/sessions/route.ts](src/app/api/sessions/route.ts) (proxied server-side to avoid CORS)
- **Fallback to hardcoded config**: If SharePoint is unavailable or returns 401/403, sessions default to [eventConfig.ts](src/config/eventConfig.ts)
- Event metadata remains static in eventConfig.ts
- Client component (SessionsList) handles loading states gracefully
- No backend authentication—purely static Next.js with dynamic data fetching
- Event config changes don't require rebuilds for dev; hot reload via Next.js HMR
- All components are React 18 functional components; no class components
- Avoid direct DOM manipulation—use React state/props patterns
- TypeScript strict mode catches type errors early
