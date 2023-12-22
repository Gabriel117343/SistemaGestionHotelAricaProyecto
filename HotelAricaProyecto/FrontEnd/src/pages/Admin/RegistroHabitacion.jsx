import React from 'react'
import { MdBedroomParent } from "react-icons/md";
import { FormularioRegistroHabitacion } from '../../components/admin/RegistroHabitacion/FormularioRegistroHabitacion'
import './pages.css'
export const RegistroHabitacion = () => {
  return (
    <>

      <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
            <MdBedroomParent />
          </div>
          <h1 className='m-0'>Formulario de Registro</h1>
        </div>
        
        <FormularioRegistroHabitacion/>
      </section>

    </>
    
  )
}
