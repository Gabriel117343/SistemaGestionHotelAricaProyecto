// contexto para un usuario logeado

import React, { createContext, useReducer } from 'react'
import { LoginReducer } from '../context/LoginReducer'
import { login, logout, getUser } from '../api/usuariosLogin.api'

export const LoginContext = createContext() // 1 Crear el contex

export const LoginProvider = ({ children }) => {

  const initialState = {
    usuario: null,
    token: null, 
    isAuth: false
  }
  const [state, dispatch] = useReducer(LoginReducer, initialState)
  
  const iniciarSesion = async (usuario) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await login(usuario)
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          const data = { token: res.data.token };

          // Guarda el token en el localstorage
          localStorage.setItem('token', data.token);
          dispatch({
            type: 'GUARDAR_USUARIO',
            payload: res.data
          })
  
          setTimeout(() => {
            resolve({ success: true, message: res.data.message, rol: res.data.usuario.rol })
          }, 2000)
        }
      } catch (error) {
        reject(new Error(error.response.data.error))
      }
    })
  }
  const cerrarSesion = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await logout(state.token)
        if (res.status === 200) {
          dispatch({
            type: 'LIMPIAR_USUARIO'
          })
          resolve ({ success: true, message: res.data.message })

        }
        
      } catch (error) {
        console.log(error)
        reject(error)
      }
      
    })
  }
  const obtenerUsuarioLogeado = async (token) => {
    try {
      const res = await getUser(token)
      console.log(res)
      dispatch({ // guardar el usuario en el estado
        type: 'GUARDAR_USUARIO',
        payload: res.data
      })
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: res.data.message }
    }
  }
  return (
    <LoginContext.Provider value={{ iniciarSesion, cerrarSesion, obtenerUsuarioLogeado, state }}>
      {children}
    </LoginContext.Provider>
  )
}
