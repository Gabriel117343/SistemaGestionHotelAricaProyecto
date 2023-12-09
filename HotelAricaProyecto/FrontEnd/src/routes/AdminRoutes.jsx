import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PanelAdmin } from '../pages/Admin/PanelAdmin'
import { Menu } from '../components/admin/Menu'
import { RegistroHabitacion } from '../pages/Admin/RegistroHabitacion'
import { Navbar } from '../pages/Navbar'
export const AdminRoutes = () => {
  return (
    <>
      <Navbar />
    
        <Menu>
          <Routes>
            <Route path='/home' element={<PanelAdmin />} />
            <Route path='*' element={<Navigate to='home' />} />
            <Route path='/registro-habitacion' element={<RegistroHabitacion />} />
          </Routes>

        </Menu>

    
    </>
  )
}
