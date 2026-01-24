import { useState, useEffect, useCallback } from 'react'
import { authService, AuthUser } from '@/services/msal'
import { msalInstance } from '@/config/msalConfig'

interface UseAuthReturn {
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    user: AuthUser | null
    login: () => Promise<void>
    logout: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<AuthUser | null>(null)

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await msalInstance.initialize()
                const authed = authService.isAuthenticated()
                setIsAuthenticated(authed)

                if (authed) {
                    const account = authService.getActiveAccount()
                    if (account) {
                        setUser({
                            displayName: account.name || null,
                            mail: account.username || null,
                            accessToken: '', // Token is managed by MSAL
                        })
                    }
                }
            } catch (err) {
                console.error('Auth check failed:', err)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = useCallback(async () => {
        try {
            setError(null)
            setIsLoading(true)
            const authUser = await authService.signIn()
            if (authUser) {
                setUser(authUser)
                setIsAuthenticated(true)
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed'
            setError(message)
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            setError(null)
            await authService.signOut()
            setIsAuthenticated(false)
            setUser(null)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Logout failed'
            setError(message)
        }
    }, [])

    return {
        isAuthenticated,
        isLoading,
        error,
        user,
        login,
        logout,
    }
}
