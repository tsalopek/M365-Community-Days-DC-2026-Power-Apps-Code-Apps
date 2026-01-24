# M365 Community Days DC 2026 Web App

A modern Next.js web application showcasing the M365 Community Days DC 2026 event. Built with TypeScript and styled with CSS Modules.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Session Management**: Browse and filter sessions by track
- **Event Details**: Complete event information including dates, location, and registration
- **Sponsor Showcase**: Display platinum, gold, and web sponsors
- **Static Config**: All event data managed in a centralized configuration file

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── page.module.css    # Page styles
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── SessionsList.tsx   # Sessions with filtering
│   ├── Details.tsx        # Event details section
│   ├── Sponsors.tsx       # Sponsors section
│   ├── Footer.tsx         # Footer with links
│   └── *.module.css       # Component-scoped styles
└── config/
    └── eventConfig.ts     # Centralized event data
```

## Event Data Configuration

All event data is stored in [src/config/eventConfig.ts](src/config/eventConfig.ts). To update event information:

1. **Event Details**: Modify the `event` object with dates, location, description, etc.
2. **Sessions**: Add or update sessions in the `sessions` array
3. **Speakers**: Manage speakers in the `speakers` array
4. **Sponsors**: Update sponsor tiers in the `sponsors` object
5. **Social Links**: Update social media in the `social` object

Example:
```typescript
export const eventConfig = {
  event: {
    name: "M365 Community Days DC 2026",
    location: { ... },
    dates: { ... }
  },
  sessions: [ ... ],
  sponsors: { ... }
};
```

## Development

### Prerequisites
- Node.js 16+ and npm/yarn

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to view the app.

## Sections

- **Header**: Navigation menu
- **Hero**: Event title, tagline, and registration CTA
- **Sessions**: Filterable session cards by track
- **Details**: Event logistics, dates, location, and charity partner info
- **Sponsors**: Tiered sponsor listings (Platinum, Gold, Web)
- **Footer**: Quick links and social media

## Styling

This project uses CSS Modules for component-scoped styling. Each component has its own `.module.css` file that prevents style conflicts.

Global styles are defined in [src/app/globals.css](src/app/globals.css).

## Technologies

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Deployment**: Ready for Vercel or any Node.js host

## License

MIT License - See [LICENSE](LICENSE) for details
