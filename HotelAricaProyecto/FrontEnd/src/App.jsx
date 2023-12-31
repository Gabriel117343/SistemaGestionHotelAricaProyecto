
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Index } from './pages/Index'

import { Login } from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { RecepcionistaRoutes } from './routes/RecepcionistaRoutes'
import { AdminRoutes } from './routes/AdminRoutes'
import { useEffect, useContext, useState } from 'react'
import { HerramientaDesarrollo } from './views/HerramientaDesarrollo'
import { LoginContext } from './context/LoginContext'
import { FormEnvioCorreo } from './pages/FormEnvioCorreo'
import { CambiarContrasena } from './pages/CambiarContrasena'
import { CargaDePagina } from './views/CargaDePagina'
import { PersonalAseoRoutes } from './routes/PersonalAseoRoutes'
import { VentasProvider } from './context/VentasContext'
function App() {
  const { obtenerUsuarioLogeado, state: { usuario, isAuth } } = useContext(LoginContext)
  const [loading, setLoading] = useState(true);

  console.log(!!usuario?.rol.includes('recepcionista'))
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isAuth === false) {
        console.log('Volviendo a obtener el usuario logeado');
        obtenerUsuarioLogeado(token).finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 2000); // finally se ejecuta cuando se resuelve la promesa o cuando se rechaza 
        })
      }
    } else {
      console.log('No hay token disponible');
      setLoading(false);
    }
  }, [isAuth, location.pathname]);

  if (loading) {
    return <CargaDePagina />; // si loading es true se muestra el componente CargaDePagina
  }
  return (
        <VentasProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/index" element={<Index />} />
              <Route path="*" element={<Navigate to="/index" />} />{/* Redirecciona a la pagina principal si no encuentra la ruta */}
              <Route path="/login" element={<Login />} />
              <Route path="/recepcionista/*" element={<RecepcionistaRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} /> {/* Rutas de admin "*"" son rutas comodin */}
              <Route path="/aseo/*" element={<PersonalAseoRoutes />} />
              <Route path="/form-envio-correo" element={<FormEnvioCorreo />} />
          
              <Route path="/cambiar_contrasena/:uid/:token" element={<CambiarContrasena/>} />
            </Routes>
            <HerramientaDesarrollo />
            <Toaster />
        
          </BrowserRouter>

        </VentasProvider>
          
  )
}

 export default App
