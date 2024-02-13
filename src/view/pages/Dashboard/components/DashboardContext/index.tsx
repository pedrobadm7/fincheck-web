import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';
import { BankAccount } from '../../../../../app/entities/bankAccount';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalopen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: "INCOME" | "EXPENSE" | null;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: null | BankAccount;
  toggleValueVisibility: () => void;
  closeNewAccountModal: () => void;
  openNewAccountModal: () => void;
  closeNewTransactionModal: () => void;
  openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {

    const storedValue = localStorage.getItem(localStorageKeys.HIDE_VALUES);

    return storedValue ? !!JSON.parse(storedValue) : true;
  });
  const [isNewAccountModalopen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<"INCOME" | "EXPENSE" | null>(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, []);

  const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setIsEditAccountModalOpen(true);
    setAccountBeingEdited(bankAccount)
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false);
    setAccountBeingEdited(null);
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.HIDE_VALUES, JSON.stringify(areValuesVisible));
  }, [areValuesVisible]);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewAccountModalopen,
        isNewTransactionModalOpen,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited,
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal
      }}
    >

      {children}
    </DashboardContext.Provider>
  )
}
