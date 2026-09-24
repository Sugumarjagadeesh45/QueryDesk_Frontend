import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User pages
import UserDashboard from './pages/user/Dashboard';
import NewQuery from './pages/user/NewQuery';
import UserQueryList from './pages/user/QueryList';
import UserQueryDetails from './pages/user/QueryDetails';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminQueryList from './pages/admin/QueryList';
import AdminQueryDetails from './pages/admin/QueryDetails';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User protected routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/queries/new"
            element={
              <ProtectedRoute>
                <NewQuery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/queries"
            element={
              <ProtectedRoute>
                <UserQueryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/queries/:id"
            element={
              <ProtectedRoute>
                <UserQueryDetails />
              </ProtectedRoute>
            }
          />

          {/* Admin protected routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/queries"
            element={
              <AdminRoute>
                <AdminQueryList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/queries/:id"
            element={
              <AdminRoute>
                <AdminQueryDetails />
              </AdminRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
