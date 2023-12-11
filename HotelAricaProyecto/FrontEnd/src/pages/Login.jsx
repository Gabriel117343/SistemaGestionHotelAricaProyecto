import React, { useState, useId, useEffect, useContext } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye para usar en input contraseña
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { LoginContext } from '../context/LoginContext'
// importar sweetalert2
import Swal from 'sweetalert2'

// const navigate = useNavigate();

export const Login = () => {

  const { cerrarSesion, iniciarSesion } = useContext(LoginContext) 
  const [btnisDisabled, setBtnisDisabled] = useState(false)
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
  const idFormLogin = useId() // id para el form de login

  useEffect(() => {

   
    localStorage.removeItem('token'); // Elimina el token del localstorage
    cerrarSesion() // Elimina el token del estado global
    console.log('Borrando Token...')
  }, [])
 

  
  
  const navigate = useNavigate()
  const enviarFormLogin = async (event) => { 
    event.preventDefault()
    setBtnisDisabled(true)
    const usuario = Object.fromEntries(new FormData(event.target))
    const toastId = toast.loading('Cargando...', { id: 'loading' })
    try {
      const { success, message, rol } = await iniciarSesion(usuario)
    
      toast.dismiss(toastId) // cerrar el toast de cargando
        if (success) {
          setBtnisDisabled(false)
          toast.success(message, { id: 'loading' })
          setTimeout(() => {
            if (rol === 'administrador') {
              navigate('/admin/home')
            } else if (rol === 'recepcionista') {
              navigate('/recepcionista')
            } else if (rol === 'personalaseo') {
              navigate('/personalaseo')
            }

          }, 1500) 
        } else {
          setBtnisDisabled(false)
          toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
          toast.error(message)
        }
    } catch (error) {
      setBtnisDisabled(false)
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      if (error.message === 'Credenciales Invalidas') {
        toast.error('Email o contraseña incorrectos')
      } else {
        //mensaje personalizado de acceso denegado con sweetalert 2
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'Su cuenta esta dada de baja, contacte con el administrador',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
        })

      }
      
    }
  }
  
  // Activa o desactivar la visualizacion de la contraseña atravez del estado anterior
  const estadoContraseña = () => {
    setMostrarContraseña(prevState => !prevState)
  }
  
  return (
    <section className="gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body px-5 pb-4 text-center">

                <div>
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  
                  <div className='mb-5'>
                    <img width='250px' src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" alt="" />
                    <p className="text-white-50 pt-2">Porfavor inicia sesion!</p>
                  </div>
                  
                  <form onSubmit={enviarFormLogin} id={idFormLogin}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id={`${idFormLogin}-email`}
                        className="form-control form-control-lg"
                        placeholder="Email"
                        name='email'        
                      />
                    </div>
                    <div className="form form-white mb-4 contraseña-container">
                      <input
                        id={`${idFormLogin}-password`}
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name='password'
                        type={mostrarContraseña ? 'text' : 'password'}
                      />
                      <span className='icon'>
                        <FontAwesomeIcon style={{width: '25px', height: '25px'}}
                          icon={mostrarContraseña ? faEyeSlash : faEye}
                          onClick={estadoContraseña}
                        />
                      </span>
                    </div>
                    <p  className="small mb-3 pb-lg-2"><Link to='/form-envio-correo' className="text-white-50">Olvidaste tu contraseña?</Link></p>
                    
                    <button type='submit' className="btn form-control btn-outline-light btn-lg px-5" disabled={btnisDisabled}>Login</button>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}




