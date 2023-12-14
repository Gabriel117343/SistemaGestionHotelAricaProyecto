import React from 'react'

import { CambiarImagenPerfil } from '../../components/admin/configuracion/CambiarImagenPerfil'
import { UsuariosProvider } from '../../context/UsuariosContext'
export const Configuracion = () => {

 
  return (
    <>

      <section className='container'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-4">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
          <i class="bi bi-person-bounding-box"></i>
          </div>
          <h1 className='m-0'>Configuracion de la Cuenta</h1>
        </div>
        <UsuariosProvider> {/* Se envuelve el componente CambiarImagenPerfil con el context UsuariosProvider para que pueda acceder a los datos del usuario */}
          <CambiarImagenPerfil/>

        </UsuariosProvider>
        
        
       
      </section>

    </>
    
  )
}
