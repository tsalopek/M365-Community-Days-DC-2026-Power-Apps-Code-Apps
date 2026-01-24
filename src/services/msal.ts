/**
 * Authentication service using MSAL (Microsoft Authentication Library)
 * Handles OAuth 2.0 sign-in with Azure AD and token management
 */

import {
    PublicClientApplication,
    AuthenticationResult,
    SilentRequest,
} from '@azure/msal-browser'
import { eventConfig } from '@/config/eventConfig'
import { msalInstance, sharePointScopes } from '@/config/msalConfig'

export interface AuthUser {
    displayName: string | null
    mail: string | null
    accessToken: string
}

class AuthService {
    private pca: PublicClientApplication

    constructor() {
        this.pca = msalInstance
    }

    /**
     * Get the active account
     */
    getActiveAccount() {
        return this.pca.getActiveAccount()
    }

    /**
     * Get all accounts
     */
    getAllAccounts() {
        return this.pca.getAllAccounts()
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        const accounts = this.getAllAccounts()
        return accounts && accounts.length > 0
    }

    /**
     * Perform interactive sign-in (opens popup)
     */
    async signIn(): Promise<AuthUser | null> {
        try {
            const loginPopupRequest = {
                scopes: sharePointScopes,
            }

            const response: AuthenticationResult = await this.pca.loginPopup(
                loginPopupRequest
            )

            if (response.account) {
                this.pca.setActiveAccount(response.account)

                return {
                    displayName: response.account.name || null,
                    mail: response.account.username || null,
                    accessToken: response.accessToken,
                }
            }

            return null
        } catch (error) {
            console.error('Sign-in failed:', error)
            throw error
        }
    }

    /**
     * Perform silent token acquisition (for subsequent calls)
     */
    async acquireTokenSilent(): Promise<string> {
        const account = this.getActiveAccount()

        if (!account) {
            throw new Error('No active account. Please sign in first.')
        }

        const silentRequest: SilentRequest = {
            scopes: sharePointScopes,
            account: account,
        }

        try {
            const response = await this.pca.acquireTokenSilent(silentRequest)
            return response.accessToken
        } catch (error) {
            console.error('Silent token acquisition failed:', error)
            // If silent fails, try interactive
            const loginResponse = await this.signIn()
            if (loginResponse) {
                return loginResponse.accessToken
            }
            throw error
        }
    }

    /**
     * Sign out
     */
    async signOut(): Promise<void> {
        await this.pca.logoutPopup({
            postLogoutRedirectUri: window.location.origin,
        })
    }

    /**
     * Fetch data from SharePoint with automatic token handling
     */
    async fetchSharePointList(listUrl: string): Promise<any> {
        const token = await this.acquireTokenSilent()

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
    }
}

export const authService = new AuthService()
