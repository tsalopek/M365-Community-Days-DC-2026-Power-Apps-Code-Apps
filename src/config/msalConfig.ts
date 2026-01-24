/**
 * MSAL Configuration for Azure AD OAuth 2.0 
 * Enables Sign in with Microsoft for Vite SPA
 */

import { PublicClientApplication, Configuration } from '@azure/msal-browser'

const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_AD_CLIENT_ID || '',
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_AD_TENANT_ID || 'common'}`,
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return
                }
                console.debug(`[MSAL ${level}]:`, message)
            },
        },
    },
}

// Scopes for SharePoint access
export const sharePointScopes = [
    'https://andworx.sharepoint.com/.default',
]

// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig)
