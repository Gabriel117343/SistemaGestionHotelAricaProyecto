import React from 'react'
import { ListaHabitaciones } from '../../components/Recepcionista/verificacion/ListaHabitaciones'
import './pages.css'
export const VerificacionSalida = () => {
  return (
    <>
      <section className='container-fluid fondo-recepcion' >
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
            <i class="bi bi-box-arrow-in-right"></i>
          </div>
          <h1 className='m-0'>Verificacion de Salida</h1>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <ListaHabitaciones/>
            
          </div>
          
        </div>
      </section>

    </>
    
  )
}
