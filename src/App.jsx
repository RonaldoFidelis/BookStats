import { BrowserRouter, Routes, Route } from "react-router-dom"
import PaginaInicial from "./pages/PaginaInicial";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={ <PaginaInicial/> } />
					<Route path="/dashboard" element={ <Dashboard/> } />
				</Routes>
			</BrowserRouter>
    </div>
  )
}

export default App
