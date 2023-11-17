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
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <header className='index-header'>
      
      <nav className='navbar fixed-top nav'>
        
        <div className='container align-items-center justify-content-between '>
          <div>
            <img src='' alt='Logo Arica' />
            <Link className='link' to='/index'>Inicio</Link>
            <a href="" className='link ms-4'>Opcion2</a>
          </div>
          <div>             
            <Link className='link' to='/login'>Login</Link>
            <Link className='link ms-4' to='/admin'>Admin</Link>
          </div>

        </div>

      </nav>

    </header>
  )
}
