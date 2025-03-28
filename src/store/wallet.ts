import { create } from 'zustand';
interface WalletState {
  address: string;
  isConnected: boolean;
  setAddress: (address: string) => void;
  setConnected: (isConnected: boolean) => void;
  disconnect: () => void;
}

export const walletStore = create<WalletState>((set) => ({
  address: '',
  isConnected: false,
  setAddress: (address) => set({ address }),
  setConnected: (isConnected) => set({ isConnected }),
  disconnect: () => set({ address: '', isConnected: false }),
}));
