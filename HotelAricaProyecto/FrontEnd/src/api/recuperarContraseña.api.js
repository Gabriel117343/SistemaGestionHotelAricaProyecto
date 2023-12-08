import axios from 'axios'
import { rest } from 'lodash'
const tokenApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/usuarios/generate_password_reset_link'
})

const obtenerToken = async (email) => {
  // obtener el token CSRF desde Django
  return tokenApi.post('/', { email })
}
const linkCambiarContraseña = async (email) => {
  const response = await obtenerToken(email)
  const { uid, token } = response.data

  // El token CSRF estará presente en las cookies de la respuesta
  // esto crea el link para cambiar la contraseña
  return `http://localhost:5173/cambiar-contrasena/${uid}/${token}`

}
export const enviarCorreo = async (email) => {

  const reset_link = await linkCambiarContraseña(email)
 
  // enviar correo SMTP

  return axios.post('http://localhost:127.0.0.1:8000/usuarios/send_password_reset_email/', { email,  reset_link })
}