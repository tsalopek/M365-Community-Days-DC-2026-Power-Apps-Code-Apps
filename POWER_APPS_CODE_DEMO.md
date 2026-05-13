# M365 Community Days DC 2026 - Power Apps Code App Demo Steps

This guide contains all necessary steps to transform the existing web app which uses SharePoint REST APIs into a Power Apps Code App that uses Dataverse during the live demonstration.

## Prerequisites
- Power Apps CLI (`pac`) installed
- Active Power Apps environment
- Node.js 16+ installed

---

## Step 1: Update package dependencies and scripts

Open `package.json` and add or merge the following entries:

```json
{
  "dependencies": {
    "@microsoft/power-apps-vite": "^1.0.2"
  },
  "devDependencies": {
    "concurrently": "^9.2.0",
    "@microsoft/power-apps": "^1.0.3"
  },
  "scripts": {
    "dev": "concurrently \"vite\" \"pac code run\""
  }
}
```

Then install the updated dependencies:

```bash
npm install
```

---

## Step 2: Authenticate with Power Platform

```bash
pac auth create --environment <environment ID> --cloud UsGovHigh
```

This establishes authentication with the target Power Apps environment. Substitute a different cloud if your environment is not GCC High.

---

## Step 3: Initialize the Power Apps Code project

```bash
pac code init --displayName "Name of the Application" --cloud gcchigh --environment <environment ID>
```

This creates the Power Apps Code configuration and project metadata.

If the CLI fails in GCC High, comment out the environment validation in `node_modules/@microsoft/power-apps-cli/dist/Verbs/Init.js`:

```tsx
// if (!environmentExists) {
//     throw new Error(`Environment '${environmentId}' not found. Please verify the environment ID and ensure you have access to it.`);
// }
```

Then retry with the workaround command:

```bash
npx power-apps init --cloud gcchigh -e <environment ID> --display-name "Name of the Application"
```

---

## Step 4: Update Vite config

Update `vite.config.ts` to use the Power Apps Vite plugin and ensure relative asset paths.

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { powerApps } from '@microsoft/power-apps-vite/plugin'

export default defineConfig({
  plugins: [react(), powerApps()],
  base: './',
})
```

---

## Step 5: Install dependencies again

If you already ran `npm install` in Step 1, you can skip this step unless you updated `package.json` again.

```bash
npm install
```

---

## Step 6: Review Power Apps Configuration

Examine the generated `power.config.json` file to understand:
- App ID and display name
- Build path (should be `./dist`)
- Build entry point (should be `index.html`)
- Environment and region settings

---

## Step 7: Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder with relative asset paths.

---

## Step 8: Push to Power Apps

```bash
pac code push
```

This uploads the built application to the Power Apps environment. The CLI will provide a URL to test the app.

---

## Step 9: Inspect Dataverse Table

Navigate to the Dataverse environment and examine the `cra20_m365communitydayssessions` table to understand:
- Available columns (title, speaker, description, timeSlot, room, track)
- Existing session records
- Field naming conventions (cr552_ prefix)

---

## Step 10: Generate Data Source Types

```bash
pac code add-data-source -a dataverse -t cra20_m365communitydayssessions
```

This generates TypeScript types and services in `src/generated/` for:
- `Cra20_m365communitydayssessionsesModel` (interface definitions)
- `Cra20_m365communitydayssessionsesService` (data access service)

---

## Step 11: Review Generated Code

Examine the `src/generated/` folder to see:
- Model definitions with strongly-typed properties
- Service class with methods like `getAll()`
- Auto-generated interfaces matching Dataverse schema

---

## Step 12: Update SessionsList Component

Remove authentication requirements and switch to Dataverse data source:

### 12a: Remove MSAL Authentication
Delete these files:
- `src/services/msal.ts`
- `src/hooks/useAuth.ts`

### 12b: Update SessionsList.tsx imports
```tsx
import { Cra20_m365communitydayssessionsesModel, Cra20_m365communitydayssessionsesService } from '@/generated'
```

Remove:
```tsx
import { useAuth } from '@/hooks/useAuth'
```

### 12c: Remove useAuth hook usage
Delete these lines:
```tsx
const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth()
```

Remove authentication UI (sign-in button, sign-out button, auth checks).

### 12d: Update useEffect to Fetch from Dataverse
Replace the fetch logic with:

```tsx
useEffect(() => {
    const fetchSessions = async () => {
        try {
            setLoading(true)
            setError(null)

            const result = await Cra20_m365communitydayssessionsesService.getAll() as { 
                data: Cra20_m365communitydayssessionsesModel.Cra20_m365communitydayssessionses[] 
            }
            
            const data: Cra20_m365communitydayssessionsesModel.Cra20_m365communitydayssessionses[] = result.data

            const mappedSessions: Session[] = data.map(
                (item: Cra20_m365communitydayssessionsesModel.Cra20_m365communitydayssessionses, index: number) => ({
                    id: index,
                    title: item.cra20_title || '',
                    speaker: item.cra20_speaker || '',
                    description: item.cra20_description || '',
                    timeSlot: item.cra20_timeslot || '',
                    room: item.cra20_room || '',
                    track: item.cra20_track || 'Unassigned',
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

### 12e: Simplify JSX Rendering
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

## Step 13: Rebuild and Deploy

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

**Total Demo Time**: ~20-25 minutes (excluding detailed code explanations)

---

## Resources

- [Power Apps code apps overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
- [Your first code app](https://github.com/microsoft/SLG-Business-Applications/blob/main/white-papers/your-first-code-app.md)
