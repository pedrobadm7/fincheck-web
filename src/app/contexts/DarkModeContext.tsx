import { ReactNode, createContext, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';

interface DarkModeContextValue {
  isDarkMode: boolean
  handleMode(): void
}

export const DarkModeContext = createContext<DarkModeContextValue>({} as DarkModeContextValue);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setMode] = useState<DarkModeContextValue['isDarkMode']>(() => {
    const darkMode = localStorage.getItem(localStorageKeys.DARK_MODE)

    return darkMode ? JSON.parse(darkMode) : false;
  })

  function handleMode() {
    setMode((prevState) => {
      if (!prevState) {
        localStorage.setItem(localStorageKeys.DARK_MODE, JSON.stringify(true))
        return true
      }

      if (prevState) {
        localStorage.setItem(localStorageKeys.DARK_MODE, JSON.stringify(false))
        return false
      }

      return prevState
    })
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
