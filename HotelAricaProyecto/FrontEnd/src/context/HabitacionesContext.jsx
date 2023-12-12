import React,{ createContext, useReducer, useContext } from 'react'
import { LoginContext } from './LoginContext'
import { getAllHabitaciones, createHabitacion, deleteHabitacion, getHabitacionSeleccionada, updateHabitacion } from '../api/habitaciones.api'
import { HabitacionesReducer } from './HabitacionesReducer'
export const HabitacionesContext = createContext()
export const HabitacionesProvider = ({ children }) => {
      
  const { state } = useContext(LoginContext) // se obtiene el token del usuario
  const initialState = {
    habitaciones: [],  // eseto es  una lista de habitaciones
    habitacionSeleccionada: null, // es la habitacion que se selecciona
  }
  const [stateHabitacion, dispatch] = useReducer(HabitacionesReducer, initialState)

  const getHabitaciones = async () => {
    try {
      const res = await getAllHabitaciones(state.token) // se obtienen las habitaciones
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: 'GET_HABITACIONES',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      throw error.response.data.error;
    }
  }
  const crearHabitacion = async (habitacion) => {
    const token = state.token
    try {
      const res = await createHabitacion(habitacion, token)
      console.log(res)
      dispatch({
        type: 'CREATE_HABITACION',
        payload: res.data
      })
      return { success: true, message: 'Habitacion creada!' }
    } catch (error) {
      return { success: false, message: 'Hubo un error al crear la habitacion.' }
    }
  }
  const eliminarHabitacion = async (id) => {
    const token = state.token
    try {
      const res = await deleteHabitacion(id, token)
      dispatch({
        type: 'DELETE_HABITACION',
        payload: id
      })
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: 'Hubo un error al eliminar la habitacion.' }
    }
  }
  const getHabitacion = async (id) => {
    const token = state.token
    try {
      const res = await getHabitacionSeleccionada(id, token)
      dispatch({
        type: 'GET_HABITACION',
        payload: res.data
      })
      return { success: true, message: 'Habitacion obtenida!' }
    } catch (error) {
      return { success: false, message: 'Hubo un error al obtener la habitacion.' }
    }
  }
  const editarHabitacion = async (id, habitacion) => {
    const token = state.token
    try {
      const res = await updateHabitacion(id, habitacion, token)
      dispatch({
        type: 'UPDATE_HABITACION',
        payload: res.data
      })
      return { success: true, message: 'Habitacion actualizada!' }
    } catch (error) {
      return { success: false, message: 'Hubo un error al actualizar la habitacion.' }
    }
  }



  return <HabitacionesContext.Provider value={{
    stateHabitacion,
    getHabitaciones,
    crearHabitacion,
    eliminarHabitacion,
    getHabitacion,
    editarHabitacion
  }}>{ children }</HabitacionesContext.Provider>

}
