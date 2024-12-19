import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/AdminCompany/Register'
import MultiStepForm from './pages/MultiStepForm'
import Login from './pages/AdminCompany/Login'
import CompanyAdminPage from './pages/AdminCompany/CompanyAdminPage'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from './store'
import { userLogin } from './store/feature/authSlice'
import { fetchGetCompanyManagerProfileByToken } from './store/feature/userSlice'
import AdminPage from './pages/Admin/AdminPage'
import AdminLogin from './pages/Admin/AdminLogin'
import { userAdminLogin } from './store/feature/adminSlice'
import ForgotPassword from './pages/AdminCompany/ForgotPassword'
import ResetPassword from './pages/AdminCompany/ResetPassword'
import CompanyManagementProfile from './pages/AdminCompany/CompanyManagementProfile'

function RouterPage() {

  const dispatch = useDispatch<IKDispatch>();
  const isLogin = IKUseSelector(state => state.auth.isAuth);
  const isAdminLogin = IKUseSelector(state => state.admin.isAuth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    if (token) {
      dispatch(userLogin())
      dispatch(fetchGetCompanyManagerProfileByToken())
    }
    if(adminToken){
      dispatch(userAdminLogin())
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/companyadmin' element={ isLogin ? <CompanyAdminPage /> : <Login /> } />
            <Route path='/admin' element={ isAdminLogin ? <AdminPage /> : <AdminLogin />   } />
            <Route path='/adminlogin' element={ <AdminLogin /> } />
            <Route path='/forgotpassword' element={ <ForgotPassword /> } />
            <Route path='/resetPassword' element={ <ResetPassword /> } />
            <Route path='/company-management-profile' element={ <CompanyManagementProfile /> } />

        </Routes>
    </BrowserRouter>
  )
}

export default RouterPage