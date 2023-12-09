import React, { useState, useContext } from 'react'

import { FaBars, FaHome } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext'
import './styles.css'
export const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  
  const toggle = () => setIsOpen(!isOpen)
  const { state } = useContext(LoginContext)
  const menuItems = [
    {
      path:'/admin/home',
      name:'Home',
      icon: <FaHome />, // icono de la pagina web https://boxicons.com/
    },
    {
      path:'/admin/registro-habitacion',
      name:'Registro Habitacion',
      icon: <MdBedroomChild/>, // icono de la pagina web https://boxicons.com/
    }
  ]
  return (
    <div className='contenedor'>
      <div style={{width: isOpen ? "350px": "50px"}} className="sidebar">

        <div className="top_section pt-4">
          
          { isOpen ? (
            <div className='d-flex align-items-center gap-3 pb-3 ps-2'>
              { state && state.usuario ? (
                <>
                  <img width='50px' style={{display: isOpen ? "block": "none", borderRadius: '30px'}} className="logo " src={state.usuario.imagen ? state.usuario.imagen : 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png'} />
                  <strong>{state.usuario.nombre}</strong>
                </>
              ):
              (
                <>
                  <img width='50px' style={{display: isOpen ? "block": "none", borderRadius: '30px'}} className="logo " src='https://cdn-icons-png.flaticon.com/512/6073/6073873.png' />
                  <strong>Sin Nombre</strong>
                </>
              )
            } 
            <div className="bars ms-5 ps-3 py-2">
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
      <main>{ children }</main>
    </div>
  )
}
