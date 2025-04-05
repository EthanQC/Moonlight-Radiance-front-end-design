import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../services/userService'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [])

  const handleLogin = async () => {
    // 简单的前端校验
    if (!username) {
      setError('用户名不能为空')
      return
    }
    if (!password) {
      setError('密码不能为空')
      return
    }
    if (password.length < 6) {
      setError('密码长度不能少于 6 位')
      return
    }

    setError('') // 清空之前的错误

    try {
      const resp = await login(username, password)
      const data = await resp.json()

      if (resp.ok && data.token) {
        localStorage.setItem('token', data.token)
        alert('登录成功')
        navigate('/')
      } else {
        // 如果后端返回了 error 信息，就用它；否则提示“登录失败”
        setError(data.error || '登录失败')
      }
    } catch (err: any) {
      console.error(err)
      setError('服务器错误')
    }
  }

  // 回车快捷登录
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>登录</h2>
        {error && <p className="error-msg">{error}</p>}

        <div className="form-group">
          <label>用户名:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="form-group">
          <label>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            onKeyDown={handleKeyDown}
          />
        </div>

        <button onClick={handleLogin}>
          登录
        </button>

        {/* 去注册 */}
        <p style={{ marginTop: '1rem' }}>
          <Link to="/register" style={{ color: '#eee' }}>没有账号？去注册</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
