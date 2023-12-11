import React, { useContext, useEffect, useState } from 'react'
import { ValidarUsuarios } from './TablaUsuarios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { UsuariosContext } from '../../../context/UsuariosContext'
import './styles.css'
import { Modal, Button } from 'react-bootstrap';
import { FormularioEdicion } from './FormularioEdicion'
export const TablaUsuariosContenedor = () => {

  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  
  const { stateUsuario, eliminarUsuario, getUsuarioSeleccionado, getUsuarios } = useContext(UsuariosContext)
  useEffect(() => {
    getUsuarios()    
  }, [])
  const borrarPersona = (id) => {
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
          const { success, message } = await eliminarUsuario(id)
          if (success) {
            toast.success(message)
          } else {
            toast.error(message)
          }
        }, 2000)
      }
    }
    confirmar()
  }

  const edicionUsuario = async (id) => {
    // Enviara el id del usuario atravez del la url y el estado de la lista de usuarios
    const usuario = await getUsuarioSeleccionado(id)
  
    // navigate(`/admin/editar/${id}`)
    setUsuarioSeleccionado(usuario);
    setShowModal(true)
    
  }
  const handleSaveChanges = () => {
    
    setShowModal(false);
  }
  const cerrarModal = () => {

    setShowModal(false);
  }
  return (
    <section className='pt-2'>
      <ValidarUsuarios listaPersonas={stateUsuario.usuarios} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario}/>
  
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className='bg-info'>
          <Modal.Title>Editar Usuario</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          {/* Aquí va tu formulario de edición. Puedes pasar usuarioSeleccionado como prop a tu formulario. */}
          <FormularioEdicion usuario={usuarioSeleccionado} cerrarModal={cerrarModal}/>
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
