import React, { useContext, useEffect, useState } from 'react'
import { ReservaContext } from '../../../context/ReservaContext'
import { HabitacionContext } from '../../../context/HabitacionContext'
import { ClienteContext } from '../../../context/ClientesContext'
import { ReservaDetalle } from './ReservaDetalle'
import { Modal, Button } from 'react-bootstrap'
import { debounce } from 'lodash'
import { MagicMotion } from 'react-magic-motion'
export const ListaReservas = () => {

  const { stateReserva, getReservas } = useContext(ReservaContext)
  const { stateClientes, getClientes } = useContext(ClienteContext)

  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShowModal(true)
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)
  
  const handleClose = () => setShowModal(false)
  const seleccionarReserva = (reserva) => {
    setReservaSeleccionada(reserva)
    handleShow() // se muestra el modal
  }
  
  useEffect(() => {
    const cargar = async () => {
      await getReservas()
      await getClientes()
    }
    cargar()

  }, [])
  useEffect(() => {
    setReservasFiltradas(stateReserva.reservas)
  }, [stateReserva.reservas]) // se ejecutar cada vez que cambie el estado de las reservas
  const [reservasFiltradas, setReservasFiltradas] = useState(stateReserva.reservas)

  const cambiarFiltro = (t) => {
    const texto = t.toLowerCase()
    console.log(t)
    const reservasFiltradas = stateReserva.reservas.filter(reserva => {
      const cliente = stateClientes.clientes.find(cliente => cliente.id === reserva.cliente)
      return cliente.nombre.toLowerCase().includes(texto) || cliente.apellido.toLowerCase().includes(texto)
    })
    setReservasFiltradas(reservasFiltradas)
  }
  const debouncedFiltrar = debounce(cambiarFiltro, 300)
  return (
    <div className="table-responsive">
      <div className='pb-2 d-flex justify-content-end'>
        <div className="col-md-6 d-flex gap-2 align-items-center">
        
          <i className="bi bi-search"></i>
          <input type="text" className='form-control' onChange={e => debouncedFiltrar(e.target.value)} placeholder='Buscar por cliente'/>
        </div>
        
      </div>
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
        <MagicMotion> {/* Se envuelve la tabla con el componente MagicMotion para que tenga animaciones */}
          {reservasFiltradas.map((reserva) => {
            const cliente = stateClientes.clientes.find(cliente => cliente.id === reserva.cliente)
            
            return (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.fecha_inicio}</td>
                <td>{reserva.fecha_fin}</td>
                <td>{reserva.estado}</td>
                <td>{cliente ? cliente.nombre : 'Cliente no encontrado'}</td>
                <td>
                <button className="btn btn-primary" onClick={() => seleccionarReserva(reserva)}>Ver</button>
                </td>
              </tr>
            )
          })}

        </MagicMotion>
       
        </tbody>
        
      </table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservaSeleccionada && <ReservaDetalle reserva={reservaSeleccionada} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {stateReserva.reservas.length === 0 && <h1 className='text-center pt-3'>No hay reservas</h1>}
    </div>
  )
}
