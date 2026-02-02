import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"; // Huruf Besar Sesuai File

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
