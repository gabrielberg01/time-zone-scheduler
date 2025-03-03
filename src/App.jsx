import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scheduler from "./pages/Scheduler";
import FinalConfirmation from "./pages/FinalConfirmation";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/confirmation" element={<FinalConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
