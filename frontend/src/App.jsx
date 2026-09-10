import { Navigate, Route, Routes } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        } />
        <Route path="/user/*" element={
          <ProtectedRoute requiredRole="user">
            <UserRoutes />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App