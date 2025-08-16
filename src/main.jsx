import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import router from './Routes/routes.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import { ThemeProvider } from './Theme/ThemeProvider'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <AuthProvider>
                    <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
