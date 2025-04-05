import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './HomePage.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleGameStart = () => {
    if (!token) {
      // 如果没有登录，跳转到登录页面
      alert('请先登录')
      navigate('/login')
      return
    } else {
      // 如果已登录，跳转到游戏页面
      navigate('/game')
    }
  }

  return (
    <div className="home-container">
      {/* 半透明蒙层 */}
      <div className="home-overlay">
        <div className="home-content">
          {/* 顶部栏：左侧“月华”，右侧“登录” */}
          <header className="home-header">
            <div className="home-logo">月华</div>
            <div className="menu-right">
              <Link to="/login" className="menu-link">登录</Link>
            </div>
          </header>

          {/* 中间主体 */}
          <main className="home-main">
            <h1 className="game-title">月华</h1>
            <div className="button-group">
              <button
                className="button-item"
                onClick={handleGameStart}
              >
                开始游戏
              </button>
              <button className="button-item" onClick={() => alert('暂无存档功能示例')}>存档</button>
              <button className="button-item" onClick={() => alert('暂无设置示例')}>设置</button>
            </div>
          </main>

          {/* 底部版权 */}
          <footer className="home-footer">
            © 2025 月华 - 情长作品
          </footer>
        </div>
      </div>
    </div>
  )
}

export default HomePage
