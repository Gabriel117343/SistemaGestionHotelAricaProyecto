import React, { useContext, useEffect, useState } from 'react'
import { ValidarUsuarios } from './TablaUsuarios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { UsuariosContext } from '../../../context/UsuariosContext'
import './styles.css'
import { Modal, Button } from 'react-bootstrap';
import { FormularioEdicion } from './FormularioEdicion'
import { debounce } from 'lodash'
export const TablaUsuariosContenedor = () => {

  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  
  const [usuarioBuscado, setUsuarioBuscado] = useState(null)
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
  const cambiarFiltro = (event) => {
    setUsuarioBuscado(event.target.value) // se guarda el valor del input de busqueda en el estado productoBuscado
  }
  const debounceCambiarFiltro = debounce(cambiarFiltro, 300) // se hace un debounce para retrasar la ejecucion de la funcion cambiarFiltro
  return (
    <section className='pt-2'>
       <div className="row d-flex mb-2">
        <div className="col-md-12">
          <input className="form-control" type="text" placeholder="Buscar producto por nombre, telefono, correo, rut..." onChange={debounceCambiarFiltro} />
        </div>
      </div>
      <ValidarUsuarios listaPersonas={stateUsuario.usuarios} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario} filtro={usuarioBuscado}/>
  
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
