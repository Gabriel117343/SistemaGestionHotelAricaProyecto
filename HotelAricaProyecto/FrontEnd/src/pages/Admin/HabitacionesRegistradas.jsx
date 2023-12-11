import React from 'react'
import { TablaHabitacionesContenedor } from '../../components/admin/TablaHabitaciones/TablaHabitacionesContenedor'
import letrero from '../../../public/images/letrero-rooms.png'
export const HabitacionesRegistradas = () => {

 
  return (
    <>

      <section className='container'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-4">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
            <img width='90px' src={letrero} alt="letrero con texto de habitacion" />
          </div>
          <h1 className='m-0'>Lista de Habitaciones Registradas</h1>
        </div>
        
        <TablaHabitacionesContenedor/>
       
      </section>

    </>
    
  )
}
