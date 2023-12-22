import React from 'react'
import { FormularioEnvioNotificacion } from '../../components/personalAseo/Avisos/FormularioEnvioNotificacion'

export const Avisos = () => {
  return (
    <>
      <section className="container-fluid">
        <div className="d-flex align-items-center justify-content-left gap-3 pt-3 titulo-page">
          <div style={{fontSize:'40px'}} className="d-flex align items-center p-0 m-0">
            <i class="bi bi-bell-fill"></i>
          </div>
          <h1 className='m-0'>Notificar</h1>
        </div>
        <FormularioEnvioNotificacion />
      </section>
    </>
  )
}
