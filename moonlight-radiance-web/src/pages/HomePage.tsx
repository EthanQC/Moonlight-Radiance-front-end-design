import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      {/* 半透明蒙层 */}
      <div className="home-overlay">
        <div className="home-content">
          {/* 顶部栏：左侧“月华”，右侧“登录 注册” */}
          <header className="home-header">
            <div className="home-logo">月华</div>
            <div className="menu-right">
              <Link to="/login" className="menu-link">登录</Link>
              <Link to="/register" className="menu-link">注册</Link>
            </div>
          </header>

          {/* 中间主体 */}
          <main className="home-main">
            <h1 className="game-title">月华</h1>
            <div className="button-group">
              <Link to="/game" className="button-item">开始游戏</Link>
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
