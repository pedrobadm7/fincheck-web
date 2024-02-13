import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './app/contexts/AuthContext';
import { DarkModeProvider } from './app/contexts/DarkModeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </DarkModeProvider>


      {/* <ReactQueryDevtools position='bottom-left' panelPosition='right' /> */}
    </QueryClientProvider>
  )
}
