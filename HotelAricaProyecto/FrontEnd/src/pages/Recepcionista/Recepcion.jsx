import React, { useState, useContext, useEffect } from 'react'
import './pages.css'
import { Habitaciones } from '../../components/Recepcionista/recepcion/Habitaciones'
import { FaConciergeBell } from "react-icons/fa"
import './styles.css'
import { NotificacionContext } from '../../context/NotificacionContext'
import { toast } from 'react-hot-toast'
export const Recepcion = () => {
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const { stateNotificacion: { notificaciones }, getNotificacionesContext, updateNotificacionContext } = useContext(NotificacionContext);
  
  const manejarClickNotificacion = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
  }
  useEffect(() => {
    const cargar = async () => {
      await getNotificacionesContext();
    }
    cargar();
  
    // Llama a cargar cada 30 segundos
    const intervalId = setInterval(cargar, 10000) // solo se empezara a ejecutar cuando se este dentro del componente y se detendra cuando se salga de el
  
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);
  console.log(notificaciones)
  const notificacionLeida = async (id) => {
    const notificacionLeida = 'True'
    console.log(id)
    const { success, message } = await updateNotificacionContext(id, notificacionLeida)
    if (success ){
      toast.success(message)
      getNotificacionesContext() // vuelve a cargar las notificaciones
    } else {
      toast.error(message)
    }
  }
  const notificacionesSinleer = notificaciones?.some(notificacion => notificacion.leida === false) // si hay alguna notificacion sin leer, some retorna true
  console.log(notificacionesSinleer)
  return (
    <>
      <section className='container-fluid ' >
        <div className="d-flex align-items-center justify-content-between gap-3  pt-3 titulo-page">
          <div style={{fontSize: '40px'}} className='d-flex align-items-center p-0 m-0'>
            <FaConciergeBell />
            <h1 className='m-0 ps-3'>Modulo de Recepcion</h1>
          </div>
          <div className="campana-notificacion">
            
            {notificacionesSinleer  ?
            (
              <img width='100%' height='100%' src="../../../public/images/icono-campana.png" alt="campana de notificacion" onClick={manejarClickNotificacion}/>
            )
            :
            (
              <img width='100%' height='100%' src="../../../public/images/camapana-inactiva.png" alt="campana de notificacion" onClick={manejarClickNotificacion}/>
            )
          }
          
          </div>

        </div>
        {mostrarNotificaciones && (
          <div className="lista-notificaciones">
            {notificaciones?.filter(notificacion => notificacion.leida === false).map((notificacion) => (
              <div key={notificacion.id} className='card estilo-card'>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{notificacion.motivo}</h5>
                  <button className='btn' onClick={() => notificacionLeida(notificacion.id)}><i className='bi bi-x'></i></button>
                </div>
                <p>{notificacion.mensaje}</p>
                <div className="d-flex justify-content-between">
                  <small>{notificacion.fecha.slice(0, 10)}</small>
                  <small>{notificacion.hora.slice(0,8)}</small>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="row mt-3">
          <div className="col-md-12">
            <Habitaciones/>
          </div>
          
        </div>
      </section>

    </>
    
  )
}