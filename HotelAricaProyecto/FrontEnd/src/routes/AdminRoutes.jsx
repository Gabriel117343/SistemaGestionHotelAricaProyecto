import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PanelAdmin } from '../pages/Admin/PanelAdmin'
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PanelAdmin />} />
    </Routes>
  )
}
