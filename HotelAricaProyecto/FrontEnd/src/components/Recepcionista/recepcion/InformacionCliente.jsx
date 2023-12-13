import { useContext } from 'react'
import { ClienteContext } from '../../../context/ClientesContext'
export const InformacionCliente = ({cambiarVentana}) => {
  console.log('sdf')
  const { stateClientes } = useContext(ClienteContext)

  // retorna informacion del cliente
  return (
    <section className='border px-3 pt-2 pb-5 mt-3 rounded'>
      <h1 className='text-center'>Cliente</h1>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" className='form-control' value={stateClientes.clienteSeleccionado.nombre} disabled/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Apellido</label>
              <input type="text" className='form-control' value={stateClientes.clienteSeleccionado.apellido} disabled/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="">Correo</label>
            <input type="text" className='form-control' value={stateClientes.clienteSeleccionado.email} disabled/>
          </div>
          <div className="col-md-6">
            <label htmlFor="">Telefono</label>
            <input type="text" className='form-control' value={stateClientes.clienteSeleccionado.telefono} disabled/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="">Rut</label>
            <input type="text" className='form-control' value={stateClientes.clienteSeleccionado.rut} disabled/>
          </div>
          <div className="col-md-6">
            <label htmlFor="">Direccion</label>
            <input type="text" className='form-control' value={stateClientes.clienteSeleccionado.direccion} disabled/>
          </div>
        </div>
        <div className="pt-4">
          <button className='form-control btn btn-info' onClick={cambiarVentana}>Seleccionar otro</button>

        </div>
      
 
      </form>

    </section>
    
  )
}
