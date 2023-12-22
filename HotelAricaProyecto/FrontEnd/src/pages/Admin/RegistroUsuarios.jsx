import React from 'react'
import { FormRegistroUsuarios } from '../../components/admin/FormRegistroUsuarios.jsx'
import './pages.css'
export const RegistroUsuarios = () => {

 
  return (
    <>
      

  
      <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
          <i class="bi bi-people-fill"></i>
          </div>
          <h1 className='m-0'>Formulario de Registro</h1>
          

        </div>
        <FormRegistroUsuarios/>
       
        

      </section>
      
      

    </>
    
  )
}
