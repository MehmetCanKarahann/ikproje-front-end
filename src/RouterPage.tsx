import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/AdminCompany/Register'
import MultiStepForm from './pages/MultiStepForm'
import Login from './pages/Login'
import CompanyAdminPage from './pages/AdminCompany/CompanyAdminPage'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from './store'
import { userLogin } from './store/feature/authSlice'
import AdminPage from './pages/Admin/AdminPage'
import AdminLogin from './pages/Admin/AdminLogin'
import { userAdminLogin } from './store/feature/adminSlice'
import ForgotPassword from './pages/AdminCompany/ForgotPassword'
import ResetPassword from './pages/AdminCompany/ResetPassword'
import CompanyManagementProfile from './pages/AdminCompany/CompanyManagementProfile'
import UnapprovedCompanyList from './pages/Admin/UnapprovedCompanyList'
import { fetchGetCompanyManagerProfileByToken } from './store/feature/companyManagerSlice'
import CompanyPersonelListPage from './pages/AdminCompany/CompanyPersonelListPage'
import CompanyPersonelStateListPage from './pages/AdminCompany/CompanyPersonelStateListPage'
import PersonelAdminPage from './pages/personelAdmin/PersonelAdminPage'
import CreateLeavePersonelListPage from './pages/personelAdmin/CreateLeavePersonelListPage'
import PersonelProfilePage from './pages/personelAdmin/PersonelProfilePage'
import LeaveManagementPage from './pages/AdminCompany/LeaveManagementPage'

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
            <Route path='/company-management-profile' element={ <CompanyManagementProfile /> } />
            <Route path='/company-personel-list' element={ <CompanyPersonelListPage /> } />
            <Route path='/company-personel-state-list' element={ <CompanyPersonelStateListPage /> } />
            <Route path='/leave-list' element={ <LeaveManagementPage /> } />

            <Route path='/personeladmin' element={ isLogin ? <PersonelAdminPage /> : <Login /> } />
            <Route path='/create-leave-personel-list' element={ <CreateLeavePersonelListPage /> } />
            <Route path='/personel-profile' element={ <PersonelProfilePage /> } />



            <Route path='/admin' element={ isAdminLogin ? <AdminPage /> : <AdminLogin />   } />
            <Route path='/adminlogin' element={ <AdminLogin /> } />
            <Route path='/unapproved-company-list' element={ <UnapprovedCompanyList /> } />
           
            <Route path='/forgotpassword' element={ <ForgotPassword /> } />
            <Route path='/resetPassword' element={ <ResetPassword /> } />
           

        </Routes>
    </BrowserRouter>
  )
}

export default RouterPage