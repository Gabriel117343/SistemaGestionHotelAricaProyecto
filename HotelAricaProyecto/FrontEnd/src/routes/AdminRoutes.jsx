import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Admin/Home'
import { Menu } from '../components/admin/Menu'
import { RegistroHabitacion } from '../pages/Admin/RegistroHabitacion'
import { RegistroUsuarios } from '../pages/admin/RegistroUsuarios'
import { Navbar } from '../pages/Navbar'
import { UsuariosProvider } from '../context/UsuariosContext/'
import { UsuariosRegistrados } from '../pages/Admin/UsuariosRegistrados'
import { HabitacionesRegistradas } from '../pages/Admin/HabitacionesRegistradas'
import { Configuracion } from '../pages/Admin/Configuracion'
export const AdminRoutes = () => {

  

  return (
    <UsuariosProvider>
      <Navbar />
    
        <Menu>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<Navigate to='/admin/home' />} />
            <Route path='/registro-usuarios' element={<RegistroUsuarios />} />
            <Route path='/registro-habitacion' element={<RegistroHabitacion />} />
            <Route path='/usuarios-registrados' element={<UsuariosRegistrados />} />
            <Route path='/habitaciones-registradas' element={<HabitacionesRegistradas />} />
            <Route path='/configuracion' element={<Configuracion />} />
          </Routes>

        </Menu>

    
    </UsuariosProvider>
  )
}
