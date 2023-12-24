import React, { useContext, useEffect, useState } from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import './styles.css'
import { Checkout } from './Checkout'
import { ReservaContext } from '../../../context/ReservaContext' 
import { ClienteContext } from '../../../context/ClientesContext'
export const ListaHabitaciones = () => {
  const { stateHabitacion, getHabitaciones, getHabitacion} = useContext(HabitacionContext)
  const { stateReserva: { reservas }, getReservas } = useContext(ReservaContext)
  const { stateClientes: { clientes }, getClientes } = useContext(ClienteContext)
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null)
  const [reservaEncontrada, setReservaEncontrada] = useState(null)
  const [clienteEncontrado, setClienteEncontrado] = useState(null)
  useEffect(() =>{
    async function cargar(){
      await getHabitaciones()
      await getReservas()
      await getClientes()
    }
    cargar()
  }, [])
  useEffect(() => {
    if (reservaEncontrada) { // si hay una reserva encontrada se busca el cliente
      const c = clientes.find((cliente) => cliente.id === reservaEncontrada.cliente) // se busca el cliente que tenga el id de la reserva encontrada
      setClienteEncontrado(c)
    }
  }, [reservaEncontrada, clientes])
  const seleccionar = async (id) => {
    await getHabitacion(id) // se envia el id de la habitacion seleccionada para buscarla
    const r = reservas.find((reserva) => reserva.habitacion === id) // se busca la reserva que tenga el id de la habitacion seleccionada
    setReservaEncontrada(r)

  }
  const habitacionesNoDisponibles = stateHabitacion.habitaciones.filter((habitacion) => habitacion.estado !== 'disponible' && habitacion.estado !== 'mantenimiento')
  
  return (
    <>
     {stateHabitacion.habitacionSeleccionada && reservaEncontrada && clienteEncontrado ?
    (
      <Checkout habitacion={stateHabitacion.habitacionSeleccionada} cliente={clienteEncontrado} reserva={reservaEncontrada} />
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
          <button className='btn form-control checkout-boton-fondo' onClick={() => seleccionar(habitacion.id)}>Verificar Salida <i class="bi bi-info-circle-fill text-white"></i></button>
        </div>
        ))}
      </div>

    )
  }

    
    </>
   
    
  )
}
