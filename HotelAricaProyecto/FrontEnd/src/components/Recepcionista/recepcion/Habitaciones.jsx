import React, { useContext, useEffect, useState} from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import './recepcion.css'
import { MagicMotion } from 'react-magic-motion'
import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { set } from 'lodash'
import toast from 'react-hot-toast'
import { DatoCliente } from './DatoCliente'
import { FormCheckin } from './FormCheckin'
import { MdBed } from "react-icons/md";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";
export const Habitaciones = () => {
  const { stateHabitacion, getHabitaciones, getHabitacion, limpiarHabitacionSeleccionada } = useContext(HabitacionContext)


  useEffect(() => {
    const cargar = async () => {
      await getHabitaciones()
    }
    cargar()
    // intervalo
    const interval = setInterval(() => {
      cargar()
    }, 15000)
    return () => clearInterval(interval) // Limpiar el intervalo cuando el componente se desmonte
  }, [])
  console.log(stateHabitacion.habitaciones)

  

  const alerta = () => {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Esta habitacion no esta disponible',
      confirmButtonText: 'Ok',
    })

  }
  const seleccionarHabitacion = async(id) => {
    console.log('Id de habitacion seleccionada: ', id)
    const { success, message } = await getHabitacion(id)
  
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const quitarSeleccion = () => {
    limpiarHabitacionSeleccionada()
  }
  return (
    
      <>
        {stateHabitacion.habitacionSeleccionada ? 
        (
          <section>
            <div className="row">
              <div className="col-md-12">
                <div className="border rounded d-flex align-items-center justify-content-around">
                <div className="d-flex pt-1 pb-1">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-info me-2" style={{width: '40px', height: '40px'}}>
                      <i class="bi bi-0-circle text-white"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-0">Numero Habitacion</h6>
                      <p className="mb-0">{stateHabitacion.habitacionSeleccionada.numero}</p>
                    </div>

                  </div>
                  <div className="d-flex pt-1 pb-1">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary me-2" style={{width: '40px', height: '40px'}}>
                      <i class="bi bi-columns-gap text-white"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-0">Tipo Habitacion</h6>
                      <p className="mb-0">{stateHabitacion.habitacionSeleccionada.tipo}</p>
                    </div>

                  </div>
                  
                  <div className="d-flex pt-1 pb-1">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-warning me-2" style={{width: '40px', height: '40px'}}>
                      <i class="bi bi-currency-dollar text-white"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-0">Precio Noche</h6>
                      <p className="mb-0">{stateHabitacion.habitacionSeleccionada.precio}</p>
                    </div>

                  </div>
                  <div className="d-flex pt-1 pb-1">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-dark me-2" style={{width: '40px', height: '40px'}}>
                      <MdBed className='text-white'/>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-0">Tipo Cama</h6>
                      <p className="mb-0">{stateHabitacion.habitacionSeleccionada.cama}</p>
                    </div>

                  </div>
                  <div className="d-flex pt-1 pb-1">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-danger me-2" style={{width: '40px', height: '40px'}}>
                      <FaCartFlatbedSuitcase className='text-white'/>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-0">Ocupacion</h6>
                      <p className="mb-0">{stateHabitacion.habitacionSeleccionada.ocupacion} Personas</p>
                    </div>

                  </div>
                  <div>
                    <button className='border rounded' onClick={quitarSeleccion}>
                      <IoArrowBackCircle className='text-success' style={{fontSize: '50px'}}/>
                    </button>
                    
                  </div>
                </div>
              </div>

                
            </div>
             <div className='row mt-3'> {/* si hay una habitacion seleccionada se muestra el formulario de reserva */}
              <div className="col-md-6">
                <DatoCliente/>

              </div>
              <div className="col-md-6">
                <FormCheckin/>   
              </div>

            </div>

          </section>
         
        )
        : 
        (
        <div className="row d-flex"> {/* si no hay una habitacion seleccionada se muestran las habitaciones */}
       
          {stateHabitacion.habitaciones.map((habitacion) => (
            <div className={`card ${habitacion.estado} col-md-3 col-ms-6 rounded`} key={habitacion.id}>
              <div className='hora'>
                <p>24h</p>
              </div>
              
              <div className="card-body">
                <h2 className="card-title">{habitacion.numero}</h2>
          
                <p style={{ textTransform: 'capitalize' }}>{habitacion.tipo}</p>
              </div>
              {habitacion.estado === 'disponible' && <button className='btn form-control fondo-opcion-disponible' onClick={() => seleccionarHabitacion(habitacion.id)}>Disponible <i class="bi bi-arrow-right-circle-fill"></i></button>}
              {habitacion.estado === 'ocupada' && <button className='btn form-control fondo-opcion-ocupada' onClick={alerta}>Ocupada <i className="bi bi-exclamation-triangle-fill"></i></button>}
              
              {habitacion.estado === 'mantenimiento' && <button className='btn form-control fondo-opcion-mantenimiento' onClick={alerta}>Mantenimiento <i class="bi bi-info-circle-fill"></i></button>}
            </div>
          ))}
        </div>
        )
       }

    </>
  )
}
