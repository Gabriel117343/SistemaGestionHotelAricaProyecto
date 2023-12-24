import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Recepcionista/Home'

import { Navbar } from '../pages/Navbar'
import { Menu } from '../components/Recepcionista/Menu'
import { Recepcion } from '../pages/Recepcionista/Recepcion'
import { ClienteProvider } from '../context/ClientesContext'
import { Reservas } from '../pages/Recepcionista/Reservas'
import { Configuracion } from '../pages/Recepcionista/Configuracion'
import { VerificacionSalida } from '../pages/Recepcionista/VerificacionSalida'
import { NotificacionProvider } from '../context/NotificacionContext'
import { RutasProtegidas } from '../components/RutasProtegidas'
import { LoginContext } from '../context/LoginContext'
export const RecepcionistaRoutes = () => {
  const { state: { usuario } } = useContext(LoginContext) // se obtiene el usuario del context
  console.log(!!usuario?.rol.includes('recepcionista')) // se muestra true si el usuario tiene el rol de recepcionista
  return (
    <NotificacionProvider>
      <ClienteProvider>
        <Navbar />
        <Menu>
          <Routes>{/* RUTAS PROTEGIDAS */}
            <Route element={<RutasProtegidas isAllowed={!!usuario?.rol.includes('recepcionista')} rutaRedireccion='/login' />}>  {/* si el usuario tiene el rol de recepcionista se muestra el componente, si no se redirecciona al login */}
              <Route path='/home' element={<Home />} />
              <Route path='*' element={<Navigate to='/recepcionista/home' />} />
              <Route path='/recepcion' element={<Recepcion />} />
              <Route path='/reservas' element={<Reservas />} />
              <Route path='/verificacion_salida' element={<VerificacionSalida />} />
              <Route path='/configuracion' element={<Configuracion />} />
            </Route>
          </Routes>
        </Menu>
      </ClienteProvider>

    </NotificacionProvider>
    
  )
}
