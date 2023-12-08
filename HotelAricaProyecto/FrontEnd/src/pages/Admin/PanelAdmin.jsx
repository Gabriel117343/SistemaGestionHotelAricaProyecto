import React, { useEffect} from 'react'
import { Navbar } from '../Navbar'
import { getUser } from '../../api/usuariosLogin.api'
export const PanelAdmin = () => {

  useEffect(() => {
    const obtenerUsuarioLogeado = async () => {
      try {
        const res = await getUser()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerUsuarioLogeado()
  }, [])

  
  return (
    <>
      <Navbar />{/* eliminar y reemplzar por otro navbar */}
      <main className='container'>

        <section>
          <aside>

            <strong>Bievenido</strong>
          </aside>
          
        </section>
        <h1 className='text-center'>PanelAdmin</h1>
        <strong className='text-center'>Este es el panel de admin donde iras todas las opciones que tiene</strong>
        <p>Gestion Usuarios</p>
        <p>Gestion Habitaciones</p>
        <p>Infomracion</p>
       
      </main>
    </>
    
  )
}
