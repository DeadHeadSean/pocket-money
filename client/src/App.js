import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ParentDashboard from './pages/ParentDashboard';
import ChildDashboard from './pages/ChildDashboard';
import Register from './pages/Register';
import Header from './components/Header';
import Welcome from './pages/Welcome';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register onRegister={() => setIsLoggedIn(true)} />} />
        <Route path="/" element={isLoggedIn ? (user?.role === 'parent' ? <ParentDashboard /> : <ChildDashboard />) : <Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
