import React from 'react'

import { FaUsersGear } from "react-icons/fa6";
import { TablaUsuariosContenedor } from '../../components/admin/TablaUsuarios/TablaUsuariosContenedor'
export const UsuariosRegistrados = () => {

 
  return (
    <>
      

  
      <section className='container'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-4">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
            <FaUsersGear />
          </div>
          <h1 className='m-0'>Lista de Usuarios Registrados</h1>
          

        </div>
        <TablaUsuariosContenedor/>
       
        

      </section>
      
      

    </>
    
  )
}
