import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/PersonalAseo/Home'
import { Avisos } from '../pages/PersonalAseo/Avisos'
import { Navbar } from '../pages/Navbar'
import { Menu } from '../components/personalAseo/Menu'
import { NotificacionProvider } from '../context/NotificacionContext'
import { RutasProtegidas } from '../components/RutasProtegidas'
import { LoginContext } from '../context/LoginContext'
export const PersonalAseoRoutes = () => {
  const { state: { usuario } } = useContext(LoginContext) // se obtiene el usuario del context
  console.log(!!usuario?.rol.includes('personalaseo')) // se muestra true si el usuario tiene el rol de recepcionista
  return (
    <NotificacionProvider>
      <Navbar />
      <Menu>
        <Routes>{/* RUTAS PROTEGIDAS */}
          <Route element={<RutasProtegidas isAllowed={!!usuario?.rol.includes('personalaseo')} rutaRedireccion='/login'/>}>
            {/* si el usuario tiene el rol de personalaseo se muestra el componente, si no se redirecciona al login */}
            <Route path='/home' element={<Home />} />
            <Route path='*' element={<Navigate to='/aseo/home' />} />
            <Route path='/avisos' element={<Avisos />} />
          </Route>
        </Routes>
      </Menu>
    </NotificacionProvider>
  )
}
