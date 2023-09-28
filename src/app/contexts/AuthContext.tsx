import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { toast } from 'react-hot-toast';

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
  });

  const { isError } = useQuery({
    queryKey: ['loggedUser'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(prevState => !prevState);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou')
      signout()
    }
  }, [isError, signout])

  return (
    <AuthContext.Provider value={{ signin, signedIn, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

