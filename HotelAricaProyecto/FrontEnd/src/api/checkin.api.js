import axios from 'axios'
const checkinApi = axios.create({
  baseURL: 'http://localhost:8000/usuarios/datos/v1/checkin'
})


export const createCheckin = async (checkin, token) => {
  
  return checkinApi.post('/', checkin, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}