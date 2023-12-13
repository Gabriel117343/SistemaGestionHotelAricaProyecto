import React, { useContext, useEffect, useState, useRef } from 'react'
import { ClienteContext } from '../../../context/ClientesContext'
import ListGroup from 'react-bootstrap/ListGroup'
import { InformacionCliente } from './InformacionCliente'
import './styles.css'
import toast from 'react-hot-toast'
import { MagicMotion } from 'react-magic-motion'
import { debounce, initial } from 'lodash'
export const ListaClientes = () => {

  const { getClientes, stateClientes, obtenerCliente } = useContext(ClienteContext)
  const [mostrarInfo, setMostrarInfo] = useState(false)

  useEffect (() => {
    getClientes() // se obtienen los clientes al cargar la pagina
  }, [])


  const seleccionarCliente = async(id) => {
    const { success, message } = await obtenerCliente(id) // se obtiene el cliente seleccionado
    // se obtiene porque asi se podra hacer la reserva con el id del cliente
    if (success){
      toast.success(message)
    } else {
      toast.error(message)
    }
    setMostrarInfo(true)

  }
  const cambiarVentana = () => {
    setMostrarInfo(false)

  }
  return (
    mostrarInfo ? // si mostrarInfo es true se muestra la informacion del cliente
    <InformacionCliente cambiarVentana={cambiarVentana}/>
    :
    
    <MostrarTabla clientes={stateClientes.clientes} seleccionarCliente={seleccionarCliente}/>
  )
}
export const MostrarTabla = ({clientes, seleccionarCliente }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const initialState = clientes
  const [clientesFiltrados, setClientesFiltrados] = useState(initialState)

  const filtro = useRef(null)
  const filtrar = () => {
      const texto = filtro.current?.value.toLowerCase() // se obtiene el texto del input
      const clientesFiltrados = clientes?.filter(cliente => {
        return cliente.nombre.toLowerCase().includes(texto) || cliente.apellido.toLowerCase().includes(texto)
      })
      setClientesFiltrados(clientesFiltrados) // se actualiza el estado de los clientes filtrados

  }
  useEffect(() => {

    setClientesFiltrados(clientes) // se actualiza el estado de los clientes filtrados
  }, [clientes]) // se actualiza cada vez que cambia el estado de los clientes
  const debouncedFiltrar = debounce(filtrar, 300) // se usa el debounce para retrazar la ejecucion de la funcion filtrar
  const cantidadClientesPorPagina = 10

  const startIndex = (currentPage - 1) * cantidadClientesPorPagina // esto es para saber desde que indice se va a mostrar
  const endIndex = startIndex + cantidadClientesPorPagina // esto es para saber hasta que indice se va a mostrar
  const clientesPaginados = clientesFiltrados?.slice(startIndex, endIndex) // se obtienen los clientes que se van a mostrar en la pagina
  const totalPages = Math.ceil(clientesFiltrados?.length / cantidadClientesPorPagina) // se obtiene el numero de paginas que se van a mostrar

  return (
    <MagicMotion>
      <div className='border p-3 mt-1 rounded'>
        <div className='mb-3 ps-1'>
          <label htmlFor="filtro"><strong>Nombre</strong></label>
          <br />
          <input ref={filtro} type="search" className="form-control" onChange={debouncedFiltrar} name='filtro' placeholder='Ingrese el nombre o apellido del cliente a buscar'/>

        </div>
        <div className='ps-1'>
          <strong>Cliente</strong>
        </div>
        <ListGroup className='estilo-list'>
          {clientesPaginados.map((cliente) => (
            <ListGroup.Item className='usuario-list' key={cliente._id} action onClick={() => seleccionarCliente(cliente.id)} style={{margin: '2px'}}>
              {cliente.nombre} {cliente.apellido}
            </ListGroup.Item>
          ))}

        </ListGroup>    
      </div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index + 1} className={`btn ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`} onClick={() => setCurrentPage(index + 1)}>
          {index + 1}
        </button>
      )
      )}
      
    </MagicMotion>
    

  )

}
