import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import api from 'services/api'
import { LoginFormData, LoginResponseData, RegisterFormData, RegisterResponseData, User } from 'types'

import { AUTH_TOKEN_KEY, DEVTOOLS_PREFIX } from './constants'

import { StateCreatorWithDevtools } from './types'

interface AuthStore {
  isAuthenticated: boolean
  isLoading: boolean
  isMounted: boolean
  user: User | null
  fetchProfile: () => void
  signIn: (data: LoginFormData) => Promise<LoginResponseData>
  signUp: (data: RegisterFormData) => Promise<RegisterResponseData>
  setUnauthenticated: () => void
}

const createAuthStore: StateCreatorWithDevtools<AuthStore> = (set) => {
  return {
    isAuthenticated: false,
    isLoading: false,
    isMounted: false,
    user: null,
    fetchProfile: async () => {
      try {
        set({ isLoading: true }, false, 'fetchProfile.loading')
        const res = await api.get('/auth/profile')
        set(
          {
            isAuthenticated: true,
            user: {
              email: res.data.email
            }
          },
          false,
          'fetchProfile.success'
        )
      } catch (error) {

      } finally {
        set({ isLoading: false, isMounted: true }, false, 'fetchProfile.complete')
      }
    },
    signIn: async (data: LoginFormData) => {
      const result = {
        code: 200
      }

      try {
        const res = await api.post(`/auth/login`, data)
        if (res.data?.access_token) {
          set(
            {
              isAuthenticated: true,
              user: res.data.user,
            },
            false,
            'signIn.success'
          )
          localStorage.setItem(AUTH_TOKEN_KEY, res.data.access_token)
        }
      } catch (error: any) {
        result.code = error?.response?.status ?? 500
      }

      return result
    },
    signUp: async (data: RegisterFormData) => {
      const result = {
        ok: false,
        user: undefined,
        error: undefined
      }

      try {
        const res = await api.post(`/auth/register`, data)

        if (res?.data) {
          if (res.data.id) {
            result.ok = true
            result.user = res.data
          } else {
            result.error = res.data.message
          }
        }
      } catch (error: any) {
        result.error = error?.data?.message
      }

      return result
    },
    setUnauthenticated: () => {
      set({
        isAuthenticated: false,
        user: null,
      }, false, 'setUnauthenticated');
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  }
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    createAuthStore,
    { name: `${DEVTOOLS_PREFIX} Auth`}
  )
)
