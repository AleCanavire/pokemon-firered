import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PC from "./pages/pc/PC"
import PokeDetail from "./pages/detail/PokeDetail"

function App() {
  return (
    <Router>
      <main className="pokemon-firered-wrapper">
        <Routes>
          <Route path="/" element={<PC/>}/>
          <Route path="/detail/:name" element={<PokeDetail/>}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App
