import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {

    const storedValue = localStorage.getItem(localStorageKeys.HIDE_VALUES);

    return storedValue ? !!JSON.parse(storedValue) : true;
  });

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.HIDE_VALUES, JSON.stringify(areValuesVisible));
  }, [areValuesVisible]);

  return (
    <DashboardContext.Provider value={{ areValuesVisible, toggleValueVisibility }}>
      {children}
    </DashboardContext.Provider>
  )
}
