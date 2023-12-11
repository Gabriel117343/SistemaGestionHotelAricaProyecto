import { createContext, useReducer, useContext } from 'react'
import { UsuariosReducer } from './UsuariosReducer'
import { getAllUsuarios, getUsuario, createUsuario, deleteUsuario, updateUsuario } from '../api/usuario.api'
import { LoginContext } from './LoginContext'
// 1 Crear el contexto
export const UsuariosContext = createContext()

// contexto para todo el arbol de componentes de Administrador

export const UsuariosProvider = ({ children }) => {
  const initialState = { // Estado inicial
    usuarios: [], // lista de usuarios
    usuarioSeleccionado: null
  }
  const { state } = useContext(LoginContext) // se obtiene el token del usuario
  const [stateUsuario, dispatch] = useReducer(UsuariosReducer, initialState)
  const getUsuarios = async () => {
    const token = state.token
    try {
      const res = await getAllUsuarios(token)
      dispatch({
        type: 'GET_USUARIOS',
        payload: res.data.data // guarda los usuarios en el estado
      })
      return { success: true, message: 'Usuarios obtenidos!' }
    } catch (res) {
      // throw error del res.data.message
      return { success: false, message: 'Hubo un error al obtener los usuarios.' }
    }
  }
  const getUsuarioSeleccionado = async (id) => {
    const token = state.token
    try {
      const res = await getUsuario(id, token)

      dispatch({
        type: 'GET_USUARIO',
        payload: res.data // guarda el usuario seleccionado en el estado usuarioSeleccionado
      })
      return { success: true, message: 'Usuario obtenido!' }

    } catch (error) {
      return { success: false, message: 'Hubo un error al obtener el usuario.' }
    }
    
    
  
  }
  const crearUsuario = async (usuario) => {
    const token = state.token
    console.log(token)
    try {
      const res = await createUsuario(usuario, token) // espera a que se cree el usuario para continuar con la ejecucion del codigo y no se salte el toast de exito
      dispatch({
        type: 'CREATE_USUARIO',
        payload: res.data // agrega el nuevo usuario al arreglo de usuarios
      })
      return { success: true, message: 'Usuario creado!' }
    } catch (error) {
      return { success: false, message: 'Hubo un error al crear el usuario.' }
    }
  }

  const eliminarUsuario = async (id) => {
    const token = state.token
    try {
      // capturando la respuesta
      const res = await deleteUsuario(id, token)
      dispatch({
        type: 'DELETE_USUARIO',
        payload: id // filtra los usuarios que no sean el que se quiere eliminar
      })
      return { success: true, message: res.data.message }
    } catch (error) {
      return { success: false, message: 'Hubo un error al eliminar el usuario' }
    }
  } // en mvc este es el controlador que se encarga de eliminar el usuario de la base de datos y de actualizar el estado de la lista de usuarios

  const modificarUsuario = async (id, usuario) => {
    const token = state.token
  
    try {
      const res = await updateUsuario(id, usuario, token)
      console.log(res.data)
      dispatch({
        type: 'UPDATE_USUARIO',
        payload: usuario // actualiza el usuario  que se modifico y deja los demas igual como estaban antes de la modificacion
      })
      return { success: true, message: 'Usuario actualizado!' }
    } catch {
      return { success: false, message: 'Hubo un error al actualizar el usuario.' }
    }
  }

  return (
    <UsuariosContext.Provider value={{
      stateUsuario,
      getUsuarios,
      crearUsuario,
      eliminarUsuario,
      getUsuarioSeleccionado,
      modificarUsuario
    }}
    >{children}
    </UsuariosContext.Provider>
  )
}
