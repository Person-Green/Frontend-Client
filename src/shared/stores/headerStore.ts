import { useEffect, type ReactNode } from 'react';
import { create } from 'zustand';

export type HeaderVariant = 'primary' | 'highlight';

export interface HeaderConfig {
  icon: string;
  title: ReactNode;
  rightSlot?: ReactNode;
  variant?: HeaderVariant;
}

interface HeaderStore {
  config: HeaderConfig | null;
  setHeader: (config: HeaderConfig) => void;
  resetHeader: () => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  config: null,
  setHeader: (config) => set({ config }),
  resetHeader: () => set({ config: null }),
}));

interface UseHeaderOptions {
  rightSlot?: ReactNode;
  variant?: HeaderVariant;
}

export const useHeader = (
  icon: string,
  title: ReactNode,
  options?: UseHeaderOptions,
) => {
  const setHeader = useHeaderStore((s) => s.setHeader);
  const rightSlot = options?.rightSlot;
  const variant = options?.variant;
  useEffect(() => {
    setHeader({ icon, title, rightSlot, variant });
  }, [icon, title, rightSlot, variant, setHeader]);
};
