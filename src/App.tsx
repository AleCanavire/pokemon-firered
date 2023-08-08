import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PC from "./pages/pc/PC";
import PokeDatos from "./pages/datos/PokeDatos";

function App() {
  return (
    <Router>
      <main className="pokemon-firered-wrapper">
        <Routes>
          <Route path="/" element={<PC/>}/>
          <Route path="/datos/:nombre" element={<PokeDatos/>}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App
