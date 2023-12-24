import React from 'react'

export const VentasReducer = (stateVenta, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_VENTAS':
      return {
        ...stateVenta,
        ventas: payload
      }
    case 'GET_VENTA':
      return {
        ...stateVenta,
        ventaSeleccionada: payload
      }
    case 'CREATE_VENTA':
      return {
        ...stateVenta,
        ventas: [...stateVenta.ventas, payload]
      }
  }
}
