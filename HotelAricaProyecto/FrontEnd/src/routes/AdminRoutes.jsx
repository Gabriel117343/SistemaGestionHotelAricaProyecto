import React, { useContext } from 'react'
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
import { RutasProtegidas } from '../components/RutasProtegidas'
import { LoginContext } from '../context/LoginContext'
export const AdminRoutes = () => {
  const { state: { usuario } } = useContext(LoginContext) // se obtiene el usuario del context
  console.log(!!usuario?.rol.includes('recepcionista')) // se muestra true si el usuario tiene el rol de recepcionista
  
  return (
    <UsuariosProvider>
      <Navbar />
    
        <Menu>
          <Routes> {/* RUTAS PROTEGIDAS */}
            <Route element={<RutasProtegidas isAllowed={!!usuario?.rol.includes('administrador')} rutaRedireccion='/login' />}>
              {/* si el usuario tiene el rol de administrador se muestra el componente, si no se redirecciona al login */}
              <Route path='/home' element={<Home />} />
              <Route path='*' element={<Navigate to='/admin/home' />} />
              <Route path='/registro-usuarios' element={<RegistroUsuarios />} />
              <Route path='/registro-habitacion' element={<RegistroHabitacion />} />
              <Route path='/usuarios-registrados' element={<UsuariosRegistrados />} />
              <Route path='/habitaciones-registradas' element={<HabitacionesRegistradas />} />
              <Route path='/configuracion' element={<Configuracion />} />
            </Route>
          </Routes>

        </Menu>

    
    </UsuariosProvider>
  )
}
