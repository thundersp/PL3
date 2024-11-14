import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <BrowserRouter>
      <div>
        <button onClick={toggleForm}>
          {isLogin ? 'Go to Signup' : 'Go to Login'}
        </button>
      </div>
      <Routes>
        <Route path="/" element={isLogin ? <Login /> : <Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;