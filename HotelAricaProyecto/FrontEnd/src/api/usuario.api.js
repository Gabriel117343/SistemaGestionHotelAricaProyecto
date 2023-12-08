import axios from 'axios'// para hacer peticiones al back end
// crear una instancia con la direccion
const usuariosApi = axios.create({
  // la urls por defectos
  baseURL: 'http://127.0.0.1:8000/usuarios/datos/v1/usuarios'
})
// Este es el crud
export const getAllUsuarios = (token) => {
  // return axios.get("http://127.0.0.1:8000/usuarios/datos/v1/usuarios/") > anterior
  return usuariosApi.get('/', {
    headers: {
      Authorization: `Token ${token}`
    }
  }) // > nueva forma
}
export const getUsuario = (id, token) => {
  return usuariosApi.get(`/${id}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const createUsuario = async (usuario, token) => { // es necesario enviar la imagen como parametro para que se pueda enviar al servidor
  return usuariosApi.post('/', usuario, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`
    }
  })
}
export const deleteUsuario = (id, token) => {
  return usuariosApi.delete(`/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
export const updateUsuario = (id, usuario) => {
  return usuariosApi.put(`/${id}/`, usuario)
}


// SIMULACION DE LA API DE USUARIOS EN DJANGO COMO BACKEND