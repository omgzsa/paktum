import type { User, LoginResponse, LoginCredentials, JWTPayload } from '@/types'
import { jwtDecode } from 'jwt-decode'

export function useAuth() {
    const authModal = useAuthModal()
    const useAuthToken = () => useCookie<string | null>('auth_token')
    const useAuthUser = () => useState<User | null>('auth_user')
    // const error = ref<string | null>(null);

    const setToken = (newToken: string | null) => {
        const authToken = useAuthToken()
        authToken.value = newToken

        if (newToken) {
            saveToLocalStorage('auth_token', newToken)
        } else {
            removeFromLocalStorage('auth_token')
        }
    }

    const setUser = (newUser: User | null) => {
        const authUser = useAuthUser()
        authUser.value = newUser

        if (newUser) {
            saveToLocalStorage('userId', String(newUser.id))
        } else {
            removeFromLocalStorage('userId')
        }
    }

    const isValidToken = (token: string): boolean => {
        // Validate token structure before decoding
        if (!token || token.split('.').length !== 3) return false

        try {
            // changed const decoded = jwtDecode<{ exp?: number }>(token);
            const decoded = decodeToken(token)
            return decoded.exp
                ? decoded.exp > Math.floor(Date.now() / 1000)
                : false
        } catch (error) {
            console.error('[isValidToken] Failed to decode token:', error)
            return false
        }
    }

    const restoreUserSession = async () => {
        const token = useAuthToken().value

        if (token && isValidToken(token)) {
            try {
                const userData = await fetchUser(
                    Number(localStorage.getItem('userId')),
                )
                console.log('[restored session]', userData.firstName)
                setUser(userData)
                return
            } catch (error) {
                console.error(
                    '[restoreUserSession] Failed to fetch user:',
                    error,
                )
            }
        }
        clearSession()
    }

    const fetchUser = async (id: number): Promise<User> => {
        try {
            return await $fetch<User>(`/api/users/${id}`)
        } catch (error) {
            console.error('[fetchUser] Failed to fetch user:', error)
            throw error
        }
    }

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await $fetch<LoginResponse>('/api/auth/login', {
                method: 'POST',
                body: credentials,
            })

            if (!isValidToken(response.token)) {
                throw new Error('[login] Invalid authentication token')
            }

            setToken(response.token)

            const userData = await fetchUser(response.user)
            setUser(userData)

            authModal.close()
        } catch (error) {
            console.error('[login] Failed to authenticate:', error)
            throw error
        }
    }

    const logout = () => clearSession()

    const clearSession = () => {
        console.log('Clearing session ⚠️')
        setToken(null)
        setUser(null)
    }

    const decodeToken = (token: string): JWTPayload => {
        return jwtDecode<JWTPayload>(token)
    }

    return { login, logout, useAuthUser, restoreUserSession }
}
