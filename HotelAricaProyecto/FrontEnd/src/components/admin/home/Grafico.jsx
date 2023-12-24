import React, { useContext, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { VentasContext } from '../../../context/VentasContext';

export const Grafico = () => {
  const { stateVenta, getVentasContext } = useContext(VentasContext);

  useEffect(() => {
    getVentasContext();
  }, []);
  // Transforma los datos de ventas para que puedan ser usados por Recharts
  const data = stateVenta.ventas.map((venta, index) => ({
    name: `Venta ${index + 1}`,
    ventas: parseFloat(venta.precio_total),
  }));

  return (
    <BarChart width={300} height={400} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Bar dataKey="ventas" fill="#387908" />
    </BarChart>
  );
};