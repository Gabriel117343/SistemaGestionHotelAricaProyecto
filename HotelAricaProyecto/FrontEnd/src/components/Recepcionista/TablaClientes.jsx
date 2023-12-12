import React, { useContext, useEffect, useState } from 'react'
import { ClienteContext } from '../../context/ClientesContext'
import ListGroup from 'react-bootstrap/ListGroup'
import { MagicMotion } from 'react-magic-motion'
import './styles.css'
export const TablaClientes = () => {

  const { getClientes, stateClientes, obtenerCliente } = useContext(ClienteContext)
  const [mostrarInfo, setMostrarInfo] = useState(false)

  useEffect (() => {
    getClientes()
  }, [])

  // lista de clientes to to list no una tabla, lista para poder seleccionar un cliente utilizando listGroup que cambie de color al seleccionar y que se pueda seleccionar
  const seleccionarCliente = async(id) => {
    const { success, message } = await obtenerCliente(id)
    if (success){
      console.log('exito')
    } else {
      console.log('error')
    }
    setMostrarInfo(true)

  }
  const cambiarVentana = () => {
    setMostrarInfo(false)

  }
  return (
    mostrarInfo ?
    <InformacionCliente cambiarVentana={cambiarVentana}/>
    :
    
    <MostrarTabla clientes={stateClientes.clientes} seleccionarCliente={seleccionarCliente}/>
  )
  

}
export const MostrarTabla = ({clientes, seleccionarCliente }) => {
  console.log(clientes)
  return (
    <div>
      <strong className='ms-1'>Nombre</strong>
      <ListGroup className='estilo-list'>

        {clientes.map((cliente) => (
          <ListGroup.Item className='usuario-list' key={cliente._id} action onClick={() => seleccionarCliente(cliente.id)} style={{margin: '2px'}}>
            {cliente.nombre} {cliente.apellido}
          </ListGroup.Item>
        ))}
      </ListGroup>    
    </div>

  )

}
export const InformacionCliente = ({cambiarVentana}) => {
  console.log('sdf')
  const { stateClientes } = useContext(ClienteContext)
  console.log(stateClientes.clienteSeleccionado)
  // retorna informacion del cliente
  return (
    <section className='border px-3 pt-2 pb-5 mt-3 rounded'>
      <h1 className='text-center'>Informacion</h1>
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
          <button className='form-control btn btn-info' onClick={cambiarVentana}>Volver</button>

        </div>
      
 
      </form>

    </section>
    
  )
}
