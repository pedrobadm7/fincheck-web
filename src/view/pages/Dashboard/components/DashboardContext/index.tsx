import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalopen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: "INCOME" | "EXPENSE" | null;
  toggleValueVisibility: () => void;
  closeNewAccountModal: () => void;
  openNewAccountModal: () => void;
  closeNewTransactionModal: () => void;
  openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {

    const storedValue = localStorage.getItem(localStorageKeys.HIDE_VALUES);

    return storedValue ? !!JSON.parse(storedValue) : true;
  });
  const [isNewAccountModalopen, setIsNewAccountModalOpen] = useState(true);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<"INCOME" | "EXPENSE" | null>(null)

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
        toggleValueVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
