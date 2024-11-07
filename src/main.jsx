import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'

import { LivroContext } from "./context/LivroContext.js"

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<LivroContext>
			<App />
		</LivroContext>
	</StrictMode>,
)
