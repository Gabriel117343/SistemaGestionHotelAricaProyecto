
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Index } from './pages/Index'
import { PanelAdmin } from './pages/Admin/PanelAdmin'
import { Login } from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { RecepcionistaRoutes } from './routes/RecepcionistaRoutes'
import { AdminRoutes } from './routes/AdminRoutes'
import { LoginProvider } from './context/LoginContext'
import { HerramientaDesarrollo } from './views/HerramientaDesarrollo'
function App() {


  return (
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<Navigate to="/" />} />{/* Redirecciona a la pagina principal si no encuentra la ruta */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PanelAdmin />} />
            <Route path="/recepcionista/*" element={<RecepcionistaRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} /> {/* Rutas de admin "*"" son rutas comodin */}

          </Routes>
          <HerramientaDesarrollo />
          <Toaster />
      
        </BrowserRouter>  

      </LoginProvider>

      
     
   
  )
}

 export default App
