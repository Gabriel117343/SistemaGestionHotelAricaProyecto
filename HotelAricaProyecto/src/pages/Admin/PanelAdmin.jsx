import React from 'react'
import { Navbar } from '../Navbar'
export const PanelAdmin = () => {
  return (
    <>
      <Navbar />{/* eliminar y reemplzar por otro navbar */}
      <main className='container'>
        <h1 className='text-center'>PanelAdmin</h1>
        <strong className='text-center'>Este es el panel de admin donde iras todas las opciones que tiene</strong>
        <p>Gestion Usuarios</p>
        <p>Gestion Habitaciones</p>
        <p>Infomracion</p>
      </main>
    </>
    
  )
}
