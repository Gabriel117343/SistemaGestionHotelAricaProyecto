import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/PersonalAseo/Home'
import { Avisos } from '../pages/PersonalAseo/Avisos'
import { Navbar } from '../pages/Navbar'
import { Menu } from '../components/personalAseo/Menu'
import { NotificacionProvider } from '../context/NotificacionContext'

export const PersonalAseoRoutes = () => {
  return (
    <NotificacionProvider>
      <Navbar />
      <Menu>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Navigate to='/aseo/home' />} />
          <Route path='/avisos' element={<Avisos />} />
        </Routes>
      </Menu>
    </NotificacionProvider>
  )
}
