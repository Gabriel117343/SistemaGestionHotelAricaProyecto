
import React, { useContext } from 'react'
import { ClienteContext } from '../../../context/ClientesContext'
import { toast } from 'react-hot-toast'
export const FormRegistroClientes = () => {
  const { crearCliente } = useContext(ClienteContext)

  const enviarFormulario = async(event) => {
    event.preventDefault()
    const formCliente = new FormData(event.target)
    const toastId = toast.loading('Registrando...', { id: 'loading' })
    const { success, message } = await crearCliente(formCliente)
    if (success) {
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      toast.success(message)
    } else {
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      toast.error(message)
    }


  }
  return (
    <form action="" onSubmit={enviarFormulario}>
      <div className="row">
        
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" name='nombre' placeholder='Ingrese el nombre'/>

        </div>
        <div className="col-md-6">
          <label htmlFor="apellido" className="form-label">Apellido</label>
            <input type="text" className="form-control" id="apellido" name='apellido'  placeholder='Ingrese el apellido'/>

        </div>
        <div className="col-md-6">
          <label htmlFor="rut" className="form-label">Rut</label>
          <input type="text" className="form-control" id="rut" name='rut' placeholder='Ej: 12345678-9' />
          
        </div>
      
        <div className="col-md-6">
          <label htmlFor="telefono" className="form-label">Telefono</label>
          <input type="text" className="form-control" id="telefono" name='telefono' placeholder='Ej: +56 932497343'/>

        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Correo</label>
            <input type="email" className="form-control" id="email" name='email' placeholder='Ej: correo@gmail.com'/>

        </div>
        <div className="col-md-6">
          <label htmlFor="direccion" className="form-label">Direccion</label>
            <input type="text" className="form-control" id="direccion" name='direccion' placeholder='Ingrese la direccion'/>

        </div>
        <div className="col-12 col-md-6">
          
      
        </div>
        <div className="col-12 mt-3">
          <button className="btn btn-success" type="submit">Registrar</button>
        </div>
      </div>

    </form>
  )
}
