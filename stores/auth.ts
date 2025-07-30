import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';


interface User {
  email: string;
  uid: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
  isAnonymous: boolean;
  phoneNumber?: string;
  providerData: any[];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  tenantId?: string;
}

interface AuthState {
  init(): unknown;
  user: User | null
  loading: boolean
  error: string
  setUser: (user: any | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null, // Initial value set to null since AsyncStorage is async
  loading: false,
  error: '',
  setUser: async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
      set({ user })
    } catch (error) {
      set({ error: 'Failed to save user data' })
    }
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  // Initialize user data from AsyncStorage
  init: async () => {
    try {
      const userData = await AsyncStorage.getItem('user')
      if (userData) {
        set({ user: JSON.parse(userData) })
      }
    } catch (error) {
      set({ error: 'Failed to load user data' })
    }
  }
}))
