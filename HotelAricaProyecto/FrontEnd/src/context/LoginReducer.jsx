import React from 'react'

export const LoginReducer = (state, action) => {
  const { type, payload } = action // destructurin de action
  // EN USE REDUCER SE TRABAJA A TRAVEZ DEL ESTADO ACTUAL Y NO SE PUEDE CAMBIAR DIRECTAMENTE
  switch(type) {
    
    case 'GUARDAR_USUARIO':
      return {
        ...state, // esto es el estado actual __ los ... es para no perder el estado actual y solo cambiar lo que se necesita__
        
        usuario: payload.usuario, // esto es el usuario que viene de la base de datos
        token: payload.token, // esto es el token que viene de la base de datos
        isAuth: true // esto es para saber si el usuario esta autenticado
      }
    case 'LIMPIAR_USUARIO': // esto es para cerra la sesion actual
      return {
        ...state,
        usuario: null, // esto es el usuario que viene de la base de datos
        token: null,
        isAuth: false
      }
    
    default:
      return state // retorna el estado actual si no se cumple ningun caso
  }
  
}
