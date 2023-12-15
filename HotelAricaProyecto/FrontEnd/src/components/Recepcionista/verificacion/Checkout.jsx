import React, { useContext, useState, useEffect } from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import { ReservaContext } from '../../../context/ReservaContext'
import { ClienteContext } from '../../../context/ClientesContext'
export const Checkout = () => {
  const { stateHabitacion } = useContext(HabitacionContext)
  const { stateReserva, getRerva} = useContext(ReservaContext)

  useEffect(() => {
    const cargar = async () => {
      await getRerva(stateHabitacion.habitacionSeleccionada.id)
    }
    cargar()
  }, [])
  
  console.log(stateReserva.reserva)
  const { stateClientes } = useContext(ClienteContext)
  const [total, setTotal] = useState(0)
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" className='form-control' value='nombre' disabled/>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Apellido</label>
          <input type="text" className='form-control' value='apellido' disabled/>
        </div>
      </div>
    </div>
  )
}
