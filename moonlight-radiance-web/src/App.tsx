// App.tsx
import { Routes, Route, Link } from 'react-router-dom'
import GamePage from './pages/game/GamePage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/users/RegisterPage'
import LoginPage from './pages/users/LoginPage'
import ProtectedRoute from './components/game/User/ProtectedRoute'
// import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route 
        path="/game" 
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        } 
      />

        {/* 其它路由，如404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
