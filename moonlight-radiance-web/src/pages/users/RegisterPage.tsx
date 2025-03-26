import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterPage.css'

function RegisterPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (!username || !password) {
      setError('请输入用户名和密码')
      return
    }
    setError('')

    try {
      const resp = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
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
        <button onClick={handleRegister}>注册</button>
      </div>
    </div>
  )
}

export default RegisterPage
