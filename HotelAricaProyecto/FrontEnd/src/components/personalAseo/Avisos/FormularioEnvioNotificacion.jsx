import React, { useContext, useEffect } from 'react'
import { NotificacionContext } from '../../../context/NotificacionContext'
import swal from 'sweetalert2'
export const FormularioEnvioNotificacion = () => {

  const { createNotificacionContext } = useContext(NotificacionContext)

  const enviarNotificacion = async (event) => {
    event.preventDefault()
    const formNotificacion = new FormData(event.target)
    const { success, message } = await createNotificacionContext(formNotificacion)
    if (success) {
      swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  return (
    
    <form action="" onSubmit={enviarNotificacion}>
      <div className="form-group">
        <label htmlFor="motivo"></label>
        <input type="text" name="motivo" id="motivo" className="form-control" placeholder="Motivo" />
      </div>
      <div className="form-group">
        <label htmlFor="mensaje"></label>
        <textarea name="mensaje" id="mensaje" className="form-control" placeholder="Mensaje"></textarea>
      </div>
      <div className="form-group"></div>
      <button className="btn btn-primary mt-3" type="submit">Enviar</button>
    </form>
  )
}
