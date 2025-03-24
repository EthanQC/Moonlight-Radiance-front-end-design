// App.tsx
import { Routes, Route } from 'react-router-dom'
import GamePage from './pages/game/GamePage'
// import './App.css'

function App() {
  return (
    <div>
      <Routes>

        {/* 游戏页 */}
        <Route path="/game" element={<GamePage />} />

        {/* 其它路由，如404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
