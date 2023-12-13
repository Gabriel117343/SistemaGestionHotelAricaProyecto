import React, { useContext, useEffect, useState } from 'react'
import { ReservaContext } from '../../../context/ReservaContext'
import { ClienteContext } from '../../../context/ClientesContext'
import { LoginContext } from '../../../context/LoginContext'
import toast from 'react-hot-toast'
import swal from 'sweetalert2'
export const FormReserva = () => {

  const { stateReserva, registrarReserva } = useContext(ReservaContext)
  const { stateClientes } = useContext(ClienteContext)
  const { state } = useContext(LoginContext)
  
  const enviarFormulario = async(event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    if (!stateClientes.clienteSeleccionado) {
      return swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar un cliente',
        confirmButtonText: 'Ok',
      })
    }
    form.append('cliente', stateClientes.clienteSeleccionado.id)
    form.append('usuario', state.usuario.id)
    const datos = Object.fromEntries(form)
    console.log(datos)
    const toastId = toast.loading('Registrando...', { id: 'loading' })
    const { success, message } = await registrarReserva(form)

    if (success) {
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      // sweetalert2 con icono de exito
      swal.fire({
        icon: 'success',
        title: 'Reserva creada',
        text: message,
        confirmButtonText: 'Ok',
      }).then((result) => { // si el usuario le da click en ok lo redirige al login, result.isConfirmed es true si el usuario le da click en ok
        if (result.isConfirmed) {
          window.location.href = '/recepcionista/reservas'
        }
      })
    } else {
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'Ok',
      })
    }

  }
  return (
    <section>
      <div className="d-flex gap-1">
        <div className="d-flex col-md-6">

          <input type="text" value={`Responsable: ${state?.usuario.nombre} - ${state?.usuario.rol}`} className='form-control'/>
            
        </div>
        <div className="col-md-6">
          {stateClientes?.clienteSeleccionado ?
          (
            <input type="text" className='form-control' readOnly value={`Cliente: ${stateClientes?.clienteSeleccionado.nombre} - ${stateClientes?.clienteSeleccionado.apellido} `}/>
          ) :
          (
            <input type="text" className='form-control' readOnly value={`Cliente: No seleccionado`}/>
          )
          }
          
        </div>
        
      </div>
        
      <form action="" className='mx-2' onSubmit={enviarFormulario}>
      <div className="row border px-3 rounded mt-1 pb-5 pt-2 mt-3">
        <h1>Reserva</h1>
      
      
        
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="">Fecha de entrada</label>
            <input type="date" className="form-control" placeholder="Fecha de entrada" name='fecha_inicio' required />
          </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Fecha de salida</label>
              <input type="date" className="form-control" placeholder="Fecha de salida" name='fecha_fin' required/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="tipo">Tipo de habitacion</label>
              <select name="tipo" id="tipo" className="form-control" required>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Cantidad de personas</label>
              <select className='form-control' name="ocupacion" id="" required>
                <option value="1">1 Persona</option>
                <option value="2">2 Personas</option>
                <option value="3">3 Personas</option>
              </select>
            </div>
          </div>
          <div className='mt-4'>
            <button className='btn btn-success'>Reservar</button>
          </div>
          
        </div>
        

      </form>

    </section>
    
  )
}
