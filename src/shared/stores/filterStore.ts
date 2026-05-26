import { create } from 'zustand';

export interface PlantFilter {
  manageDifficulty: string | null;
  airPurification: string | null;
  plantSize: string | null;
}

const emptyFilter: PlantFilter = {
  manageDifficulty: null,
  airPurification: null,
  plantSize: null,
};

interface FilterStore {
  isOpen: boolean;
  applied: PlantFilter;
  draft: PlantFilter;
  openModal: () => void;
  closeModal: () => void;
  setDraft: (key: keyof PlantFilter, value: string | null) => void;
  applyFilter: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  isOpen: false,
  applied: { ...emptyFilter },
  draft: { ...emptyFilter },
  openModal: () =>
    set((state) => ({ isOpen: true, draft: { ...state.applied } })),
  closeModal: () => set({ isOpen: false }),
  setDraft: (key, value) =>
    set((state) => ({ draft: { ...state.draft, [key]: value } })),
  applyFilter: () =>
    set((state) => ({ isOpen: false, applied: { ...state.draft } })),
}));
