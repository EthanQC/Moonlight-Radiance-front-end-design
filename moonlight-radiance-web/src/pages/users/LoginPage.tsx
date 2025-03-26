import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!username || !password) {
      setError('请输入用户名和密码')
      return
    }
    setError('')

    try {
      const resp = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await resp.json()

      if (resp.ok && data.token) {
        localStorage.setItem('token', data.token)
        alert('登录成功')
        navigate('/game')
      } else {
        setError(data.error || '登录失败')
      }
    } catch (err: any) {
      console.error(err)
      setError('服务器错误')
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
          />
        </div>
        <div className="form-group">
          <label>密码:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>登录</button>
      </div>
    </div>
  )
}

export default LoginPage
