import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from "react-router";
import DetailCate from '../components/Category/DetailCate';
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import Login from "../pages/authencation/login";
import Dashboard from "../pages/dashboard"
import PostPage from "../pages/posts"
import CategoryPost from "../pages/posts/category"
import RegisterUser from "../pages/user/RegisterUser"

const RouterPage = () => {

    const isAuthenticated = useSelector(state => state.authen.isAuthenticated)

    const ProtectedRoute = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
    }

    const RejectedRoute = () => {
        return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
    }

    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='/posts' element={<PostPage />} />
                    <Route path='/posts/category' element={<CategoryPost />} />
                    <Route path='/posts/category/:id' element={<DetailCate />} />
                    <Route path='/users' element={<CategoryPost />} />
                </Route>
            </Route>
            <Route element={<RejectedRoute />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<RegisterUser />} />
            </Route>
        </Routes>
    )
}

export default RouterPage