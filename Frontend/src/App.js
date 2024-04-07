import './App.css';
import { SingIn } from './pages/SingIn';
import { Dashboard } from './pages/Dashboard';
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SingIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
    </div>
  );
}

export default App;
