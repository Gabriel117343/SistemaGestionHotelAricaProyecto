
export const ReservaReducer = (stateReserva, action) => {
  const { type, payload } = action // destructurin de action

  switch(type) {
    case 'CREATE_RESERVA':
      return {
        ...stateReserva, // stateReserva es el state de este reducer
        reservas: [...state.reservas, payload] // se agrega la nueva reserva al arreglo de reservas
      }
    case 'GET_RESERVAS':
      return {
        ...stateReserva,
        reservas: payload
      }
    case 'GET_RESERVA':
      return {
        ...stateReserva,
        reservaSeleccionada: payload
      }
    case 'DELETE_RESERVA':
      return {
        ...stateReserva,
        reservas: state.reservas.filter(reserva => reserva.id !== payload)
      }
    case 'UPDATE_RESERVA':
      return {
        ...stateReserva,
        reservas: state.reservas.map(reserva => reserva.id === payload.id ? payload : reserva)
      }
    default:
      return state
  }
}