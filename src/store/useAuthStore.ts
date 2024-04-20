import axios from 'axios'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import api from 'services/api'
import { LoginFormData, LoginResponseData, RegisterFormData, User } from 'types'

import { API_URL, AUTH_TOKEN_KEY } from './constants'

import { StateCreatorWithDevtools } from './types'

interface AuthStore {
  isAuthenticated: boolean
  isLoading: boolean
  isMounted: boolean
  user: User | null
  fetchProfile: () => void
  signIn: (data: LoginFormData) => Promise<LoginResponseData>
  signUp: (data: RegisterFormData) => void
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
        set({ isLoading: true })
        const res = await api.get('/auth/profile')
        set(
          {
            isAuthenticated: true,
            user: {
              email: res.data.email
            }
          },
          false,
          'fetchProfile'
        )
      } catch (error) {

      } finally {
        set({ isLoading: false, isMounted: true })
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
            'signIn',
          )
          localStorage.setItem(AUTH_TOKEN_KEY, res.data.access_token)
        }
      } catch (error: any) {
        result.code = error?.response?.status ?? 500
      }

      return result
    },
    signUp: async (data: RegisterFormData) => {
      // @todo implement register form
      const res = await axios.post(`${API_URL}/auth/register`, data)
      if (res.data) {
        console.log(`You have successfully registered`, res.data)
      }
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
    { name: 'Auth', enabled: true },
  )
)
