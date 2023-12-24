import { set } from 'lodash'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export const RutasProtegidas = ({ children, isAllowed, rutaRedireccion}) => {
  
  if (!isAllowed) {
   
    console.log('ESTA RUTA ESTA PROTEGIDA!')
    return <Navigate to={rutaRedireccion} /> // si no esta autorizado, redirecciona a la ruta de redireccion /login
  }
  return children ? children : <Outlet /> // Si no hay children, renderiza el Outlet
  // Outlet es el componente que renderiza las multiples rutas hijas
}
