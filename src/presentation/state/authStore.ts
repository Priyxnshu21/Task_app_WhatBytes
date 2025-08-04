import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../data/firebaseConfig';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
  if (useAuthStore.getState().isLoading) {
    useAuthStore.setState({ isLoading: false });
  }
});