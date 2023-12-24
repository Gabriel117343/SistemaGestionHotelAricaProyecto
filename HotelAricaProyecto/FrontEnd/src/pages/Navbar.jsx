
import React, { useContext } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import logo from '../../public/images/logoHotelArica.png'; // Importa tu logo

export const Navbar = () => {
  const { state, cerrarSesion } = useContext(LoginContext)
  const navigate = useNavigate()

  
  const cerrarSesionActual = async () => {

    try {
      const { success, message } = await cerrarSesion(state.token)
      if (success) {
        console.log(message)
        toast.success(message)
        localStorage.removeItem('token') // Elimina el token del localstorage
        navigate('/')
      } else {
        console.log(message)
      }

    } catch (error) {
      toast.error(error.message)

    }
  }
  
  return (
    <div className='index-header'>
      
      <nav className='navbar fixed-top nav'>
        
        <div className='container align-items-center justify-content-between '>
          <div>
            <img width="150px" src={logo} alt='Logo Arica' />
            
          </div>
          
          {state.isAuth ? (
            
            <div className='d-flex align-items-center'>
              <i className='bi bi-box-arrow-left text-white'></i>                    
              <button onClick={cerrarSesionActual} className='btn link text-white'>Logout</button>
            </div>
          ) : (
            <div className='d-flex align-items-center'>   
                       
              <Link className='link' to='/login'>Login</Link>
              <i className="bi bi-box-arrow-right text-white px-2"></i>
            </div>
          
          
          )}
          

        </div>

      </nav>

    </div>
  )
}
