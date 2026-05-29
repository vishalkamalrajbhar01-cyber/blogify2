import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './web/pages/HomePage'
import BlogDetailesPage from './web/pages/BlogDetailesPage'
import Dashboard from './admin/pages/Dashboard'
import AddBlog from './admin/pages/AddBlog'
import AllBlog from './admin/pages/AllBlog'
import PageNotFound from './web/pages/PageNotFound'
import toast, { Toaster } from 'react-hot-toast';
import EditBlog from './admin/pages/EditBlog'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/blog/:id' element={<BlogDetailesPage />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/addblog' element={<AddBlog />} />
        <Route path='/admin/allblogs' element={<AllBlog />} />
        <Route path='/admin/editblog/:id' element={<EditBlog />} />


        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
