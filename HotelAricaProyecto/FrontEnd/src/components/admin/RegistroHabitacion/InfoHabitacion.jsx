import React from 'react'

export const InfoHabitacion = ({infoHabitacion}) => {
  const {imagen, tipo, cama, precio, ocupacion} = infoHabitacion
  console.log(ocupacion)
  return (
    <article className="col-md-6">
      {imagen ? 
      <img width='500px' height='280px' src={imagen} alt="imagen de habitacion" /> 
      :
      <img width='500' height='280px' src="https://blog.secom.es/wp-content/uploads/2021/06/iluminacion-habitacion-hotel-1177.jpg" alt="" />
      }
      {tipo ? (
        <h2>Habitacion {tipo}</h2>
      ):
        <h2>Habitacion Deluxe</h2>
      }
      <div className="row">
        <div className="col-md-5 d-flex row align-items-center justify-content-center">

          <strong>Cama</strong>
          <strong>Ocupacion</strong>
          <strong>Precio Noche</strong>
        </div>
        <div className="col-md-7 d-flex row ps-5">
          {cama ? (
            <p>{cama}</p>
          ):
            <p>Cama Mediana King</p>
          }
          {ocupacion ? (
            <p>{ocupacion} Personas</p>
          ):
            <p>2 Personas</p>
          }
          {precio ? (
            <p>${precio}</p>
          ):
            <p>$40000</p>
          }

        </div>
      </div>


    </article>
  )
}
