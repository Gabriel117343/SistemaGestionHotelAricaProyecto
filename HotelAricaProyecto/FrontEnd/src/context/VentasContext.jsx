import { createContext, useContext, useReducer } from 'react'
import { LoginContext } from '../context/LoginContext'
import { getAllVentas, getVenta, createVenta } from '../api/ventas.api'
import { VentasReducer } from './VentasReducer'
export const VentasContext = createContext() // creando el contexto

export const VentasProvider = ({ children }) => {
  const { state: { token } } = useContext(LoginContext)
  const initialState = {
    ventas: [],
    ventaSeleccionada: null,
  }
  const [stateVenta, dispatch] = useReducer(VentasReducer, initialState)
  // ASI TENGO TODAS LAS FUNCIONES QUE SE COMUNICAN CON EL BACKEND
  const getVentasContext = async () => {
    try {
      const res = await getAllVentas(token)
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: 'GET_VENTAS',
          payload: res.data.data
        });
        return { success: true, message: res.data.message };
      }
      
    } catch (error) {
      throw error.response.data.error;
    }
  }
  const getVentaContext = async (id) => {
    try {
      const res = await getVenta(id, token)
      console.log(res)
      dispatch({
        type: 'GET_VENTA',
        payload: res.data
      })
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: error.response.data.error }
    }
  }
  const crearVentaContext = async (venta) => {
    try {
      const res = await createVenta(venta, token)
      console.log(res)
      dispatch({
        type: 'CREATE_VENTA',
        payload: res.data
      })
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: error.response.data.error }
    }
  }
  return (
    <VentasContext.Provider value={{
      stateVenta,
      getVentasContext,
      getVentaContext,
      crearVentaContext
    }}>{ children }
    </VentasContext.Provider>
  )
}

