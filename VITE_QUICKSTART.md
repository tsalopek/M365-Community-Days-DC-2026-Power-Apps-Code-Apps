# Vite Migration - Quick Reference

## What Changed?
✅ Next.js → Vite (faster build tool)
✅ API routes → Client-side services  
✅ NextAuth → Custom auth hook
✅ `process.env` → `import.meta.env.VITE_*`

## Scripts
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production (output: dist/)
npm run preview  # Preview built site locally
npm run lint     # Run ESLint
```

## Key Files
- `index.html` - Vite entry point
- `src/main.tsx` - React entry
- `src/App.tsx` - Main component
- `vite.config.ts` - Vite config
- `src/services/authService.ts` - Token management
- `src/hooks/useAuth.ts` - Auth state hook

## Authentication (Dev Mode)
1. Open SessionsList section (requires auth)
2. Paste valid SharePoint access token into login prompt
3. Press Enter to authenticate

## Environment Variables
```env
# Required - SharePoint REST API URLs (VITE_ prefix required!)
VITE_SHAREPOINT_SESSIONS_URL=https://...
VITE_SHAREPOINT_SPEAKERS_URL=https://...
VITE_SHAREPOINT_SPONSORS_URL=https://...

# Optional - For future OAuth integration
VITE_AZURE_AD_CLIENT_ID=...
VITE_AZURE_AD_TENANT_ID=...
```

## Common Issues

### "Cannot find module" errors after migration
→ Check that all `process.env.*` are updated to `import.meta.env.VITE_*`

### Dev server not starting
→ Kill any existing processes on port 3000: `lsof -ti:3000 | xargs kill -9`

### Build fails with TypeScript errors
→ Run `npm install` to ensure all dependencies are installed

### SharePoint calls return 401/403
→ Ensure you have valid token and SharePoint list permissions

## Documentation
- Full migration details: [MIGRATION.md](MIGRATION.md)
- Project overview: [README.md](README.md)
- Architecture details: [.github/copilot-instructions.md](.github/copilot-instructions.md)
