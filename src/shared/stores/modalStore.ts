import { create } from "zustand";

export interface ModalButton {
  label: string;
  onClick?: () => void;
  icon?: string;
}

export interface ModalContent {
  useImage: boolean;
  title: string;
  body: string;
  label?: string;
  buttonAmount?: 1 | 2;
  buttons: ModalButton[];
}

interface ModalStore {
  isOpen: boolean;
  content: ModalContent | null;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));