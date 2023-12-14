import React, { useContext, useId, useState, useRef } from 'react'
import { InformacionUsuario } from './InformacionUsuario'
import { LoginContext } from '../../../context/LoginContext'
import { UsuariosContext } from '../../../context/UsuariosContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye para usar en input contraseña
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'
import './configuracion.css'
export const CambiarImagenPerfil = () => {
  const { state, obtenerUsuarioLogeado } = useContext(LoginContext) // se obtiene el usuario logeado actual
  const { modificarUsuario } = useContext(UsuariosContext) // se obtiene el usuario
  const imagenInicial = state.usuario && state.usuario.imagen ? state.usuario.imagen : null

  const [usuarioImagen, setUsuarioImagen] = useState({imagen: imagenInicial}) // se obtiene la imagen del usuario

  const [mostrarContraseña1, setMostrarContraseña1] = useState(false)
  const [mostrarContraseña2, setMostrarContraseña2] = useState(false)
  const formImagenId = useId()
  const formContraseñaId = useId()

  const formImagenRef = useRef()
  const formContraseñaRef = useRef()
  const cambiarImagenPerfil = async (event) => {
    event.preventDefault()
    const imagen = event.target[0].files[0]
  
    const formData = new FormData
    formData.append('imagen', imagen)
    const toastId = toast.loading('Actualizando Imangen...', { id: 'loading' })
   
    const { success, message} = await modificarUsuario(state.usuario.id, formData)
    if (success) {
      toast.dismiss(toastId, { id: 'loading' })
      toast.success(message)
      const token = localStorage.getItem('token')
      obtenerUsuarioLogeado(token)
      formImagenRef.current.reset()
    } else {
      toast.dismiss(toastId, { id: 'loading' })
      toast.error(message)
      formImagenRef.current.reset()
    } 
  }
  
  const handleFileChange = (e) => { // esto es para la imagen

    if (e.target.files[0]) {
      setUsuarioImagen({...usuarioImagen, imagen: URL.createObjectURL(e.target.files[0])}); // esto crea una url de la imagen
    }
  }
  const cambiarContraseña = async(event) => {
    event.preventDefault()
    const validacion = Object.fromEntries(new FormData(event.target))
    const formData = new FormData
    formData.append('password', validacion.contraseña)
    const toastId = toast.loading('Cargando...', { id: 'loading' })
    if (validacion.contraseña !== validacion.contraseñaValidacion) {
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      toast.error('Las contraseñas no coinciden')
      return
    } else {
     
        console.log(state.usuario.id)
        const { success, message } = await modificarUsuario(state.usuario.id, formData)
        if (success) {
          toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
          toast.success('Contraseña cambiada con éxito')
          formContraseñaRef.current.reset()

        } else {
          toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
          toast.error('Hubo un error al cambiar la contraseña')
          formContraseñaRef.current.reset()
          
        }
      }
      
    
  }
  const estadoContraseña1 = () => {
    setMostrarContraseña1(prevState => !prevState)
  }
  const estadoContraseña2 = () => {
    setMostrarContraseña2(prevState => !prevState)
  }

  return (
    <div className="row mt-2">
      <div className="col-md-6">
        <div className="column">
          <div className="col-md-12">
            <div className="card">
            <div className="card-body">
              <h2>Cambiar imagen de perfil</h2>
              <form id={formImagenId} onSubmit={cambiarImagenPerfil} ref={formImagenRef}>
                <div className="mb-3">
                  <label for="formFile" className="form-label">Nueva imagen de Perfil</label>
                  <input onChange={handleFileChange} className="form-control" type="file" name='imagen' required/>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>

          </div>
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body">
                <form className={formContraseñaId} onSubmit={cambiarContraseña} ref={formContraseñaRef}>
                  <h2>Cambiar contraseña</h2>
                  <div className="mb-3 contraseña-cont">
                    <label for="formFile" className="form-label"> Contraseña</label>
                    <input className="form-control" type={mostrarContraseña1 ? 'text' : 'password'} name='contraseña' required/>
                    <span className='icon'>
                        <FontAwesomeIcon style={{width: '20px', height: '25px'}}
                          icon={mostrarContraseña1 ? faEyeSlash : faEye}
                          onClick={estadoContraseña1}
                        />
                      </span>
                  </div>
                  <div className="mb-3 contraseña-cont">
                    <label for="formFile" className="form-label">Confirmar Contraseña</label>
                    <input className="form-control" type={mostrarContraseña2 ? 'text' : 'password'} name='contraseñaValidacion'  required/>
                    <span className='icon'>
                        <FontAwesomeIcon style={{width: '20px', height: '25px'}}
                          icon={mostrarContraseña2 ? faEyeSlash : faEye}
                          onClick={estadoContraseña2}
                        />
                      </span>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
              
          </div>
          
        </div>
    
      </div>
      <div className="col-md-6">
        <InformacionUsuario usuario={state.usuario} usuarioImagen={usuarioImagen}/>
        
      </div>
    </div>
  )
}
