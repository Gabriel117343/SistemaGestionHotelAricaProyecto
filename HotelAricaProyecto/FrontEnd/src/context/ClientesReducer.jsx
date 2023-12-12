
export const ClientesReducer = (stateCliente, action) => {
  const { type, payload } = action // destructurin de action
  
  switch (type) {
      
      case 'GET_CLIENTES':
        return {
          ...stateCliente,
          clientes: payload
        }
      case 'GET_CLIENTE':
        return {
          ...stateCliente,
          clienteSeleccionado: payload
        }
      case 'CREATE_CLIENTE':
        return {
          ...stateCliente,
          clientes: [...stateCliente.clientes, payload]
        }
      case 'DELETE_CLIENTE':
        return {
          ...stateCliente,
          clientes: stateCliente.clientes.filter((cliente) => cliente.id !== payload)
        }
      case 'UPDATE_CLIENTE':
        return {
          ...stateCliente,
          clientes: stateCliente.clientes.map((cliente) => cliente.id === payload.id ? payload : cliente)
        }
      default:
        return stateCliente
  }

}