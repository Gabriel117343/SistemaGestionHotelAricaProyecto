import React from 'react'
import { ListaReservas } from '../../components/Recepcionista/Reservas/ListaReservas'
import './pages.css'
import { FaConciergeBell } from "react-icons/fa"
export const Reservas = () => {
  return (
     <>
     <section className='container-fluid fondo-recepcion' >
       <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
         <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
          <FaConciergeBell />
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
