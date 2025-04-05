// src/pages/users/RegisterPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../services/userService'
import './RegisterPage.css'

function RegisterPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [])

  const handleRegister = async () => {
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
      const resp = await register(username, password)
      const data = await resp.json()

      if (resp.ok && data.message) {
        alert('注册成功，请登录！')
        navigate('/login')
      } else {
        setError(data.error || '注册失败')
      }
    } catch (err: any) {
      console.error(err)
      setError('服务器错误')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRegister()
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>注册</h2>
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

        <button onClick={handleRegister}>
          注册
        </button>

        <p style={{ marginTop: '1rem' }}>
          <Link to="/login" style={{ color: '#eee' }}>已有账号？去登录</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
