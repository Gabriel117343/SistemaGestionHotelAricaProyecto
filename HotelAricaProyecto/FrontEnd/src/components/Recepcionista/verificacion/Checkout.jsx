import React, { useContext, useState, useEffect } from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import { VentasContext } from '../../../context/VentasContext'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
export const Checkout = ({ habitacion, cliente, reserva}) => {
  const { editarHabitacion } = useContext(HabitacionContext)
  // Contexto de las ventas
  const { crearVentaContext } = useContext(VentasContext)
  // Desestructuración de los objetos
  const { id: idHabitacion, numero, tipo, precio, cama, descripcion, estado } = habitacion
  const { id: idCliente, nombre, apellido, rut, telefono, email } = cliente
  const { id: idReserva, fecha_inicio, fecha_fin, estado: estadoReserva } = reserva
  const fechaHoy = new Date()
  const [fechaSalida, setFechaSalida] = useState(fechaHoy.toISOString().split('T')[0])
  const dias = Math.floor((fechaHoy - new Date(fecha_inicio)) / (1000 * 60 * 60 * 24)) // Calculo de los dias
  console.log(dias)
  const total = dias * precio
  
  const navigate = useNavigate()
  const volver = () => {
    navigate('/recepcionista/reservas')

  }
  const TerminarReserva = async () => {
    // alerta de que si el cliente no se ha hospedado continuar o cancelar
    if (total === 0) {
      const { isConfirmed } = await swal.fire({
        icon: 'warning',
        title: 'El cliente no se ha hospedado',
        text: '¿Desea continuar?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      })
      if (!isConfirmed) {
        return
      }
    }
    const form = new FormData()
    const toastId = toast.loading('Terminando reserva...', { id: 'loading' })
    form.append('estado', 'mantenimiento')
    
    const { success } = await editarHabitacion(idHabitacion, form)
    if (success) {
      toast.dismiss(toastId, { id: 'loading' })
      swal.fire({
        icon: 'success',
        title: 'Reserva terminada',
        text: 'La habitación ha sido puesta en mantenimiento',
        confirmButtonText: 'Ok',
      })
      const formVenta = new FormData()
      formVenta.append('cliente', idCliente)
      formVenta.append('habitacion', idHabitacion)
      formVenta.append('precio_total', total)
      const { success } = await crearVentaContext(formVenta)
      if (success) {
        toast.success('Venta creada')
        navigate('/recepcionista/reservas')
      }
      
    } else {
      toast.dismiss(toastId, { id: 'loading' })
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al terminar la reserva',
        confirmButtonText: 'Ok',
      })
    }
  }
  // Datos de la reserva, precios, informaciones etc...
  // Para poder hacer el checkout se debe tener la fecha de inicio y la fecha de fin
  // La fecha de inicio es la fecha en la que se hizo la reserva
  // La fecha de fin es la fecha actual
  // Se debe calcular el total de la reserva
  // Se debe calcular el total de dias de la reserva
  // Tabla 
  // id | fecha_inicio | fecha_fin | total | dias | estado | habitacion | cliente | usuario
  return (
    <div className="container border rounded p-2">
    <div className="d-flex justify-content-between align-items-center">
      <h2>Información de la Reserva</h2>
      <button className='btn' onClick={volver}>
        <i style={{fontSize: '30px'}} class="bi bi-arrow-left-circle-fill text-primary"></i>
      </button>
      
    </div>
    
    <table className="table">
      <thead className='table'>
        <tr>
          <th scope="col">Habitación</th>
          <th scope="col">Cliente</th>
          <th scope="col">Reserva</th>
          <th scope="col">Checkout</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>Número: {numero}</p>
            <p>Tipo: {tipo}</p>
            <p>Descripción: {descripcion}</p>
            <p>Cama: {cama}</p>
            <p>Precio: ${precio}</p>
          </td>
          <td>
            <p>Nombre: {nombre} {apellido}</p>
            <p>RUT: {rut}</p>
            <p>Teléfono: {telefono}</p>
            <p>Email: {email}</p>
          </td>
          <td>
            <p>Id reserva: {idReserva}</p>
            <p>Fecha de inicio: {fecha_inicio}</p>
            <p>Fecha de fin: {fecha_fin}</p>
            <p>Estado: {estadoReserva}</p>
          </td>
          <td>
            <p>Fecha de salida:</p>
            <input type="date" className="form-control" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} />
            <div className='pt-3'>
              <label htmlFor="">Total</label>
              <input type="text" className='form-control' value={total} />
            </div>
            
            {fechaSalida > fecha_fin ? <p className='bg-danger rounded p-1 text-white mt-2'>El cliente ha sobrepasado la cantidad de dias</p> : null}
            {dias === 0 && <p className='bg-warning rounded mt-2 ps-2 text-white'>El cliente no se ha hospedado</p>}
          </td>
        </tr>
      </tbody>
    </table>
    <button className="btn btn-primary" onClick={TerminarReserva}>Checkout</button>
    
  </div>
  )
}
