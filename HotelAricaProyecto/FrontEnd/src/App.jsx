
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Index } from './pages/Index'
import { PanelAdmin } from './pages/Admin/PanelAdmin'
import { Login } from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { RecepcionistaRoutes } from './routes/RecepcionistaRoutes'
import { AdminRoutes } from './routes/AdminRoutes'
import { useEffect, useContext } from 'react'
import { HerramientaDesarrollo } from './views/HerramientaDesarrollo'
import { LoginContext } from './context/LoginContext'
import { FormEnvioCorreo } from './pages/FormEnvioCorreo'
import { Cambiar_contrasena } from './pages/Cambiar_contrasena'
function App() {
  const { obtenerUsuarioLogeado, state } = useContext(LoginContext)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (state.isAuth === false) {
        console.log('Volviendo a obtener el usuario logeado');
        obtenerUsuarioLogeado(token);
      }
    } else {
      console.log('No hay token disponible');
    }
  }, [state.isAuth])
  return (
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<Navigate to="/" />} />{/* Redirecciona a la pagina principal si no encuentra la ruta */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PanelAdmin />} />
            <Route path="/recepcionista/*" element={<RecepcionistaRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} /> {/* Rutas de admin "*"" son rutas comodin */}
            <Route path="/form-envio-correo" element={<FormEnvioCorreo />} />
            <Route path="/cambiar-contrasena/:uuid/:token" element={<Cambiar_contrasena/>} />
          </Routes>
          <HerramientaDesarrollo />
          <Toaster />
      
        </BrowserRouter>  

     

      
     
   
  )
}

 export default App
