import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import ParentDashboard from './pages/ParentDashboard';
import ChildDashboard from './pages/ChildDashboard';
import Register from './pages/Register';
import Header from './components/Header';
import NotFound from './pages/NotFound.js';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = useCallback((userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const handleRegister = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const ProtectedRoute = ({ children }) => {
    if(!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register onRegister={handleRegister} />} />
        <Route path="/" element={isLoggedIn ?
          <ProtectedRoute>
            {user?.role === 'parent' ? <ParentDashboard /> : <ChildDashboard />}
          </ProtectedRoute>
          : <Welcome />}
          />
        <Route path="*" element={<Welcome />} />
      </Routes>
  </>
  );
}

export default App;
/*
import { Router, Route, Routes, Navigate } from 'react-router-dom';



  function TestComponent() {
    return <div>TEST COMPONENT</div>;
  };

  return (
    <Router>
      <div>Hello World!</div>      
    </Router>
  );
}


   

      

export default App;
*/