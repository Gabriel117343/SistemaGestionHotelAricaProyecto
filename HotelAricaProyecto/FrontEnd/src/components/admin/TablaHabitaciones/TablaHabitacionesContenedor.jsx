import React, { useContext, useEffect, useState } from 'react'
import { ValidarHabitaciones } from './TablaHabitaciones'
import Swal from 'sweetalert2'

import { toast } from 'react-hot-toast'
import { HabitacionContext } from '../../../context/HabitacionContext'
import './stylesTabla.css'
import { Modal, Button } from 'react-bootstrap';
import { FormularioEdicionHabitacion } from './FormularioEdicionHabitacion'
import swal from 'sweetalert2'
export const TablaHabitacionesContenedor = () => {

  const [showModal, setShowModal] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  
  const { stateHabitacion, eliminarHabitacion, getHabitacion, getHabitaciones, editarHabitacion } = useContext(HabitacionContext)
  useEffect(() => {
    getHabitaciones() 
  }, [])
  const borrarHabitacion = (id) => {
    async function confirmar () {
      const aceptar = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6', //
        cancelButtonColor: '#d33'
      })
      if (aceptar.isConfirmed) {
        toast.loading('Eliminando...', { duration: 2000 })
        setTimeout(async () => {
          const { success, message } = await eliminarHabitacion(id)
          if (success) {
            swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: message,
              confirmButtonText: 'Ok',
            })
          } else {
            swal.fire({
              icon: 'error',
              title: 'Error',
              text: message,
              confirmButtonText: 'Ok',
            })
          }
        }, 2000)
      }
    }
    confirmar()
  }
  const edicionHabitacion = async (id) => {
    // Enviara el id del usuario atravez del la url y el estado de la lista de Habitaciones
    const habitacion = await getHabitacion(id)
  
    // navigate(`/admin/editar/${id}`)
    setHabitacionSeleccionada(habitacion);
    setShowModal(true)
    
  }

  const cerrarModal = () => {

    setShowModal(false);
  }
  return (
    <section className='pt-2'>
      <ValidarHabitaciones listaHabitaciones={stateHabitacion.habitaciones} borrarHabitacion={borrarHabitacion} edicionHabitacion={edicionHabitacion}/>
  
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Editar Habitacion</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          {/* Aquí va tu formulario de edición. Puedes pasar usuarioSeleccionado como prop a tu formulario. */}
          <FormularioEdicionHabitacion habitacionSeleccionada={habitacionSeleccionada} cerrarModal={cerrarModal}/>
        </Modal.Body>
      </Modal>
    </section>
  );
  // return (
  //   <section className='pt-2'>
  //     <ValidarUsuarios listaPersonas={stateUsuario.usuarios} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario}/>

  //   </section>
  // )
}
