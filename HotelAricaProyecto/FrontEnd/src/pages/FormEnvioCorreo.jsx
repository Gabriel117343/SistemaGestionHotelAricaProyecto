
import { Navbar } from '../pages/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'

export const FormEnvioCorreo = () => {
  const recuperarContraseña = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    console.log(email)
    const toastId = toast.loading('Enviando link de reseteo de contraseña por email', { duration: 2000 }, { id: 'loading' })
    // esto es para obtener el token csrf de la cookie
    setTimeout(async() => {
      try {
      
        const response = await axios.post('http://127.0.0.1:8000/usuarios/generate_password_reset_link/', { email })
        if (response.status === 200) {
          setTimeout(() => {
  
          }, 2000)
          toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
          const { uid, token } = response.data
          const reset_link = `http://localhost:5173/reset_password/${uid}/${token}/`
          // Enviar el link de reseteo de contraseña por email
          
            const res = await axios.post('http://127.0.0.1:8000/usuarios/send_password_reset_email/', { email, reset_link })
            if (res.status === 200) {
              
              toast.success(res.data.message, { duration: 4000, icon: '📧' })
            }
  
        } 
        
  
      } catch (error) {
        toast.dismiss(toastId, { id: 'loading' }) // cerrar el toast de cargando
        toast.error('Error al enviar el email', { duration: 4000, icon: '❌' })
      }

    }, 2000)
    
    
  }
  return (
    <>
      <Navbar />
      <main className='container'>
        <section >
          <div className="d-flex justify-content-center">
            <h1>Recuperacion de la cuenta</h1>
            

          </div>
          
          <form onSubmit={recuperarContraseña}>
            <input type='text' className='form-control' name='email' />
            <button type='submit' className='btn btn-info'>Recuperar contraseña</button>
          </form>

        </section>

      </main>
    </>
  )
}
