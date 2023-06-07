import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthStore {
  user: User | null;
  userRole: string;
  token: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  setToken: (token: string) => void;
  setUserRole: (userRole: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userRole: "",
  token: "",
  isLoggedIn: false,
  isLoading: true,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setToken: (token) => set({ token }),
  setUserRole: (userRole) => set({ userRole }),
}));

export default useAuthStore;
