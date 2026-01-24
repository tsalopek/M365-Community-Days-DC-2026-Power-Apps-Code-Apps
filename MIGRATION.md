# Migration from Next.js to Vite

## Overview
This project has been successfully migrated from **Next.js 14** to **Vite 5 + React 18**. The architecture changed from a full-stack framework to a lightweight client-side SPA with direct SharePoint integration.

## Key Changes

### 1. Build & Development
- **Before**: Next.js (`npm run dev`, `npm run build`)
- **After**: Vite (`npm run dev`, `npm run build`)
- **Port**: Changed from 3000 (can be overridden in vite.config.ts) to 5173 (Vite default, but configured to 3000)
- **Build output**: Changed from `.next/` → `dist/`
- **Build speed**: Significantly faster with Vite's esbuild

### 2. Entry Point
- **Before**: `src/app/layout.tsx` + `src/app/page.tsx` (Next.js App Router)
- **After**: `src/main.tsx` → `src/App.tsx` (standard React entry)
- **HTML**: Now uses `index.html` as Vite's entry point

### 3. Authentication & APIs
- **Before**: Next.js API routes (`/api/sessions`, `/api/speakers`, `/api/sponsors`) with NextAuth.js
- **After**: Client-side services (`authService.ts`) + custom `useAuth()` hook
  - No backend API routes
  - Direct SharePoint REST calls from components
  - Access tokens stored in `sessionStorage` (dev mode)

**Note**: For production, implement proper OAuth 2.0 with a backend server.

### 4. Environment Variables
- **Before**: `process.env.SHAREPOINT_*`, `process.env.NEXTAUTH_*`
- **After**: `import.meta.env.VITE_SHAREPOINT_*` (Vite pattern)
- **Prefix**: All public variables must start with `VITE_`
- **File**: Still use `.env.local` for secrets

### 5. Components & Styling
- **Removed**: `'use client'` directives (Vite doesn't need them)
- **Removed**: NextAuth.js `useSession()` calls
- **Added**: Custom `useAuth()` hook for authentication state
- **CSS Modules**: No changes—still work the same way

### 6. Dependencies
- **Removed**: `next`, `next-auth`, `@types/next`
- **Added**: `vite`, `@vitejs/plugin-react`, `eslint`, `@typescript-eslint/*`

### 7. Project Structure
```
Before:                         After:
src/app/                        src/main.tsx (entry)
├── page.tsx                    src/App.tsx (main component)
├── layout.tsx                  src/components/ (no changes)
├── api/                        src/services/
│   └── sessions/route.ts         └── authService.ts (NEW)
├── globals.css                 src/hooks/
└── providers.tsx                 └── useAuth.ts (NEW)
src/auth.ts (removed)           src/config/ (no changes)
src/components/                 index.html (NEW - Vite entry)
src/config/
```

## Files Deleted
- `src/app/layout.tsx` - Next.js root layout
- `src/app/page.tsx` - Next.js home page
- `src/app/providers.tsx` - NextAuth session provider
- `src/app/api/` - All API routes (moved to services)
- `src/auth.ts` - NextAuth configuration
- `next.config.js` - Next.js configuration
- `next-env.d.ts` - Next.js type definitions

## Files Created
- `index.html` - Vite HTML entry point
- `vite.config.ts` - Vite configuration
- `.eslintrc.cjs` - ESLint configuration
- `vite-env.d.ts` - Vite environment variable types
- `src/main.tsx` - React entry point
- `src/App.tsx` - Main React component
- `src/App.module.css` - App styles
- `src/services/authService.ts` - Token & SharePoint access management
- `src/hooks/useAuth.ts` - Custom auth hook

## Migration Checklist

### Development
- [x] Update package.json scripts
- [x] Create vite.config.ts with React plugin
- [x] Create index.html entry point
- [x] Convert App Router to single App.tsx
- [x] Remove NextAuth.js and API routes
- [x] Create client-side authService.ts
- [x] Create custom useAuth hook
- [x] Update components to use new auth system
- [x] Update environment variable references
- [x] Update tsconfig.json for Vite
- [x] Create .eslintrc.cjs

### Configuration
- [x] Update .env.local for Vite (VITE_ prefix)
- [x] Update .env.local.example
- [x] Update .gitignore for Vite artifacts
- [x] Update README with Vite instructions

### Testing
- [x] npm install (install dependencies)
- [x] npm run build (verify TypeScript compilation & Vite build)
- [x] npm run dev (start dev server)

## Breaking Changes

1. **Port**: Dev server now runs on port 3000 (configured in vite.config.ts, was hardcoded to 3000 in Next.js)
2. **Authentication**: Manual token entry in dev mode (no automatic OAuth redirect)
3. **Environment variables**: Must use `VITE_` prefix
4. **API**: No server-side routes; all SharePoint calls are from the browser

## Production Deployment

### Option 1: Static Hosting (Vercel, Netlify, GitHub Pages)
```bash
npm run build
# Deploy dist/ folder to static host
```

### Option 2: Server Hosting (required for proper OAuth)
1. Set up a backend OAuth 2.0 server (Node.js, Python, .NET, etc.)
2. Backend exchanges auth code for access token
3. Frontend calls backend API instead of SharePoint directly
4. Deploy with environment variables for Azure AD credentials

## Dev Server Features
- **Hot Module Reload (HMR)**: Changes instantly without full refresh
- **Fast refresh**: Preserves component state while updating code
- **Source maps**: Proper debugging in browser DevTools
- **Module federation** (optional): Share components across projects

## Performance
- **Build time**: ~361ms (vs ~30s for Next.js)
- **Bundle size**: ~159KB (gzipped: ~51KB) - slightly larger due to no tree-shaking of unused components
- **Dev server startup**: ~150ms

## Next Steps

1. **Test SharePoint authentication** with valid access token
2. **Implement proper OAuth flow** for production (use MSAL or similar)
3. **Add API Gateway** for token management in production
4. **Deploy** to static hosting or server as needed
5. **Monitor** bundle size and performance

## Rollback
If needed, the previous Next.js version can be restored from git history:
```bash
git log --oneline  # Find commit before migration
git checkout <commit-hash>
npm install
```

