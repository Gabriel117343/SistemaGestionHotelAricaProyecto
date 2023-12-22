

import React, {useState} from 'react'

import { MagicMotion } from 'react-magic-motion'

const MostrarTabla = ({ listaHabitaciones, borrarHabitacion, edicionHabitacion, filtro }) => {

  if (filtro) {
    listaHabitaciones = listaHabitaciones.filter(habitacion => {
      return habitacion.estado.toLowerCase().includes(filtro.toLowerCase())
        || habitacion.numero.toString().includes(filtro) // toString() para que no de error al buscar por numero
        || habitacion.tipo.toLowerCase().includes(filtro.toLowerCase()) // toLowerCase() para que no de error al buscar por tipo
        || habitacion.cama.toLowerCase().includes(filtro.toLowerCase())
        || habitacion.ocupacion.toString().includes(filtro)
    })
  }
  const [currentPage, setCurrentPage] = useState(1)
  const cantidadHabitaciones = 10
  const startIndex = (currentPage - 1) * cantidadHabitaciones
  const endIndex = startIndex + cantidadHabitaciones
  // Obtener los elementos a mostrar en la página actual, slice filtrara el inicio a fin
  const habitacionesMostrar = listaHabitaciones.slice(startIndex, endIndex)
  // Servira para calcular el número total de páginas en función de la cantidad total de elementos y los elementos por página ej: el boton 1, 2, 3 etc..
  const totalBotones = Math.ceil(listaHabitaciones.reverse().length / cantidadHabitaciones)// reverse para que la tabla muestre desde el ultimo usuario creado al primero
  let contador = startIndex + 1 // para numerar los usuarios en la tabla comenzando por el starIndex aumentado en uno

  return (
    <section>
      <table className='table table-striped mb-0' id='tabla-habitaciones'>
        <thead className='border-bottom'>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Numero</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Cama</th>
            <th>Capacidad</th>
            <th colSpan={2} className='text-center'>Opciones</th>
          </tr>

        </thead>
        <tbody>
          <MagicMotion>
            {habitacionesMostrar.map(habitacion => (
              <tr key={habitacion.id}>
                <td>{contador++}</td>
                <td><img width='50px' height='50px' className='habitacion-imagen' src={habitacion.imagen ? habitacion.imagen : 'https://elcomercio.pe/resizer/pfr9uvs5EojbKKmnLQfL27eiT4w=/1200x900/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/JLLIVKJJOBAFJCW7FPOYTICIBQ.jpg'} alt='imagen' /></td>
                <td>{habitacion.numero}</td>
                <td>{habitacion.tipo}</td>
                <td>$ {habitacion.precio}</td>
                <td>{habitacion.estado}</td>
                <td>{habitacion.cama}</td>
                <td>{habitacion.ocupacion}</td>
                <td><button className='btn btn-sm btn-danger animacion-boton' onClick={() => borrarHabitacion(habitacion.id)}><i className='bi bi-person-x' /> Eliminar</button></td>
                <td><button className='btn btn-sm btn-info animacion-boton' onClick={() => edicionHabitacion(habitacion.id)}>Editar <i className='bi bi-pencil text-white' /></button></td>
              </tr>
            ))}

          </MagicMotion>
        </tbody>

      </table>
      <div className='pagination-buttons mb-3 mt-1 animacion-numeros'>
        {/* bucle Array.from() para generar botones según la cantidad de páginas necesarias, solo se usara el indice del array */}
        {Array.from({ length: totalBotones }, (_, index) => (
          <button key={index + 1} className={`btn ${currentPage === index + 1 ? 'btn-info' : 'btn-secondary'}`} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}

      </div>
    </section>
  )
}


const SinHabitaciones = () => {

  return (
    <section>
      <table className='table table-striped'>
        <thead className='border-bottom'>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Numero</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Capacidad</th>
            <th colSpan={2}>Opciones</th>
          </tr>

        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>

          </tr>
          
        </tbody>
      </table>
      <h1 className='text-center pt-5'>No hay habitaciones Registradas</h1>
    </section>
  )
}
export const ValidarHabitaciones = ({ listaHabitaciones, borrarHabitacion, edicionHabitacion, filtro}) => {

  const habitacion = listaHabitaciones?.length > 0
  return (
    habitacion
    ? <MostrarTabla listaHabitaciones={listaHabitaciones} borrarHabitacion={borrarHabitacion} edicionHabitacion={edicionHabitacion} filtro={filtro}/>
    : <SinHabitaciones />
  )
}