// src/routes/ProtectedRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    // 如果没有 token，则重定向到 /login
    alert('请先登录')
    return <Navigate to="/login" replace />
  }
  // 否则渲染子组件
  return <>{children}</>
}

export default ProtectedRoute
