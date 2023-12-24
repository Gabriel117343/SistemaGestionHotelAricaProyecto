import React, { createContext, useReducer, useContext } from 'react'
import { createReserva, getAllReservas, getReserva } from '../api/reserva.api/'
import { ReservaReducer } from './ReservaReducer'
import { LoginContext } from './LoginContext'
export const ReservaContext = createContext()

export const ReservaProvider = ({ children }) => {

  const { state } = useContext(LoginContext)
  
  const initialState = {
    reservas: [],
    reservaSeleccionada: null,
  }
  const [stateReserva, dispatch] = useReducer(ReservaReducer, initialState)

 
  const registrarReserva = async (reserva) => {
    const token = state.token
    try {
      const res = await createReserva(reserva, token)
      console.log(res)
      if (res.status === 200) {
        dispatch({
          type: 'CREATE_RESERVA',
          payload: res.data
        })
        
      }
      return { success: true, message: res.data.message }
    } catch(error) {
      console.log(error.response.data.error)
      return { success: false, message: error.response.data.error }
    }
  }
  const getReservas = async () => {
    const token = state.token
    try {
      const res = await getAllReservas(token)
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: 'GET_RESERVAS',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      throw error.response.data.error;
    }
  }
  const getReserva = async (id) => {
    const token = state.token
    try {
      const res = await getReserva(id, token)
      console.log(res)

      dispatch({
        type: 'GET_RESERVA',
        payload: res.data
      })
      return { success: true, message: 'Reserva obtenida!' }

    } catch (error) {
      return { success: false, message: 'Hubo un error al obtener la reserva.' }
    }
  
  }
  return (
    <ReservaContext.Provider value={{ stateReserva, registrarReserva, getReservas, getReserva }}>
      {children}
    </ReservaContext.Provider>
  )
}