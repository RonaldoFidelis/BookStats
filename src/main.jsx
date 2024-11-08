import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'

import { LivroContextProvider } from "./context/LivroContext.jsx"

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<LivroContextProvider>
			<App />
		</LivroContextProvider>
	</StrictMode>,
)
