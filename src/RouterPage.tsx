import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Admin/Register'
import MultiStepForm from './pages/MultiStepForm'
import Login from './pages/Admin/Login'

function RouterPage() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default RouterPage