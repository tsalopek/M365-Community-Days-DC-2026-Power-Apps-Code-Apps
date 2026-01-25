# M365 Community Days DC 2026 Event Website

A modern single-page application for M365 Community Days DC 2026 (January 29-30). Built with **Vite + React 18**, featuring SharePoint integration for dynamic sessions and MSAL authentication.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dynamic Sessions**: Fetches sessions from SharePoint REST API with live filtering by track
- **Azure AD Authentication**: Secure OAuth 2.0 sign-in with MSAL
- **Event Details**: Complete event information including dates, location, and registration
- **Sponsor Showcase**: Display platinum, gold, and web sponsors from static data
- **Countdown Timer**: Live countdown to event start

## Project Structure

```
src/
├── main.tsx               # Vite entry point
├── App.tsx                # Main React component
├── globals.css            # Global styles
├── components/            # React components (each with .module.css)
│   ├── Header.tsx         # Navigation header
│   ├── HeroImage.tsx      # Hero banner with countdown
│   ├── Hero.tsx           # Event title and description
│   ├── Countdown.tsx      # Event countdown timer
│   ├── SessionsList.tsx   # Sessions with filtering (SharePoint data)
│   ├── Details.tsx        # Event details section
│   ├── Sponsors.tsx       # Sponsors section (static data)
│   ├── Footer.tsx         # Footer with links
│   └── *.module.css       # Component-scoped styles
├── config/
│   ├── eventConfig.ts     # Event metadata & SharePoint URLs
│   └── msalConfig.ts      # MSAL Azure AD configuration
├── data/
│   ├── speakers.ts        # Static speaker data (reference)
│   └── sponsors.ts        # Static sponsor data (used by Sponsors component)
├── hooks/
│   └── useAuth.ts         # Custom authentication hook
└── services/
    └── msal.ts            # MSAL authentication service
```

## Data Sources

### Static Data
- **Event Info**: [src/config/eventConfig.ts](src/config/eventConfig.ts)
- **Sponsors**: [src/data/sponsors.ts](src/data/sponsors.ts)

### Dynamic Data (SharePoint)
- **Sessions**: Fetched from SharePoint REST API on authentication
- SharePoint URLs configured in `.env.local`

## Development

### Prerequisites
- Node.js 16+ and npm
- Azure AD app registration (see [AZURE_AD_SETUP.md](AZURE_AD_SETUP.md))

### Getting Started

```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your SharePoint and Azure AD details

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:3000` (configured in vite.config.ts)

## Sections

- **Header**: Navigation menu with smooth scrolling
- **Hero Image**: Event banner with live countdown timer
- **Hero**: Event title, tagline, and registration CTA
- **Sessions**: Filterable session cards by track (requires sign-in)
- **Details**: Event logistics, dates, location, and charity partner info
- **Sponsors**: Tiered sponsor listings (Platinum, Gold, Web)
- **Footer**: Quick links and social media

## Authentication

Sessions require Azure AD authentication using MSAL:
1. User clicks "Sign in with Microsoft"
2. MSAL popup opens for Azure AD authentication
3. After successful sign-in, sessions are fetched from SharePoint
4. Track filters automatically generate from session data

See [AZURE_AD_SETUP.md](AZURE_AD_SETUP.md) for configuration details.

## Styling

This project uses **CSS Modules** for component-scoped styling. Each component has its own `.module.css` file.

Global styles: [src/globals.css](src/globals.css)

## Technologies

- **Build Tool**: Vite 5
- **Framework**: React 18
- **Language**: TypeScript 5.3+ (strict mode)
- **Authentication**: @azure/msal-browser + @azure/msal-react
- **Styling**: CSS Modules
- **Deployment**: Static SPA (deployable to any static host)

## License

MIT License - See [LICENSE](LICENSE) for details
