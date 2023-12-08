import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export const Cambiar_contrasena = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { uid, token } = useParams()
  console.log(uid)
  const resetPassword = async () => {
    if (password === confirmPassword) {
      const response = await axios.post('http://127.0.0.1:8000/usuarios/reset_password/', { uid, token, password })

      if (response.status === 200) {
        // Password reset successful
        console.log('Password reset successful')
        toast.success(response.data.message, { duration: 3000 })
        console.log(response.data)
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      } else {
        // Handle error
        console.log('Error resetting password')
      }
    } else {
      console.log('Passwords do not match')
    }
  }

  return (
    <div className='container'>
      <input className='form-control' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='New password' />
      <input className='form-control' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm new password' />
      <button className='btn btn-success' onClick={resetPassword}>Reset Password</button>
    </div>
  )
}
