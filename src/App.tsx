import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PC from "./pages/pc/PC";
import PokeDatos from "./pages/datos/PokeDatos";
import SoundtrackContextProvider from "./context/SoundtrackContext";

function App() {
  return (
    <SoundtrackContextProvider>
      <Router>
        <main className="pokemon-firered-wrapper">
          <Routes>
            <Route path="/" element={<PC/>}/>
            <Route path="/datos/:nombre" element={<PokeDatos/>}/>
          </Routes>
        </main>
      </Router>
    </SoundtrackContextProvider>
  )
}

export default App
