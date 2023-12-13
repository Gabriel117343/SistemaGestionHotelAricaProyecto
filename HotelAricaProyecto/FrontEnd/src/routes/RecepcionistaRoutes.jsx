import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Recepcionista/Home'

import { Navbar } from '../pages/Navbar'
import { Menu } from '../components/Recepcionista/Menu'
import { Recepcion } from '../pages/Recepcionista/Recepcion'
import { ClienteProvider } from '../context/ClientesContext'
import { Reservas } from '../pages/Recepcionista/Reservas'
export const RecepcionistaRoutes = () => {
  return (
    <ClienteProvider>
      <Navbar />
      <Menu>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Navigate to='/recepcionista/home' />} />
          <Route path='/recepcion' element={<Recepcion />} />
          <Route path='/reservas' element={<Reservas />} />

        </Routes>
      </Menu>
    </ClienteProvider>
  )
}
