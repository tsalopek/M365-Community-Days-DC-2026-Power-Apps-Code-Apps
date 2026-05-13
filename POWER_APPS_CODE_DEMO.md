# M365 Community Days DC 2026 - Power Apps Code App Demo Steps

This guide contains all necessary steps to transform the existing web app which uses SharePoint REST APIs  into a Power Apps Code App which uses Dataverse during the live demonstration.

## Prerequisites
- Power Apps CLI (`pac`) installed
- Active Power Apps environment
- Node.js 16+ installed

---

## Step 1: Update Package Dependencies

Add the following dev dependencies to `package.json`:

```json
{
  "devDependencies": {
    "concurrently": "^9.2.0",
    "@microsoft/power-apps": "^1.0.3"
  }
}
```

Add the following dependencies to `package.json`:

```json
{
  "dependencies": {
    "@microsoft/power-apps-vite": "^1.0.2",
  }
}
```

```bash
npm install
```

---

## Step 2: Authenticate with Power Platform

```bash
pac auth create --environment <environment ID> --cloud UsGovHigh
```

This establishes authentication with the target Power Apps environment.

---

## Step 3: Initialize Power Apps Code Project

```bash
pac code init --displayName "Name of the Application" --cloud gcchigh --environment <environment ID>
```

This creates the Power Apps Code configuration and sets up the project structure.

There is currently a known issue in GCC High requiring that you make an edit to the `node_modules\@microsoft\power-apps-cli\dist\Verbs\Init.js` file and then use the following command instead:

```tsx
// if (!environmentExists) {
//     throw new Error(`Environment '${environmentId}' not found. Please verify the environment ID and ensure you have access to it.`);
// }
```

Run the following command:

```bash
npx power-apps init --cloud gcchigh -e <environment ID> --display-name "Name of the Application"
```

---

## Step 4: Update NPM Scripts

Update the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"vite\" \"pac code run\""
  }
}
```

This allows running both Vite dev server and Power Apps Code SDK simultaneously.

---

## Step 5: Update Vite Config

```tsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { powerApps } from "@microsoft/power-apps-vite/plugin"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), powerApps()],
});

```

---

## Step 6: Install Dependencies

```bash
npm install
```

---

## Step 7: Review Power Apps Configuration

Examine the generated `power.config.json` file to understand:
- App ID and display name
- Build path (should be `./dist`)
- Build entry point (should be `index.html`)
- Environment and region settings

---

## Step 8: Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder with relative asset paths.

---

## Step 9: Push to Power Apps

```bash
pac code push
```

This uploads the built application to the Power Apps environment. The CLI will provide a URL to test the app.

---

## Step 10: Inspect Dataverse Table

Navigate to the Dataverse environment and examine the `cr552_m365communitydayssessions` table to understand:
- Available columns (title, speaker, description, timeSlot, room, track)
- Existing session records
- Field naming conventions (cr552_ prefix)

---

## Step 11: Generate Data Source Types

```bash
pac code add-data-source -a dataverse -t cr552_m365communitydayssessions
```

This generates TypeScript types and services in `src/generated/` for:
- `Cr552_m365communitydayssessionsesModel` (interface definitions)
- `Cr552_m365communitydayssessionsesService` (data access service)

---

## Step 12: Review Generated Code

Examine the `src/generated/` folder to see:
- Model definitions with strongly-typed properties
- Service class with methods like `getAll()`
- Auto-generated interfaces matching Dataverse schema

---

## Step 13: Update SessionsList Component

Remove authentication requirements and switch to Dataverse data source:

### 13a: Remove MSAL Authentication
Delete these files:
- `src/services/msal.ts`
- `src/hooks/useAuth.ts`

### 13b: Update SessionsList.tsx Imports
```tsx
import { Cr552_m365communitydayssessionsesModel, Cr552_m365communitydayssessionsesService } from '@/generated'
```

Remove:
```tsx
import { useAuth } from '@/hooks/useAuth'
```

### 13c: Remove useAuth Hook Usage
Delete these lines:
```tsx
const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth()
```

Remove authentication UI (sign-in button, sign-out button, auth checks).

### 13d: Update useEffect to Fetch from Dataverse
Replace the fetch logic with:

```tsx
useEffect(() => {
    const fetchSessions = async () => {
        try {
            setLoading(true)
            setError(null)

            const result = await Cr552_m365communitydayssessionsesService.getAll() as { 
                data: Cr552_m365communitydayssessionsesModel.Cr552_m365communitydayssessionses[] 
            }
            
            const data: Cr552_m365communitydayssessionsesModel.Cr552_m365communitydayssessionses[] = result.data

            const mappedSessions: Session[] = data.map(
                (item: Cr552_m365communitydayssessionsesModel.Cr552_m365communitydayssessionses, index: number) => ({
                    id: index,
                    title: item.cr552_title || '',
                    speaker: item.cr552_speaker || '',
                    description: item.cr552_description || '',
                    timeSlot: item.cr552_timeslot || '',
                    room: item.cr552_room || '',
                    track: item.cr552_track || 'Unassigned',
                })
            )

            setSessions(mappedSessions)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch sessions'
            setError(message)
            console.error('Error fetching sessions:', err)
        } finally {
            setLoading(false)
        }
    }

    fetchSessions()
}, [])
```

### 13e: Simplify JSX Rendering
Remove authentication checks. The component should render directly without auth UI:

```tsx
return (
    <section className={styles.section} id="sessions">
        <div className={styles.container}>
            <h2>Sessions</h2>

            {loading && <p>Loading sessions...</p>}
            {error && <p style={{ color: 'orange' }}>⚠️ {error}</p>}

            {!loading && (
                <>
                    <div className={styles.filters}>
                        {/* Filter buttons */}
                    </div>
                    <div className={styles.sessionGrid}>
                        {/* Session cards */}
                    </div>
                </>
            )}
        </div>
    </section>
)
```

---

## Step 14: Rebuild and Deploy

```bash
npm run build
pac code push
```

The application now fetches sessions directly from Dataverse instead of SharePoint REST API.

---

## Verification Checklist

- [ ] Authentication successful with Power Platform
- [ ] Power Apps Code project initialized
- [ ] Dependencies installed (concurrently, @microsoft/power-apps)
- [ ] Dev script configured for concurrent Vite + pac code run
- [ ] power.config.json reviewed
- [ ] Build completes successfully
- [ ] Application pushed to Power Apps environment
- [ ] Dataverse table examined
- [ ] Data source generated (src/generated/)
- [ ] SessionsList component updated to use Dataverse
- [ ] MSAL and useAuth removed
- [ ] Application rebuilt and re-pushed
- [ ] Sessions display from Dataverse in Power Apps

---

## Troubleshooting

**Known Issue with Init and Push**: There is a known issue with `pac code init` and `pac code push` commands. For details and updates, see [GitHub Issue #331](https://github.com/microsoft/PowerAppsCodeApps/issues/331).

**Build errors after adding data source:**
- Ensure `src/generated/` folder exists and contains models
- Check TypeScript strict mode compatibility
- Rebuild with `npm run build`

**MIME type errors in Power Apps:**
- Verify relative asset paths in `dist/index.html` (should be `./assets/...`)
- Check `vite.config.ts` has `base: './'`

**Dataverse connection fails:**
- Verify environment ID is correct
- Check `pac auth create` completed successfully
- Ensure user has permissions on the Dataverse table

---

## Demo Narrative Flow

1. **Start**: Show the current website connecting to SharePoint
2. **Authentication**: Run `pac auth create` to establish Power Platform connection
3. **Initialization**: Run `pac code init` to prepare Power Apps infrastructure
4. **Configuration**: Review `power.config.json` and explain Power Apps Code structure
5. **Data Integration**: Run `pac code add-data-source` to generate Dataverse types
6. **Code Update**: Update SessionsList to use generated Dataverse service
7. **Build & Deploy**: Run build and push to show automated deployment
8. **Result**: Show application now pulling live Dataverse data in Power Apps environment

---

**Total Demo Time**: ~20-25 minutes (excluding detailed code explanations)
