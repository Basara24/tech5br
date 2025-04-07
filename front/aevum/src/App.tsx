import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/resgister"; // <- certifique-se de importar

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* <- aqui */}
      </Routes>
    </Router>
  );
}

export default App;
