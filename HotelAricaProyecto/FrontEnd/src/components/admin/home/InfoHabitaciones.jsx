
import React, { useContext, useEffect }from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import './styles.css'
export const InfoHabitaciones = () => {

  const { stateHabitacion, getHabitaciones } = useContext(HabitacionContext)
  useEffect(() => {
    getHabitaciones()
  }, [])
  const validacion = stateHabitacion?.habitaciones.length > 0
  console.log(validacion)
  return (validacion ?
  <ConHabitaciones habitaciones={stateHabitacion.habitaciones} />
  :
  <SinHabitaciones />)
 }

export const ConHabitaciones = ({ habitaciones }) => {

  
  const habitacionesDisponibles = habitaciones.filter((habitacion) => habitacion.estado === 'disponible')
  const habitacionesOcupadas = habitaciones.filter((habitacion) => habitacion.estado === 'ocupada').length
  const habitacionesMantenimiento = habitaciones.filter((habitacion) => habitacion.estado === 'mantenimiento')
  const cantidadHabitaciones = habitaciones.length

  return (
    <section className='d-flex pt-'>
      <div className="col-md-3">
        <div className="card text-white bg-primary mb-3 tamaño-card" style={{maxWidth: '18rem'}}>
          <div className="card-header">Habitaciones disponibles</div>
          <div className="card-body">
            <h4 className="card-title">{habitacionesDisponibles.length}</h4>
            <p className='pt-3'>Total</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-success mb-3" style={{maxWidth: '18rem'}}>
          <div className="card-header">Habitaciones ocupadas</div>
          <div className="card-body">
            <h4 className="card-title">{habitacionesOcupadas}</h4>
            <p className='pt-3'>Total</p>
          </div>
        </div>
        
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-danger mb-3" style={{maxWidth: '18rem'}}>
          <div className="card-header">Habitaciones en mantenimiento</div>
          <div className="card-body">
            <h4 className="card-title">{habitacionesMantenimiento.length}</h4>
            <p className='pt-3'>Total</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-warning mb-3" style={{maxWidth: '18rem'}}>
          <div className="card-header">Total de habitaciones</div>
          <div className="card-body">
            <h4 className="card-title">{cantidadHabitaciones}</h4>
            <p className='pt-3'>Total</p>
          </div>
        </div>
      </div>
  
     

    </section>
  )
}
export const SinHabitaciones = () => {
  return (
    <section className='d-flex'>
      <div className="col-md-3">
        <div className="card text-white bg-primary mb-3" style={{maxWidth: '18rem'}}>
          <div className="card-header">Habitaciones disponibles</div>
          <div className="card-body">
            <h5 className="card-title">0</h5>
            <p className="card-text">Total</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-success mb-3" style={{maxWidth: '18rem'}}>
          <div className="card-header">Habitaciones ocupadas</div>
          <div className="card-body">
            <h5 className="card-title">0</h5>
            <p className="card-text">Total</p>
          </div>
        </div>
        
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-danger mb-3" style={{maxWidth: '18rem'}}>
          <div className="card-header">Habitaciones en mantenimiento</div>
          <div className="card-body">
            <h5 className="card-title">0</h5>
            <p className="card-text">Total</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-white bg-warning mb-3" style={{maxWidth: '18rem'}}>
          <div className="card-header">Total de habitaciones</div>
          <div className="card-body">
            <h5 className="card-title">0</h5>
            <p className="card-text">Total</p>
          </div>
        </div>
      </div>

    </ section>
  )
}
