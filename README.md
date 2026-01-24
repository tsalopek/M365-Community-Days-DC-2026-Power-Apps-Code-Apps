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
Edit `src/config/eventConfig.ts` and append to the `sessions` array:

```typescript
{
    id: 99,
    title: "Your Session Title",
    speaker: "Speaker Name",
    description: "Session description...",
    timeSlot: "2:00 PM - 2:45 PM",
    room: "Room Name",
    track: "Track Name"  // Auto-creates filter button
}
```

Track names automatically generate filter buttons in the Sessions section—no code changes needed.

### Updating Event Info
Modify properties in `eventConfig.event` (dates, location, description, ticket URL, etc.). All components consuming this data auto-update via React's reactivity.

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
