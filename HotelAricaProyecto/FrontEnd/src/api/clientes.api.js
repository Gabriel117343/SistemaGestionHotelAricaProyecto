import axios from 'axios'

const clientesApi = axios.create({
  // la urls por defectos
  baseURL: 'http://localhost:8000/usuarios/datos/v1/clientes'
})

export const getAllClientes = (token) => {
  return clientesApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getCliente = (id, token) => {
  return clientesApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createCliente = async (cliente, token) => {
  return clientesApi.post('/', cliente, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteCliente = (id, token) => {
  return clientesApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
