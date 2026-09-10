import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Public/Home/Home'
import Login from '../Pages/Public/Login/Login'
import Register from '../Pages/Public/Register/Register'

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default AppRoutes