import { set } from 'lodash'
import { useState, useRef } from 'react'
import { MagicMotion } from 'react-magic-motion'

export const MostrarTabla = ({ listaPersonas, borrarPersona, edicionUsuario }) => {
  // Definir el estado para manejar la página actual, por defecto se mostrara la pagina 1 de la tabla
  const [currentPage, setCurrentPage] = useState(1)

  // Se define la cantidad de usuarios a mostrar por pagina
  const cantidadUsuarios = 10
  // Calculando el índice de inicio y fin de la lista actual en función de la página actual y los elementos por página
  const startIndex = (currentPage - 1) * cantidadUsuarios
  const endIndex = startIndex + cantidadUsuarios
  // Obtener los elementos a mostrar en la página actual, slice filtrara el inicio a fin

  const usuariosMostrar = listaPersonas.slice(startIndex, endIndex)
  
  // Servira para calcular el número total de páginas en función de la cantidad total de elementos y los elementos por página ej: el boton 1, 2, 3 etc..
  const totalBotones = Math.ceil(listaPersonas.reverse().length / cantidadUsuarios)// reverse para que la tabla muestre desde el ultimo usuario creado al primero

  let contador = startIndex + 1 // para numerar los usuarios en la tabla comenzando por el starIndex aumentado en uno

  return (
    <section>
      <table className='table table-striped mb-0' id='tabla-usuarios'>
        <thead className='border-bottom'>
          <tr>
            {/* <th>Imagen</th> */}
            <th>#</th>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Rol</th>
            <th className='text-center'>Jornada</th>
            <th className='text-center'>Estado</th>
            <th colSpan={2} className='text-center'>Opciones</th>

          </tr>
        </thead>
        <tbody>
         
          
          <MagicMotion transition={{ type: "spring", stiffness: 500, damping: 15 }}  >
            {usuariosMostrar.map(person => (

              <tr key={person.id}>
               
                {/* <th className=' pt-0 pb-0'><img className='usuario-imagen p-0 m-0' src={person.imagen ? person.imagen : 'https://w7.pngwing.com/pngs/807/180/png-transparent-user-account-resume-curriculum-vitae-europe-others-service-resume-logo-thumbnail.png'} alt='imagen' /></th> */}
                <th>{contador++}</th>
                <th>{person.rut}</th>
                <th>{person.nombre}</th>
                <th>{person.apellido}</th>
                <th>{person.telefono}</th>
                <th>{person.email}</th>{/** Aqui se asignara un icono dependiendo del estado de la persona, por horario y si esta activo */}
                <th className='text-capitalize'>{person.rol}</th>
                <th className='text-center animacion-i'>{person.jornada === 'duirno' ? (<i className='bi bi-sun text-warning' />) : (<i className='bi bi-moon text-info' />)}</th>
                <th className='text-center animacion-i'>{person.is_active === true ? (<i className='bi bi-building-fill-up text-success' />) : (<i className='bi bi-building-fill-slash text-danger' />)}</th>
                <th><button className='btn btn-sm btn-danger animacion-boton' onClick={() => borrarPersona(person.id)}><i className='bi bi-person-x' /> Eliminar</button></th>

                <th><button className='btn btn-sm btn-info animacion-boton' onClick={() => edicionUsuario(person.id)}>Editar <i className='bi bi-pencil text-white' /></button></th>
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
export const SinUsuarios = () => {
  return (
    <section className='pb-5'>
      <table className='table table-striped'>
        {/* Esto solo se motrara si listaPersonas esta vacia es decir si no  hay usuarios registrados, util para evitar errores cuando la base de datos no responde */}
        <thead className='border-bottom '>
          <tr>
            <th>#</th>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Jornada</th>
            <th>Estado</th>
            <th>Opciones</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
          </tr>
        </tbody>
      </table>
      <h1 className='text-center pt-5'>No hay habitaciones Registradas</h1>
    </section>
  )
}
export const ValidarUsuarios = ({ listaPersonas, borrarPersona, edicionUsuario }) => {
  const persona = listaPersonas?.length > 0
  // si persona es igual a true o false
  return (
    persona
      ? <MostrarTabla listaPersonas={listaPersonas} borrarPersona={borrarPersona} edicionUsuario={edicionUsuario} />
      : <SinUsuarios />
  )
}
