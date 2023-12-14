
import './configuracion.css'
export const InformacionUsuario = ({usuario, usuarioImagen}) => {
  
  const { imagen } = usuarioImagen
 
  return (
    <article className='row ps-5'>
      <div>

        {imagen ?
        (
          <img className='imagen-perfil' src={imagen} alt="Imagen del usuario" />

        )
        :
        (
          <img className='imagen-perfil' src='https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png' alt='Imagen del usuario'/>
        )
        }
     
        <div className="pt-3">
          <h2>{usuario?.nombre}</h2>
          <div className="d-flex gap-2 pt-3">
            <strong>Rol:</strong>
            {usuario?.rol  ? 
            (
              <p>{usuario.rol}</p>
            )
            :
            (
              <p className='badge bg-danger'>Inactivo</p>
            )}
          </div>
          <div className="d-flex gap-2 align-items-center">
            <strong>Estado:</strong>
            <p className='badge bg-success m-0'>Activo</p>

          </div>
          <div className="d-flex align-items-center gap-2 mt-2 mb-2">
            <strong>Correo:</strong>
            <p className=''>{usuario?.email}</p>
          </div>
          <div className="d-flex gap-2">
            <strong>Jornada:</strong>
            {usuario?.jornada === 'duirno' ?
            
            (
              <p>Diurna <i className='bi bi-sun-fill text-warning'></i></p>
            )
            :
            (
              <p>Nocturna <i className='bi bi-moon-fill text-warning'></i></p>
            )}

          </div>
        </div>
          
      </div>
      
      
      
    </article>
  )
}
