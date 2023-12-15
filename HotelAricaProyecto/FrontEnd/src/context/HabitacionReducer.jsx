import React from 'react'

export const HabitacionReducer = (stateHabitacion, action) => {
  
  const { type, payload } = action // destructurin de action
  
  switch (type) {

    case 'GET_HABITACIONES':
      return {
        ...stateHabitacion,
        habitaciones: payload
      }
    case 'GET_HABITACION':
      return {
        ...stateHabitacion,
        habitacionSeleccionada: payload
      }
    case 'CREATE_HABITACION':
      return {
        ...stateHabitacion,
        habitaciones: [...stateHabitacion.habitaciones, payload]
      }
    case 'DELETE_HABITACION':
      return {
        ...stateHabitacion,
        habitaciones: stateHabitacion.habitaciones.filter((habitacion) => habitacion.id !== payload)
      }
    case 'UPDATE_HABITACION':
      return {
        ...stateHabitacion,
        habitaciones: stateHabitacion.habitaciones.map((habitacion) => habitacion.id === payload.id ? payload : habitacion)
      }
    case 'LIMPIAR_HABITACION_SELECCIONADA':
      return {
        ...stateHabitacion,
        habitacionSeleccionada: null
      }
    default:
      return state
  }
}
