import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PanelRecepcionista } from '../pages/Recepcionista/PanelRecepcionista'
export const RecepcionistaRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PanelRecepcionista />} />
    </Routes>
  )
}
