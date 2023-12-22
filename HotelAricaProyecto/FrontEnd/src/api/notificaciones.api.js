import axios from 'axios'
const notificacionesApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/notificaciones'
})
export const getAllNotificaciones = (token) => {
  return notificacionesApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const getNotificacionSeleccionada = (id, token) => {
  return notificacionesApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createNotificacion = async (notificacion, token) => {
  return notificacionesApi.post('/', notificacion, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteNotificacion = (id, token) => {
  return notificacionesApi.delete(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateNotificacion = (id, notificacion, token) => {
  return notificacionesApi.put(`/${id}/`, notificacion, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}