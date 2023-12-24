import axios from 'axios'

const ventasApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/ventas'
})

export const getAllVentas = (token) => {
  return ventasApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getVenta = (id, token) => {
  return ventasApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })

}
export const createVenta = async (venta, token) => {

  return ventasApi.post('/', venta, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}