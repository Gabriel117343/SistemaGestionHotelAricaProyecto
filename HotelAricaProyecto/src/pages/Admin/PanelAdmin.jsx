import React, { useEffect } from 'react'
import { Navbar } from '../Navbar'
import { getAllUsuarios } from '../../api/usuario.api'
export const PanelAdmin = () => {
  // useEffect(() => { // esto es para probar la api
    
  //   async function cargarUsuarios () {
  //     const res = await getAllUsuarios()
  //     console.log(res.data)
  //   }
  //   cargarUsuarios
  // })
  return (
    <>
      <Navbar />{/* eliminar y reemplzar por otro navbar */}
      <main className='container'>
        <h1 className='text-center'>PanelAdmin</h1>
        <strong className='text-center'>Este es el panel de admin donde iras todas las opciones que tiene</strong>
        <p>Gestion Usuarios</p>
        <p>Gestion Habitaciones</p>
        <p>Infomracion</p>
        <form action="">
          <input type="text" className="form-control" list='peliculas' placeholder='Ej: Avengers' />
          <datalist id='peliculas'>
            <option value="Avengers">Avengers</option>
            <option value="Avengers 2">Avengers 2</option>
            <option value="Avengers 3">Avengers 3</option>
            <option value="Avengers 4">Avengers 4</option>
          </datalist>

        </form>
      </main>
    </>
    
  )
}
