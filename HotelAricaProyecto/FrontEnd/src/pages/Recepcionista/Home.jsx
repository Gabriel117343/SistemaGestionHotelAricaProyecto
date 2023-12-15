import React, {} from 'react'
import { FaHome } from "react-icons/fa";
import { InfoHabitaciones } from '../../components/admin/home/InfoHabitaciones'


export const Home = () => {

  

  
 
  return (
    <>
  
      <section className='container'>
        <div className="d-flex align-items-center justify-content-left gap-3  pt-4">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
            <FaHome />
          </div>
          
          <h1 className='m-0'>Principal</h1>

        </div>
        <InfoHabitaciones />
        

      </section>
      
      

    </>
    
  )
}
