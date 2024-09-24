/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface UseModalProps {
  isOpen: boolean;
  showModal: (value: boolean) => void;
  data: any;
  setData: (value: any) => void;
}

const useModal = create<UseModalProps>((set) => ({
  isOpen: false,
  showModal: (value: boolean) => set({ isOpen: value }),
  data: undefined,
  setData: (value: any) => set({ data: value })
}));

export default useModal;
