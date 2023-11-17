import axios from 'axios'// para hacer peticiones al back end
// crear una instancia con la direccion
const usuariosApi = axios.create({
  // la urls por defectos
  baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/usuarios'
})
// Este es el crud
export const getAllUsuarios = () => {
  // return axios.get("http://127.0.0.1:8000/usuarios/datos/v1/usuarios/") > anterior
  return usuariosApi.get('/') // > nueva forma
}
export const getUsuario = (id) => {
  return usuariosApi.get(`/${id}/`)
}
export const createUsuario = (usuario) => {
  return usuariosApi.post('/', usuario)
}
export const deleteUsuario = (id) => {
  return usuariosApi.delete(`/${id}`)
}
export const updateUsuario = (id, usuario) => {
  return usuariosApi.put(`/${id}/`, usuario)
}


// SIMULACION DE LA API DE USUARIOS EN DJANGO COMO BACKEND