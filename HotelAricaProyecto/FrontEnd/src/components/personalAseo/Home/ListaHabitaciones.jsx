import { useContext, useEffect, useState } from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import swal from 'sweetalert2'

import './styles.css'


export const ListaHabitaciones = () => {

  const { stateHabitacion, getHabitaciones, getHabitacion, editarHabitacion  } = useContext(HabitacionContext)

  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null)

  useEffect(() => {
    async function cargar() {
      await getHabitaciones()
    }
    cargar()
  }, [])
  // form para cambiar el estado de la habitacion a disponible através de la api
  const cambiarEstado = (id) => {
    const form = new FormData()
    form.append('estado', 'disponible')
    swal.fire({
      title: '¿Estás seguro?',
      text: "¡Se cambiará el estado de la habitación a disponible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { success, message } = await editarHabitacion(id, form)
        if (success) {
          swal.fire(
            '¡Listo!',
            message,
            'success'
          )
          await getHabitaciones()
        } else {
          swal.fire(
            '¡Error!',
            message,
            'error'
          )
        }
      }
    })
  }
  const HabitacionesParaLimpieza = stateHabitacion.habitaciones.filter((habitacion) => habitacion.estado === 'mantenimiento')
 
  return (
    <section>
      <div className="row d-flex">
        {HabitacionesParaLimpieza.map((habitacion) => (
          <div className={`card ocupada col-md-3 col-ms-6 rounded card-limpieza-fondo`} key={habitacion.id}>
            <div className='hora'>
              <p>24h</p>
            </div>
            <div className="card-body">
              <h2 className="card-title">{habitacion.numero}</h2>
              <p style={{ textTransform: 'capitalize' }}>{habitacion.tipo}</p>
            </div>
            <button className='btn form-control checkout-boton-fondo' onClick={() => cambiarEstado(habitacion.id)}>Marca como Limpia <i class="bi bi-info-circle-fill text-white"></i></button>
          </div>
        ))}
      </div>
    </section>
  )
}
