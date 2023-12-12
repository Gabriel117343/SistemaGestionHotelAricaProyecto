import axios from 'axios'
const habitacionesApi = axios.create({
  // la urls por defectos
  baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/habitaciones'
})

export const getAllHabitaciones = (token) => {
  return habitacionesApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getHabitacionSeleccionada = (id, token) => {
  return habitacionesApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createHabitacion = async (habitacion, token) => {
  

  return habitacionesApi.post('/', habitacion, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteHabitacion = (id, token) => {
  return habitacionesApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateHabitacion = (id, habitacion, token) => {

  return habitacionesApi.put(`/${id}/`, habitacion, {
    headers: {
      'Content-Type': 'multipart/form-data', // para que se pueda enviar la imagen hay que decir que es un formulario new FormData()
      Authorization: `Token ${token}`
    }
  })
}
