import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import { toast } from 'react-hot-toast';
import PageLoader from '../../view/pages/PageLoader';

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

  const { isError, isFetching, isSuccess, remove } = useQuery({
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
    remove();

    setSignedIn(prevState => !prevState);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou')
      signout()
    }
  }, [isError, signout])

  if (isFetching) {
    return (
      <PageLoader />
    )
  }

  return (
    <AuthContext.Provider
      value={{
        signin,
        signedIn: isSuccess && signedIn,
        signout
      }}>
      {children}
    </AuthContext.Provider>
  )
}

