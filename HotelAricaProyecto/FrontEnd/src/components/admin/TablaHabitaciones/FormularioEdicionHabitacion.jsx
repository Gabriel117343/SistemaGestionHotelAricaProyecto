import React, { useContext, useState } from 'react'
import { HabitacionContext } from '../../../context/HabitacionContext'
import { toast } from 'react-hot-toast'
export const FormularioEdicionHabitacion = ({ cerrarModal }) => {
  const { stateHabitacion, editarHabitacion } = useContext(HabitacionContext)
  const [imagen, setImagen] = useState(false)
  

  const enviarFormularioRegistro = async(event) => {
    event.preventDefault()
    const habitacion = Object.fromEntries(new FormData(event.target))
    // transformar oobjeto habitacion a form data
    const form = new FormData()
    // se comprueba si cada campo existe para agregarlo al form data, porque si no existe, no se debe agregar
    // si se envia un dato null o undefined, el backend lo recibe como un string vacio y da error 400 bad request
    // if (habitacion.numero) form.append('numero', habitacion.numero)
    // if (habitacion.precio) form.append('precio', habitacion.precio)
    // if (habitacion.estado) form.append('estado', habitacion.estado)
    // if (habitacion.cama) form.append('cama', habitacion.cama)
    // if (habitacion.ocupacion) form.append('ocupacion', habitacion.ocupacion)
    // if (habitacion.tipo) form.append('tipo', habitacion.tipo)
    // if (habitacion.imagen) form.append('imagen', habitacion.imagen)
    // if (habitacion.descripcion) form.append('descripcion', habitacion.descripcion)
     form.append('numero', habitacion.numero)
     form.append('precio', habitacion.precio)
     form.append('estado', habitacion.estado)
     form.append('cama', habitacion.cama)
     form.append('ocupacion', habitacion.ocupacion)
     form.append('tipo', habitacion.tipo)

     // --------------------------------------------------------
      if (imagen) { // si se selecciono una imagen, se agrega al form data
        // esto para evitar que se envie una imagen vacia y se elimine la imagen actual
        form.append('imagen', habitacion.imagen)
      
      }
     
     // --------------------------------------------------------
     form.append('descripcion', habitacion.descripcion)

    const { success, message } = await editarHabitacion(stateHabitacion.habitacionSeleccionada.id, form)
    if (success) {
      toast.success(message)
    
      cerrarModal()
    } else {
      cerrarModal()
      toast.error('Hubo un error al editar la habitacion.')
    }
  
  }
  return (
    <form onSubmit={enviarFormularioRegistro}>
          <div className="form-group">
            <label htmlFor='numero'>Numero</label>
            <input defaultValue={stateHabitacion.habitacionSeleccionada.numero} type="number" className='form-control' placeholder='Ej: 233' maxLength={3} name='numero'/>
          </div>
          
          <div className="form-group">
            <label  htmlFor='precio'>Precio Noche</label>
            <input type="number" className='form-control' name='precio' placeholder='Ej:20000' maxLength={5} defaultValue={stateHabitacion.habitacionSeleccionada.precio}/>
          </div>
          
        
          <div className="form-group">
            <label  htmlFor='estado'>Estado</label>
            <select className='form-control' type='text' name="estado" id="estado" defaultValue={stateHabitacion.habitacionSeleccionada.estado}>
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
                <option value="mantenimiento">Mantenimiento</option>
            </select>
         
          </div>
          <div className="form-group">
            <label htmlFor='camas'>Cama</label>
            <input type="text" className='form-control' placeholder='Cama Mediana King...' name='cama' defaultValue={stateHabitacion.habitacionSeleccionada.cama}/>
          </div>
          <div className="form-group">
            <label htmlFor='ocupacion'>Ocupacion</label>
            <select type='number' className='form-control' name='ocupacion' defaultValue={stateHabitacion.habitacionSeleccionada.ocupacion}>
              <option value="1">1 Persona</option>
              <option value="2">2 Personas</option>
              <option value="3">3 Personas</option>

            </select>
            
          </div>
          <div className="form-group">
           
            <label  htmlFor='tipo'>Tipo</label>
            <select className='form-control' name="tipo" id="tipo" defaultValue={stateHabitacion.habitacionSeleccionada.tipo}>
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
            </select>
            
           
          </div>
          <div className="form-group">
            <label htmlFor='imagen'>Imagen</label>
            <input type="file" className='form-control' name='imagen' onChange={() => setImagen(true)}/>
          </div>
          <div className="form-group">
            <label htmlFor='descripcion' >Descripcion</label>
          
            <textarea placeholder='Habitacion con servicios incluidos..' style={{height: '7rem'}}  className='form-control' name="descripcion" id="descripcion" cols="30" rows="10" defaultValue={stateHabitacion.habitacionSeleccionada.descripcion}></textarea>
          </div>
          <div className='pt-3 d-flex justify-content-between'>
            <button type='submit' className='btn btn-success'>Editar</button>
            <button type='button' onClick={cerrarModal} className='btn btn-danger'>Cancelar</button>
          </div>
        </form>
    
  )
}
