import React, { useState, useContext, useId } from 'react'
import { LoginContext } from '../context/LoginContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { set } from 'lodash'
// const navigate = useNavigate();

export const Login = () => {
  const { iniciarSesion } = useContext(LoginContext)

  const [btnisDisabled, setBtnisDisabled] = useState(false)
  const idFormLogin = useId() // id para el form de login
  
  const navigate = useNavigate()
  const enviarFormLogin = async (event) => { 
    event.preventDefault()
    setBtnisDisabled(true)
    const usuario = Object.fromEntries(new FormData(event.target))
    const toastId = toast.loading('Cargando...', { id: 'loading' })
    try {
      const { success, message, rol } = await iniciarSesion(usuario)
    
      toast.dismiss(toastId) // cerrar el toast de cargando
      setTimeout(() => {
        if (success) {
          setBtnisDisabled(false)
          toast.success(message, { id: 'loading' })
          console.log(rol)
         
          if (rol === 'administrador') {
            navigate('/admin')
          } else if (rol === 'recepcionista') {
            navigate('/recepcionista')
          }
    
        } else {
          setBtnisDisabled(false)
          toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
          toast.error(message)
        }


      }, 1000)
      
    } catch (error) {
      setBtnisDisabled(false)
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      toast.error(error.message)
    }
  }
  

  
  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
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
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id={`${idFormLogin}-password`}
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name='password'
                      />
                    </div>
                    <p className="small mb-3 pb-lg-2"><a href="#!" className="text-white-50">Olvidaste tu contraseña?</a></p>
                    
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




