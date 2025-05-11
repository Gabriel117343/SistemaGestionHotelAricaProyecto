import React from 'react'

export const NotificacionReducer = (stateNotificacion, action) => {
  const { type, payload } = action
  
  switch (type) {
    case 'GET_NOTIFICACIONES':
      return {
        ...stateNotificacion,
        notificaciones: payload
      }
    case 'GET_NOTIFICACION':
      return {
        ...stateNotificacion,
        notificacionSeleccionada: payload
      }
    case 'CREATE_NOTIFICACION':
      return {
        ...stateNotificacion,
        notificaciones: [...stateNotificacion.notificaciones, payload]
      }
    case 'DELETE_NOTIFICACION':
      return {
        ...stateNotificacion,
        notificaciones: stateNotificacion.notificaciones.filter(notificacion => notificacion.id !== payload)
      }
      case 'UPDATE_NOTIFICACION':
        if (!payload || !payload.id) {
         
          return stateNotificacion;
        }
        return {
          ...stateNotificacion,
          notificaciones: stateNotificacion.notificaciones.map(notificacion => {
            if (!notificacion) {
            
              return notificacion;
            }
            return notificacion.id === payload.id ? payload : notificacion;
          })
        }
    default:
      return stateNotificacion
  }
}
//# Repositorio del proyecto @Gabriel17343
