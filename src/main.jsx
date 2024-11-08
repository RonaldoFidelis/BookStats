import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'
import { LivroContextProvider } from "./context/LivroContext.jsx"
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LivroContextProvider>
        <App />
      </LivroContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
