import React, { useContext} from 'react'
import { LoginContext } from '../context/LoginContext'
export const HerramientaDesarrollo = () => {

  const { state } = useContext(LoginContext)
  console.log(state.isAuth)
  return (
    <main className='container'>
      <section className='d-flex justify-content-center'>
        {state && state.usuario ? (
            <section style={{width:'50%', margin: '0 auto', border: 'dotted'}} className="d-flex gap-2 text-white justify-content-center aligns-items-center rounded bg-success fixed-bottom">
              <strong className='text-'>Nombre:</strong>
              <p>{state.usuario.nombre}</p>
            
              <strong>Rol:</strong>
              <p>{state.usuario.rol}</p>
              <strong>Jornada:</strong>
              <p>{state.usuario.jornada}</p>
              <strong>Logeado:</strong>
              <p>{state.isAuth.toString()}</p>
            </ section>
          )
          :
          (
            <section style={{width:'50%', margin: '0 auto', border: 'dotted white'}} className="container bg-warning fixed-bottom rounded">

              <div className="text-center">
                <strong className='text-danger'>No hay usuario logeado</strong>
              </div>
              

            </section>
            
          )
        }

      </section>

      
        
        
  
    </main>
  )
}
