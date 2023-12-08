
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
export const NavbarAdmin = () => {
  return (
    <div className='index-header'>
      
      <nav className='navbar fixed-top nav'>
        
        <div className='container align-items-center justify-content-between '>
          <div>
            <img width="150px" src='images/logoHotelArica.png' alt='Logo Arica' />
            <Link className='link' to='/index'>Inicio</Link>
            <a href="" className='link ms-4'>Opcion2</a>
          </div>
          <div>             
            <Link className='link' to='/login'>Login</Link>
            <Link className='link ms-4' to='/admin'>Admin</Link>
          </div>

        </div>

      </nav>

    </div>
  )
}
