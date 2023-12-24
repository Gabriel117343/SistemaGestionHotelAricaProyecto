import React, { useState, useContext } from 'react'
import { MdDoorBack } from "react-icons/md";

import { FaBars, FaHome, FaUserPlus, FaUsers } from "react-icons/fa"
import { AiFillBank } from "react-icons/ai"
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext'
import { HabitacionProvider } from '../../context/HabitacionContext'
import { ReservaProvider } from '../../context/ReservaContext'
import './styles.css'
export const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  
  const toggle = () => setIsOpen(!isOpen)
  const { state } = useContext(LoginContext)
  const menuItems = [
    {
      path:'/recepcionista/home',
      name:'Home',
      icon: <FaHome />, // icono de la pagina web https://boxicons.com/
    },
    {
      path:'/recepcionista/recepcion',
      name:'Recepcion',
      icon: <AiFillBank />, // icono de la pagina web https://boxicons.com/
    },
    {
      path:'/recepcionista/reservas',
      name:'Reservas',
      icon: <i class="bi bi-table"></i>, // icono de la pagina web https://boxicons.com/
    },
    {
      path:'/recepcionista/verificacion_salida/',
      name: 'Verificacion de salida',
      icon: <MdDoorBack />
    },
    {
      path:'/recepcionista/configuracion/',
      name: 'Configuracion',
      icon: <i className="bi bi-gear"></i>
    },
    
 
  ]
  return (
    
    <div className='contenedor'>
      <div style={{width: isOpen ? "350px": "50px"}} className="sidebar">

        <div className="top_section pt-4">
          
          { isOpen ? (
            <div className='d-flex align-items-center gap-3 pb-3 ps-2'>
              { state && state.usuario ? (
                <>
                  <img width='50px' height='50px' style={{display: isOpen ? "block": "none", borderRadius: '30px'}} className="logo " src={state.usuario.imagen ? state.usuario.imagen : 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png'} />
                  <strong className='nombre-usuario'>{state.usuario.nombre} {state.usuario.apellido}</strong> 
                </>
              ):
              (
                <>
                  <img width='50px' height='50px' style={{display: isOpen ? "block": "none", borderRadius: '30px'}} className="logo " src='https://cdn-icons-png.flaticon.com/512/6073/6073873.png' />
                  <strong>Sin Nombre</strong>
                </>
              )
            } 
            <div className="bars ms-5 p-2 py-2">
              <FaBars onClick={toggle}/>

            </div>
          </div>
            
          )
          : (
            <div className="d-flex align-items-center justify-content-center py-2">
              <FaBars onClick={toggle}/>

            </div>
          )}
          {
            menuItems.map((item, index) => (
              <NavLink to={item.path} key={index} className="link">
                <div className="icon">{item.icon}</div>
                
                <div style={{display: isOpen ? "block": "none"}} className="link_text">{item.name}</div>
              </NavLink>
            ))
          }
        </div>
      </div>
        <ReservaProvider>
          <HabitacionProvider> {/* Este componente es para que se pueda usar el context en todos los componentes que esten dentro de este componente */}
            <main>{ children }</main> 
          </HabitacionProvider>
        </ReservaProvider>
        
      
    </div>
  )
}