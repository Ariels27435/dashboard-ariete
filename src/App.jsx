import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/api';

// Componentes
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sensores from './pages/Sensores';
import Usuarios from './pages/Usuarios';
import Alertas from './pages/Alertas';
import Reportes from './pages/Reportes';
import Configuracion from './pages/Configuracion';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Componente para el layout principal
const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de login */}
          <Route 
            path="/login" 
            element={
              authService.isAuthenticated() ? 
              <Navigate to="/" replace /> : 
              <Login />
            } 
          />
          
          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/sensores"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Sensores />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Usuarios />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/alertas"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Alertas />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/reportes"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Reportes />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/configuracion"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Configuracion />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;