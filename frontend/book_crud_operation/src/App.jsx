import "./App.css";
import Home from "./pages/home";
import Add from "./pages/add";
import Update from "./pages/update";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
