# Azure AD & MSAL Setup Guide

## Overview

This Vite + React SPA uses Microsoft Authentication Library (MSAL) for "Sign in with Microsoft" OAuth flow.

## Prerequisites

- Azure AD tenant access (Microsoft 365 or Azure subscription)
- Your app needs to be registered in Azure AD

## Step 1: Register Your App in Azure AD

1. Go to https://portal.azure.com
2. Click **Azure Active Directory** (left sidebar)
3. Click **App registrations** → **New registration**
4. Fill in:
   - **Name**: `M365 Community Days DC` (or your app name)
   - **Supported account types**: `Accounts in this organizational directory only` (default)
5. Click **Register**

## Step 2: Configure as Single-Page Application

⚠️ **Critical**: Must set platform type to SPA, not Web app.

1. On your app page, click **Authentication** (left sidebar under "Manage")
2. Under **Platform configurations**:
   - Click **Add a platform** (if empty)
   - Select **Single-page application**
3. Add redirect URIs:
   - **Development**: `http://localhost:3000`
   - **Production**: `https://yourdomain.com` (add later if needed)
4. Click **Save**

Result should show:
```
Platform configurations
└─ Single-page application
   └─ Redirect URIs: http://localhost:3000
```

## Step 3: Get Your Credentials

On the app **Overview** page:
- Copy **Application (client) ID**
- Copy **Tenant ID** (or Directory (tenant) ID)

## Step 4: Configure Environment

1. Copy template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local`:
   ```env
   VITE_AZURE_AD_CLIENT_ID=your-application-id-here
   VITE_AZURE_AD_TENANT_ID=your-tenant-id-here
   VITE_SHAREPOINT_SESSIONS_URL=...
   VITE_SHAREPOINT_SPEAKERS_URL=...
   VITE_SHAREPOINT_SPONSORS_URL=...
   ```

## Step 5: Test

1. Run dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Click **Sign in with Microsoft**

4. You should see Microsoft login popup

5. After signing in, sessions should load

## Troubleshooting

### AADSTS50011: Redirect URI Mismatch
**Error**: Redirect URI in request doesn't match configured URIs.

**Fix**:
- Go to Azure Portal → Authentication
- Verify redirect URI exactly matches: `http://localhost:3000`
- No trailing slash, correct protocol (http/https), correct port

### AADSTS9002326: Cross-origin Token Redemption
**Error**: Platform type is not configured as SPA.

**Fix**:
- Go to Azure Portal → Authentication
- Remove "Web" platform (if present)
- Add "Single-page application" platform instead
- Set redirect URI to `http://localhost:3000`

### Still Getting Errors?
1. **Clear browser cache** (or use incognito window)
2. **Wait 5-10 minutes** for Azure AD to propagate changes
3. **Check exact spelling** of Client ID and Tenant ID
4. **Verify redirect URI** has no trailing slash

## MSAL Configuration

The app uses MSAL with these settings:
- **Authority**: `https://login.microsoftonline.com/{tenant-id}`
- **Client ID**: From `.env.local`
- **Redirect URI**: `http://localhost:3000`
- **Scopes**: SharePoint access (`https://andworx.sharepoint.com/.default`)
- **Cache**: Session storage (tokens cleared on browser close)
- **Flow**: Authorization Code + PKCE (public client, no client secret)

## Security Notes

- ✅ **No client secret needed** - Browser apps use PKCE instead
- ✅ **Tokens in sessionStorage** - Cleared when browser closes
- ✅ **Client ID is public** - It's safe to have in code/environment
- ❌ **Never add client secret** to browser code - Major security risk

## For Production

Before deploying to production:

1. **Update redirect URI**:
   - Azure Portal → Authentication
   - Add your production domain: `https://yourdomain.com`

2. **Update .env.local**:
   - `.env.local` is in `.gitignore` - won't be committed
   - Set production values on your hosting platform

3. **Enable token refresh** (optional):
   - Current setup uses access tokens with automatic refresh
   - For long sessions, implement token refresh logic

4. **Consider HTTPS redirect URI**:
   - Production must use `https://` for security
   - Update in Azure AD first, then deploy

## Support

For issues:
- Check Azure Portal app configuration
- Verify `.env.local` has correct values
- Check browser console for error details (F12 → Console)
- Refer to [MSAL documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
