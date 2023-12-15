import React, { useContext, useEffect } from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import './styles.css'
import { Checkout } from './Checkout'
export const ListaHabitaciones = () => {
  const { stateHabitacion, getHabitaciones, getHabitacion} = useContext(HabitacionContext)

  useEffect(() =>{
    async function cargar(){
      await getHabitaciones()
    }
    cargar()
  }, [])
  const seleccionarHabitacion = async (id) => {
    await getHabitacion(id)
    console.log(stateHabitacion.habitacionSeleccionada)
  }
  const habitacionesNoDisponibles = stateHabitacion.habitaciones.filter((habitacion) => habitacion.estado !== 'disponible' && habitacion.estado !== 'mantenimiento')

  return (
    <>
     {stateHabitacion.habitacionSeleccionada ?
    (
      <Checkout/>
    )
    :
    (
      <div className="row d-flex"> {/* si no hay una habitacion seleccionada se muestran las habitaciones */}
       
      {habitacionesNoDisponibles.map((habitacion) => (
        <div className={`card ocupada col-md-3 col-ms-6 rounded card-checkout-fondo`} key={habitacion.id}>
          <div className='hora'>
            <p>24h</p>
          </div>
          
          <div className="card-body">
            <h2 className="card-title">{habitacion.numero}</h2>
      
            <p style={{ textTransform: 'capitalize' }}>{habitacion.tipo}</p>
          </div>
          <button className='btn form-control checkout-boton-fondo' onClick={() => seleccionarHabitacion(habitacion.id)}>Verificar Salida <i class="bi bi-info-circle-fill text-white"></i></button>
        </div>
        ))}
      </div>

    )
  }

    
    </>
   
    
  )
}
