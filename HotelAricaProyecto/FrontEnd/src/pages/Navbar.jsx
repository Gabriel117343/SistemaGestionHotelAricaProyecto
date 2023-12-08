// import { Link } from 'react-router-dom'
// export function NavbarIndex () {
//   return (

//     <header>

//       <nav className='navbar fixed-top'>

//         <div className='container align-items-center justify-content-between '>
//           <div>
//             <img className='logo' src='public/images/LogoAricaHotel.png' alt='Logo Arica' />
//             <Link className='link' to='/index'>Inicio</Link>
//             <Link className='link ms-4' to='/sobre-nosotros'>Sobre Nosotros</Link>

//           </div>
//           <div>
//             <Link className='link' to='/admin/admin-registro-usuarios'>Admin Login</Link>
//             <Link className='ms-4 link' to='/index'>User Login</Link>
//           </div>

//         </div>

//       </nav>

//     </header>

//   )
// }
import React, { useContext, useEffect } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const { state, cerrarSesion, obtenerUsuarioLogeado } = useContext(LoginContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      obtenerUsuarioLogeado(token)
    }
  }, [])
  const cerrarSesionActual = async () => {

    try {
      const { success, message } = await cerrarSesion(state.token)
      if (success) {
        console.log(message)
        toast.success(message)
        localStorage.removeItem('token')
        setTimeout(() => {

          navigate('/')

        }, 1000)

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
            <img width="150px" src='images/logoHotelArica.png' alt='Logo Arica' />
            
          </div>
          
          {state.isAuth ? (
            
            <div>
              <i className='bi bi-box-arrow-left text-white'></i>                    
              <button onClick={cerrarSesionActual} className='btn link text-white'>Logout</button>
            </div>
          ) : (
            <div>   
                       
              <Link className='link' to='/login'>Login</Link>
              <i class="bi bi-box-arrow-right text-white px-2"></i>
            </div>
          
          
          )}
          

        </div>

      </nav>

    </div>
  )
}
