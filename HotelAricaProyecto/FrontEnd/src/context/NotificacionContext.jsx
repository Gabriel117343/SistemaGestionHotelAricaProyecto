import React, { useContext, useReducer, createContext } from 'react'
import { getAllNotificaciones, getNotificacionSeleccionada, createNotificacion, deleteNotificacion, updateNotificacion} from '../api/notificaciones.api'
import { NotificacionReducer } from './NotificacionReducer'
import { LoginContext } from './LoginContext'

export const NotificacionContext = createContext()
export const NotificacionProvider = ({ children }) => {

  const { state } = useContext(LoginContext)

  const initialState = {
    notificaciones: [],
    notificacionSeleccionada: null,
  }
  const [stateNotificacion, dispatch] = useReducer(NotificacionReducer, initialState)

  const getNotificacionesContext = async () => {
    console.log('sf')
    const token = state.token
    try {
      const res = await getAllNotificaciones(token)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'GET_NOTIFICACIONES',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      
      throw error.response.data.error;
    }
  }
  const getNotificacionContext = async (id) => {
    
    const token = state.token
    try {
      const res = await getNotificacionSeleccionada(id, token)
      console.log(res.data)
      if (res.status === 200 || res.status === 201) {
        
        dispatch({
          type: 'GET_NOTIFICACION',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error) {

      throw error.response.data.error
    }
  }
  const createNotificacionContext = async (notificacion) => {
    const token = state.token
    try {
      const res = await createNotificacion(notificacion, token)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'CREATE_NOTIFICACION',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error ) {
      console.log(error)
      
      return { success: false, message: error.response.data.error }
    }
  }
  const deleteNotificacionContext = async (id) => {
    const token = state.token
    try {
      const res = await deleteNotificacion(id, token)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'DELETE_NOTIFICACION',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error ) {
      return { success: false, message: error.response.data.error }
    }
  }
  const updateNotificacionContext = async (id, notificacion) => {
    const token = state.token
    try {
      const res = await updateNotificacion(id, notificacion, token)
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: 'UPDATE_NOTIFICACION',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error ) {
      return { success: false, message: error.response.data.error }
    }
  }
  return (
    <NotificacionContext.Provider value={{
        stateNotificacion,
        getNotificacionesContext,
        getNotificacionContext,
        createNotificacionContext,
        deleteNotificacionContext,
        updateNotificacionContext }}>
      {children}
    </NotificacionContext.Provider>
  )
}
