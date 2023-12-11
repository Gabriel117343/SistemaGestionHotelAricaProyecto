
import { Navbar } from '../pages/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
export const FormEnvioCorreo = () => {
  useEffect(() => {

   
    localStorage.removeItem('token'); // Elimina el token del localstorage
    console.log('Borrando Token...')
  }, [])
  const recuperarContraseña = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    console.log(email)
    const toastIdf = toast.loading('Enviando link de reseteo de contraseña por email', { id: 'loading' })
    // esto es para obtener el token csrf de la cookie
    setTimeout(async() => {
      try {

        const response = await axios.post('http://127.0.0.1:8000/usuarios/generate_password_reset_link/', { email })
        if (response.status === 200) {
        
          
          const { uid, token } = response.data
          const reset_link = `http://localhost:5173/cambiar_contrasena/${uid}/${token}/`
          // Enviar el link de reseteo de contraseña por email
          
          const res = await axios.post('http://127.0.0.1:8000/usuarios/send_password_reset_email/', { email, reset_link })
          toast.dismiss(toastIdf, { id: 'loading' }) // cerrar el toast de cargando
          if (res.status === 200) {
            // mensaje personalizo sweetalert2 con exito al madar el correo con icono correo
            Swal.fire({
              icon: 'success',
              title: 'Correo enviado',
              text: 'Se ha enviado un correo con el link de reseteo de contraseña',
              confirmButtonText: 'Ok',
            }).then((result) => { // si el usuario le da click en ok lo redirige al login, result.isConfirmed es true si el usuario le da click en ok
              if (result.isConfirmed) {
                window.location.href = '/login'
              }
            })
          }
      } 
      } catch (error) {
        toast.dismiss(toastIdf, { id: 'loading' }) // cerrar el toast de cargando

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo ingresado no existe',
          confirmButtonText: 'Ok',
        })
        
      }

    }, 1000)
    
      


    
    
  }
  return (
    <>
      <Navbar />
      <main className='container'>
        <section >
          <div className="d-flex justify-content-center">
            <h1>Recuperacion de la cuenta</h1>
            

          </div>
          
          <form onSubmit={recuperarContraseña} className='mt-4'>
            <label htmlFor="correo">Correo</label>
            <input type='text' className='form-control' name='email' id='correo'/>
            <button type='submit' className='btn btn-info mt-3'>Recuperar contraseña</button>
          </form>

        </section>

      </main>
    </>
  )
}
