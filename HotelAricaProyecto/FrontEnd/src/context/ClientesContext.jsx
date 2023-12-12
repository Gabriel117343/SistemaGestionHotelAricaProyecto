import React,{ createContext, useReducer, useContext } from 'react'
import { getAllClientes, createCliente, deleteCliente, getCliente } from '../api/clientes.api'
import { ClientesReducer } from './ClientesReducer'
import { LoginContext } from '../context/LoginContext'
export const ClienteContext = createContext()
export const ClienteProvider = ({children}) => {
  const initialState = {
    clientes: [],
    clienteSeleccionado: null,
  }
  const [stateClientes, dispatch] = useReducer(ClientesReducer, initialState)

  const { state } = useContext(LoginContext) // se obtiene el token del usuario
  const getClientes = async () => {
    const token = state.token
    try {
      const res = await getAllClientes(token)
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: 'GET_CLIENTES',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      throw error.response.data.error;
    }
  }
  const crearCliente = async (cliente) => {
    const token = state.token
    try {
      const res = await createCliente(cliente, token)
      console.log(res)
      dispatch({
        type: 'CREATE_CLIENTE',
        payload: res.data
      })
      return { success: true, message: 'Cliente creado!' }
    } catch (error) {
      return { success: false, message: 'Hubo un error al crear el cliente.' }
    }
  }
  const eliminarCliente = async (id) => {
    const token = state.token
    try {
      const res = await deleteCliente(id, token)
      dispatch({
        type: 'DELETE_CLIENTE',
        payload: id
      })
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: 'Hubo un error al eliminar el cliente.' }
    }
  }
  const obtenerCliente = async (id) => {
    const token = state.token
    try {
      const res = await getCliente(id, token)
      console.log(res)
      dispatch({
        type: 'GET_CLIENTE',
        payload: res.data
      })
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: 'Hubo un error al obtener el cliente.' }
    }
  }
  return (
    <ClienteContext.Provider value={{
      getClientes,
      crearCliente,
      eliminarCliente,
      obtenerCliente,
      stateClientes
    }}>
      {children}
    </ClienteContext.Provider>
  )
}