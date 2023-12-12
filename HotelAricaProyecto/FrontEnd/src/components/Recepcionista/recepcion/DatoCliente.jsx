import React, { useEffect, useState, useContext } from 'react'
import { FormRegistroClientes } from './FormRegistroClientes'
import { TablaClientes } from '../TablaClientes'
import { ClienteContext } from '../../../context/ClientesContext'
import './styles.css'
export const DatoCliente = () => {
  const { stateCliente } = useContext(ClienteContext)
  const [opcion, setOpcion] = useState('nuevo')

  useEffect(() => {
    setOpcion('existente')

  }, [stateCliente])

  return (
    <section>
      <div className="d-flex gap-1">
        <button className='btn form-control border boton-opcion' onClick={() => setOpcion('nuevo')}>Nuevo Cliente</button>
        <button className='btn form-control border boton-opcion' onClick={() => setOpcion('existente')}>existente</button>
      </div>
      
      {opcion === 'existente' ? 
      (
        <TablaClientes /> 
      ) :
      (
        <FormRegistroClientes />
      )
      }
    </section>
  )
}
