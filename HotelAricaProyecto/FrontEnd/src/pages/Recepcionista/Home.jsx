import React, {} from 'react'
import { FaHome } from "react-icons/fa";
import { InfoHabitaciones } from '../../components/admin/home/InfoHabitaciones'
import { Grafico } from '../../components/admin/home/Grafico'
import './pages.css'
export const Home = () => {
  return (
    <>
  
      <section className='container-fluid'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
            <FaHome />
          </div>
          
          <h1 className='m-0'>Principal</h1>

        </div>
        <InfoHabitaciones />
        <br />
        <br />
        <br />
        <br />
        <Grafico />
      </section>
    </>
    
  )
}
