import { debounce } from 'lodash'
import React, { useState, useContext } from 'react'
import { InfoHabitacion } from './InfoHabitacion'
import { HabitacionContext } from '../../../context/HabitacionContext'
import { toast } from 'react-hot-toast'
export const FormularioRegistroHabitacion = () => {
  const [infoHabitacion, setInfoHabitacion] = useState({
    imagen: '',
    tipo: 'Deluxe',
    cama: 'Cama Mediana King',
    precio: 40000,
    ocupacion: '2 personas'
  })
  const { crearHabitacion } = useContext(HabitacionContext) 


  const setInfoHabitacionDebounce = debounce(setInfoHabitacion, 1000)
  const handleInputChange = (value, field) => {
  
    setInfoHabitacionDebounce({...infoHabitacion, [field]: value});
  }
  const handleFileChange = (e) => { // esto es para la imagen
    if (e.target.files[0]) {
      setInfoHabitacion({...infoHabitacion, imagen: URL.createObjectURL(e.target.files[0])}); // esto crea una url de la imagen
    }
  }
  const EnviarFormularioRegistro = async(event) => {
    event.preventDefault()
    const formHabitaciones  = new FormData(event.target)
    const toastId = toast.loading('Cargando...', { id: 'loading' })
  
    try {
      const { success, message } = await crearHabitacion(formHabitaciones)
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      if (success) {
        console.log(message)
        toast.success(message)
        // toast.success(message)
      } else {
        console.log(message)
        // toast.error(message)
      }
    } catch (error) {
      toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
      toast.error('Hubo un error al crear la habitacion.')
      console.log(error)
      // toast.error(error)
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 col-ms-12">
        <form onSubmit={EnviarFormularioRegistro} className='m-2 border px-3 rounded'>
          <div className="form-group">
            <label htmlForm='numero'>Numero</label>
            <input type="number" className='form-control' placeholder='Ej: 233' maxLength={3} required name='numero'/>
          </div>
          
          <div className="form-group">
            <label  htmlForm='precio'>Precio</label>
            <input onChange={e => handleInputChange(e.target.value, 'precio')} type="number" className='form-control' name='precio' placeholder='Ej:20000' maxLength={5} required/>
          </div>
          
        
          <div className="form-group">
            <label  htmlForm='estado'>Estado</label>
            <select className='form-control' type='text' onChange={e => handleInputChange(e.target.value, 'cama')} name="estado" id="estado" required>
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
                <option value="mantenimiento">Mantenimiento</option>
            </select>
         
          </div>
          <div className="form-group">
            <label htmlForm='camas'>Cama</label>
            <input onChange={e => handleInputChange(e.target.value, 'cama')} type="text" className='form-control' placeholder='Cama Mediana King...' required name='cama'/>
          </div>
          <div className="form-group">
            <label htmlForm='ocupacion'>Ocupacion</label>
            <select type='number' className='form-control' onChange={e => handleInputChange(e.target.value, 'ocupacion')} name='ocupacion'>
              <option value="1">1 Persona</option>
              <option value="2">2 Personas</option>
              <option value="3">3 Personas</option>

            </select>
            
          </div>
          <div className="form-group">
           
            <label  htmlForm='tipo'>Tipo</label>
            <select onChange={e => handleInputChange(e.target.value, 'tipo')} className='form-control' name="tipo" id="tipo">
                <option value="individual">Individual</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
            </select>
            
           
          </div>
          <div className="form-group">
            <label htmlForm='imagen'>Imagen</label>
            <input onChange={handleFileChange} type="file" className='form-control' name='imagen'/>
          </div>
          <div className="form-group">
            <label htmlForm='descripcion' >Descripcion</label>
          
            <textarea placeholder='Habitacion con servicios incluidos..' style={{height: '7rem'}}  className='form-control' name="descripcion" id="descripcion" cols="30" rows="10" required></textarea>
          </div>
          <div className='pt-3'>
            <button type='submit' className='btn btn-success'>Registrar</button>
          </div>
        </form>

      </div>
      <div className="col-md-6 col-ms-12">
        <InfoHabitacion infoHabitacion={infoHabitacion} />
      </div>
    </div>
    
  )
}
