import React from 'react'
import { ListaReservas } from '../../components/Recepcionista/Reservas/ListaReservas'
export const Reservas = () => {
  return (
     <>
     <section className='container fondo-recepcion' >
       <div className="d-flex align-items-center justify-content-left gap-3  pt-4">
         <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
           <img width='40px' src="https://cdn-icons-png.flaticon.com/128/3313/3313488.png" alt="Esto es una imagen de un icono" />
         </div>
         <h1 className='m-0'>Mis reservas</h1>
       </div>
       <div className="row mt-3">
         <ListaReservas/>
       </div>
     </section>

   </>
  )
}
