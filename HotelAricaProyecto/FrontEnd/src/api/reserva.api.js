import axios from 'axios'

const reservasApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/reservas'
})

export const getAllReservas = (token) => {
  return reservasApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getReserva = (id, token) => {
  return reservasApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createReserva = async (reserva, token) => {
  return reservasApi.post('/', reserva, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}