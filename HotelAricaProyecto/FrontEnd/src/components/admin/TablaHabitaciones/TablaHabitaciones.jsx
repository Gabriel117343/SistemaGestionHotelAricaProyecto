

import React, {useState} from 'react'

import { MagicMotion } from 'react-magic-motion'

const MostrarTabla = ({ listaHabitaciones, borrarHabitacion, edicionHabitacion }) => {

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
            <th>Capacidad</th>
            <th colSpan={2} className='text-center'>Opciones</th>
          </tr>

        </thead>
        <tbody>
          <MagicMotion transition={{ type: "spring", stiffness: 500, damping: 15 }}>
            {habitacionesMostrar.map(habitacion => (
              <tr key={habitacion.id}>
                <th>{contador++}</th>
                <th><img width='50px' height='50px' className='habitacion-imagen' src={habitacion.imagen ? habitacion.imagen : 'https://elcomercio.pe/resizer/pfr9uvs5EojbKKmnLQfL27eiT4w=/1200x900/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/JLLIVKJJOBAFJCW7FPOYTICIBQ.jpg'} alt='imagen' /></th>
                <th>{habitacion.numero}</th>
                <th>{habitacion.tipo}</th>
                <th>$ {habitacion.precio}</th>
                <th>{habitacion.estado}</th>
                <th>{habitacion.ocupacion}</th>
                <th><button className='btn btn-sm btn-danger animacion-boton' onClick={() => borrarHabitacion(habitacion.id)}><i className='bi bi-person-x' /> Eliminar</button></th>
                <th><button className='btn btn-sm btn-info animacion-boton' onClick={() => edicionHabitacion(habitacion.id)}>Editar <i className='bi bi-pencil text-white' /></button></th>
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
          <th>-</th>
          <th>-</th>
          <th>-</th>
          <th>-</th>
          <th>-</th>
          <th>-</th>
          <th>-</th>
          <th>-</th>
        </tbody>
      </table>
      <h1 className='text-center pt-5'>No hay habitaciones Registradas</h1>
    </section>
  )
}
export const ValidarHabitaciones = ({ listaHabitaciones, borrarHabitacion, edicionHabitacion }) => {

  const habitacion = listaHabitaciones?.length > 0
  return (
    habitacion
    ? <MostrarTabla listaHabitaciones={listaHabitaciones} borrarHabitacion={borrarHabitacion} edicionHabitacion={edicionHabitacion}/>
    : <SinHabitaciones />
  )
}