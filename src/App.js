import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import { useAuth } from './AuthContext'; 
import AboutPage from './pages/AboutPage';
import Companies from './pages/Companies';
import Drives from './pages/Drives';
import MyPosts from './pages/MyPosts'

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
          <Route path="/about" element={isLoggedIn ? <AboutPage /> : <Navigate to="/login" replace />} /> 
           <Route path="/companies" element={isLoggedIn ? <Companies /> : <Navigate to="/login" replace />} />
            <Route path="/drives" element={isLoggedIn ? <Drives /> : <Navigate to="/login" replace />} />
            <Route path="/my-posts" element={isLoggedIn ? <MyPosts /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
