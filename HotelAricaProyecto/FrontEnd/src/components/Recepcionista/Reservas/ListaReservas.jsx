import React, { useContext, useEffect, useState } from 'react'
import { ReservaContext } from '../../../context/ReservaContext'
import { HabitacionContext } from '../../../context/HabitacionContext'
import { ClienteContext } from '../../../context/ClientesContext'
import { set } from 'lodash'
export const ListaReservas = () => {
  const [cliente, setCliente] = useState(null)
  const { stateReserva, getReservas } = useContext(ReservaContext)
  const { stateHabitacion } = useContext(HabitacionContext)
  const { stateClientes, getClientes } = useContext(ClienteContext)
  useEffect(() => {
    const cargar = async () => {
      await getReservas()
    }
    cargar()

  }, [])
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Fecha Ingreso</th>
            <th>Fecha Salida</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stateReserva.reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.fecha_inicio}</td>
              <td>{reserva.fecha_fin}</td>
              <td>{reserva.habitacion.estado}</td>
              <td>{reserva.cliente.nombre}</td>
              <td>
                <button className="btn btn-primary">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
