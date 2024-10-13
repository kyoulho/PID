// src/store/useAccountStore.ts
import create from "zustand";
import { CreateAccountDTO, GetAccountDTO, UUID } from "@mid/shared";
import axiosInstance from "utils/axiosInstance";

interface AccountState {
  accounts: GetAccountDTO[];
  loading: boolean;
  error: boolean;
  fetchAccounts: () => Promise<void>;
  addAccount: (newAccount: CreateAccountDTO) => GetAccountDTO;
  deleteAccount: (accountId: UUID) => void;
}

const useAccountStore = create<AccountState>((set) => ({
  accounts: [],
  loading: false,
  error: false,

  fetchAccounts: async () => {
    set({ loading: true, error: false });
    try {
      const response =
        await axiosInstance.get<GetAccountDTO[]>("/api/accounts");
      set({ accounts: response.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
      set({ error: true, loading: false });
    }
  },

  addAccount: (newAccount) =>
    set((state) => ({
      accounts: [...state.accounts, newAccount],
    })),

  deleteAccount: (accountId) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== accountId),
    })),
}));

export default useAccountStore;
