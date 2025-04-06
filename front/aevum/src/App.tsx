import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pokedex from "./pages/Pokedex";
import PokeInfo from "./pages/PokemonInfo.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokedex/:name" element={<PokeInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
