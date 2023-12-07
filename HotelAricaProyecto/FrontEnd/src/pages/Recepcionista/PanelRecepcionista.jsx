import React from 'react'
import { Navbar } from '../Navbar'
// improtar estiloos
import './styles.css'
export const PanelRecepcionista = () => {
  return (
    <main>
      <Navbar />
      <section className='row'>
        
        <div className="col-md-4">
          <div className="d-flex">
          <h1>Opciones</h1>

          <hr />
          <strong>Gestionar Usuarios</strong>

        </div>
          
        </div>
        <div className="col-md-8">
          <h1>Categorias</h1>
        </div>
        

      </section>
    </main>
  )
}
