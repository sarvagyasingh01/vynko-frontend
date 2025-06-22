import { useState } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login'
import AdminLayout from './pages/main/AdminLayout'

function App() {
  const {token}=useSelector((state)=>state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token?<Navigate to="admin"/>:<Login/>}/>
        <Route path="/admin" element={token?<AdminLayout/>:<Navigate to="/"/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App
