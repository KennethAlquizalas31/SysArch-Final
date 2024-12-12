import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Session from './pages/Session';
import PairDevice from './pages/PairDevice';
import Donation from './pages/Donation';
import SessionHistory from './pages/SessionHistory';
import SessionStart from './pages/SessionStart';
import SessionComplete from './pages/SessionComplete'; // Import SessionComplete component

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session"
              element={
                <ProtectedRoute>
                  <Session />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session-history"
              element={
                <ProtectedRoute>
                  <SessionHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pair-device"
              element={
                <ProtectedRoute>
                  <PairDevice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session-start"
              element={
                <ProtectedRoute>
                  <SessionStart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session-complete"
              element={
                <ProtectedRoute>
                  <SessionComplete />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donation"
              element={
                <ProtectedRoute>
                  <Donation />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
