import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { DocumentProvider } from './context/DocumentContext'
import Login from './pages/Login'
import Documents from './pages/Documents'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthReady(true);
  }, []);

  if (!authReady) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/documents" 
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={isAuthenticated() ? <Navigate to="/documents" /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <AppContent />
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
