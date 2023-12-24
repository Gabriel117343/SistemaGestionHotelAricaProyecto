import { useContext, useEffect } from 'react'
import { ClienteContext } from '../../../context/ClientesContext'
import { HabitacionContext } from '../../../context/HabitacionContext'
export const ReservaDetalle = ({ reserva }) => {
  // busca la habitacion y el cliente asignado a la reserva
const { stateHabitacion: { habitaciones }, getHabitaciones } = useContext(HabitacionContext)
  const { stateClientes: { clientes }, getClientes } = useContext(ClienteContext)

  useEffect(() => {
    const cargar = async () => {
      await getHabitaciones()
      await getClientes()
    }
    cargar()
  
  }, [])
  const clienteEncontrado = clientes.find(cliente => cliente.id === reserva.cliente)
  const habitacionEncontrada = habitaciones.find(habitacion => habitacion.id === reserva.habitacion)
  return (
    <div>
      <p>ID: {reserva.id}</p>
      <p>Fecha de Inicio: {reserva.fecha_inicio}</p>
      <p>Fecha de Fin: {reserva.fecha_fin}</p>
      <p>Estado: {reserva.estado}</p>
      {/* Asegúrate de que el cliente y la habitación están definidos antes de intentar acceder a sus propiedades */}
      <p>Cliente: {clienteEncontrado ? clienteEncontrado.nombre : 'Cliente no encontrado'}</p>
      {clienteEncontrado && (
        <>
          <p>Email del Cliente: {clienteEncontrado.email}</p>
          <p>Teléfono del Cliente: {clienteEncontrado.telefono}</p>
        </>
      )}
      <p>Habitación: {habitacionEncontrada ? habitacionEncontrada.numero : 'Habitación no encontrada'}</p>
      {habitacionEncontrada && (
        <>
          <p>Tipo de Habitación: {habitacionEncontrada.tipo}</p>
          <p>Precio de la Habitación: {habitacionEncontrada.precio}</p>
        </>
      )}
    </div>
  )
}