/**
 * For Vite client-side app, authentication and API calls are handled client-side.
 * 
 * NOTE: This is a simplified approach for development/demo. In production:
 * - You should use a proper OAuth 2.0 flow with a backend
 * - Store tokens securely (HTTP-only cookies)
 * - Use PKCE for public clients
 * - Consider using a library like react-oidc-context
 * 
 * Current setup stores access token in sessionStorage (NOT secure for production)
 */

import { eventConfig } from '@/config/eventConfig'

interface AuthToken {
    accessToken: string
    expiresAt: number
}

interface SharePointSession {
    accessToken: string
    user: {
        email: string
        name: string
    }
}

const TOKEN_KEY = 'sp_access_token'
const EXPIRES_KEY = 'sp_token_expires'

export const authService = {
    /**
     * Get stored access token (if still valid)
     */
    getAccessToken(): string | null {
        const token = sessionStorage.getItem(TOKEN_KEY)
        const expiresAt = sessionStorage.getItem(EXPIRES_KEY)

        if (!token || !expiresAt) {
            return null
        }

        const now = Date.now()
        const tokenExpires = parseInt(expiresAt, 10)

        // Token expired
        if (now > tokenExpires) {
            sessionStorage.removeItem(TOKEN_KEY)
            sessionStorage.removeItem(EXPIRES_KEY)
            return null
        }

        return token
    },

    /**
     * Store access token with expiry
     */
    setAccessToken(token: string, expiresInSeconds: number = 3600): void {
        const expiresAt = Date.now() + expiresInSeconds * 1000
        sessionStorage.setItem(TOKEN_KEY, token)
        sessionStorage.setItem(EXPIRES_KEY, expiresAt.toString())
    },

    /**
     * Clear stored tokens
     */
    clearTokens(): void {
        sessionStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(EXPIRES_KEY)
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.getAccessToken() !== null
    },

    /**
     * Simulate login (in production, this would be proper OAuth flow)
     * For development, you can manually get a token from Azure AD and paste it here
     */
    async login(token: string): Promise<SharePointSession> {
        // Store the token for subsequent API calls
        this.setAccessToken(token, 3600)

        return {
            accessToken: token,
            user: {
                email: 'user@example.com',
                name: 'User',
            },
        }
    },

    /**
     * Logout
     */
    logout(): void {
        this.clearTokens()
    },

    /**
     * Fetch data from SharePoint with authentication
     */
    async fetchSharePointList(listUrl: string): Promise<any> {
        const token = this.getAccessToken()

        if (!token) {
            throw new Error('Not authenticated. Please sign in first.')
        }

        const response = await fetch(listUrl, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Your account does not have permission to access this list.')
            }
            if (response.status === 403) {
                throw new Error('Access forbidden. Contact your SharePoint administrator.')
            }
            throw new Error(`SharePoint API error: ${response.statusText}`)
        }

        return response.json()
    },
}
