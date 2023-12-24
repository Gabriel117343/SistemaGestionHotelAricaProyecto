import React, { useState } from 'react'
import { FormRegistroClientes } from './FormRegistroClientes'
import { ListaClientes } from './ListaClientes'
import './recepcion.css'
export const DatoCliente = () => {

  const [opcion, setOpcion] = useState('existente')
  
  return (
    <>

      <div className="d-flex gap-1">
        <option typeof='button' value="nuevo" className='form-control boton-opcion' onClick={() => setOpcion('nuevo')}>Nuevo Cliente</option>
        <option value="existente" className='form-control boton-opcion' onClick={() => setOpcion('existente')}>Cliente Existente</option>

      </div>

      {opcion === 'existente' ? 
      (
        <ListaClientes/> 
      ) :
      (
        <FormRegistroClientes cambiarOpcion={setOpcion}/>
      )
      }
    </>
  )
}
