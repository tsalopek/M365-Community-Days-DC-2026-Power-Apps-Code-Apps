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
All dynamic content lives in [src/config/eventConfig.ts](src/config/eventConfig.ts) (571 lines). Two key objects:
- `eventConfig.event`: Metadata (dates, location, description, ticket URL, charity partner)
- `eventConfig.sessions`: Array of session objects (id, title, speaker, description, timeSlot, room, track)

Components **import and consume** this config directly—no backend API calls. To add sessions/events: modify this file only.

### Component Conventions
- Location: [src/components/](src/components/) - each component paired with `.module.css`
- Functional components with `React.FC` type annotation
- **Client Components**: Use `'use client';` directive (e.g., SessionsList with useState for filtering)
- **Server Components**: No directive (Header, Hero, Details, Footer—static content)
- Import config: `import { eventConfig } from '@/config/eventConfig'` (path alias via tsconfig baseUrl)

## Key Patterns

### Filtering & State
[SessionsList.tsx](src/components/SessionsList.tsx) exemplifies client-side filtering:
- `useState<string | null>(selectedTrack)` tracks active filter
- Derives unique tracks: `[...new Set(eventConfig.sessions.map(s => s.track))]`
- Renders conditional UI: `selectedTrack ? filter : all`
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
Edit [eventConfig.ts](src/config/eventConfig.ts), append to `sessions` array:
```typescript
{
    id: 99,
    title: "Session Title",
    speaker: "Name",
    description: "...",
    timeSlot: "HH:MM AM/PM - HH:MM AM/PM",
    room: "Room Name",
    track: "Track Name"  // Creates filter button automatically
}
```
SessionsList auto-derives tracks and updates filter buttons—no component changes needed.

### Updating Event Metadata
Modify properties under `eventConfig.event` in [eventConfig.ts](src/config/eventConfig.ts). Components consuming these (Hero, Details) auto-reflect changes via re-renders.

### Adding a New Section
1. Create component in [src/components/](src/components/): `YourSection.tsx` + `YourSection.module.css`
2. Export as named export: `export const YourSection: React.FC = () => { ... }`
3. Import in [src/app/page.tsx](src/app/page.tsx) and add to JSX render sequence
4. Use path alias imports: `import { eventConfig } from '@/config/eventConfig'`

## Important Notes
- No backend/API—purely static Next.js with client-side state
- Event config changes don't require rebuilds for dev; hot reload via Next.js HMR
- All components are React 18 functional components; no class components
- Avoid direct DOM manipulation—use React state/props patterns
- TypeScript strict mode catches type errors early
