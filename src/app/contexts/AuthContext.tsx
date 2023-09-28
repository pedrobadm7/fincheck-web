import { createContext, ReactNode, useCallback, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void
  signout(): void
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken;
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);

  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(prevState => !prevState);
  }, [])

  return (
    <AuthContext.Provider value={{ signin, signedIn, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

