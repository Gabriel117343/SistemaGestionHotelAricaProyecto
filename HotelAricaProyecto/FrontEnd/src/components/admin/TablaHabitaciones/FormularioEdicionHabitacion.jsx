import React, { useContext, useState } from 'react';
import { HabitacionContext } from '../../../context/HabitacionContext';
import { toast } from 'react-hot-toast';

export const FormularioEdicionHabitacion = ({ cerrarModal }) => {
  const { stateHabitacion, editarHabitacion } = useContext(HabitacionContext);
  const [validaciones, setValidaciones] = useState({
    numero: { valido: true, mensaje: '' },
    precio: { valido: true, mensaje: '' },
    cama: { valido: true, mensaje: '' },
    descripcion: { valido: true, mensaje: '' },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Realizar la validación en tiempo real
    const nuevaValidacion = validarCampo(name, value);
    setValidaciones((prevValidaciones) => ({ ...prevValidaciones, [name]: nuevaValidacion }));
  };

  const enviarFormularioRegistro = async (event) => {
    event.preventDefault();

    // Validar todos los campos antes de enviar el formulario
    const todasLasValidacionesSonCorrectas = Object.values(validaciones).every((v) => v.valido);

    if (!todasLasValidacionesSonCorrectas) {
      toast.error('Por favor, corrija los campos con errores antes de enviar el formulario.');
      return;
    }

    // Resto del código para enviar el formulario
    const habitacion = Object.fromEntries(new FormData(event.target));
    const form = new FormData();

    form.append('numero', habitacion.numero);
    form.append('precio', habitacion.precio);
    form.append('cama', habitacion.cama);
    form.append('descripcion', habitacion.descripcion);
    // Agregar el resto de campos al FormData...

    const { success, message } = await editarHabitacion(stateHabitacion.habitacionSeleccionada.id, form);

    if (success) {
      toast.success(message);
      cerrarModal();
    } else {
      cerrarModal();
      toast.error('Hubo un error al editar la habitación.');
    }
  };

  const validarCampo = (campo, valor) => {
    switch (campo) {
      case 'numero':
        const esNumero = !isNaN(valor) && parseInt(valor) <= 999;
        return {
          valido: esNumero,
          mensaje: esNumero ? '' : 'Ingrese un número válido.',
        };

      case 'precio':
        const esPrecioValido = !isNaN(valor) && parseInt(valor) <= 200000;
        return {
          valido: esPrecioValido,
          mensaje: esPrecioValido ? '' : 'Ingrese un precio válido (hasta 200,000).',
        };

      case 'cama':
        const esCamaValida = !/^\d+$/.test(valor);
        return {
          valido: esCamaValida,
          mensaje: esCamaValida ? '' : 'Ingrese un valor no numérico para la cama.',
        };

      case 'descripcion':
        const esDescripcionValida = valor.trim() !== '';
        return {
          valido: esDescripcionValida,
          mensaje: esDescripcionValida ? '' : 'La descripción no puede estar vacía.',
        };

      default:
        return { valido: true, mensaje: '' };
    }
  };

  return (
    <form onSubmit={enviarFormularioRegistro}>
      <div className="form-group">
        <label htmlFor="numero">Numero</label>
        <input
          defaultValue={stateHabitacion.habitacionSeleccionada.numero}
          type="text"
          className={`form-control ${validaciones.numero.valido ? '' : 'is-invalid'}`}
          placeholder="Ej: 233"
          maxLength={3}
          name="numero"
          onChange={handleChange}
        />
        <div className="invalid-feedback">{validaciones.numero.mensaje}</div>
      </div>

      <div className="form-group">
        <label htmlFor="precio">Precio Noche</label>
        <input
          type="text"
          className={`form-control ${validaciones.precio.valido ? '' : 'is-invalid'}`}
          name="precio"
          placeholder="Ej:20000"
          maxLength={5}
          defaultValue={stateHabitacion.habitacionSeleccionada.precio}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{validaciones.precio.mensaje}</div>
      </div>

      <div className="form-group">
        <label htmlFor="cama">Cama</label>
        <input
          type="text"
          className={`form-control ${validaciones.cama.valido ? '' : 'is-invalid'}`}
          placeholder="Cama Mediana King..."
          name="cama"
          defaultValue={stateHabitacion.habitacionSeleccionada.cama}
          onChange={handleChange}
        />
        <div className="invalid-feedback">{validaciones.cama.mensaje}</div>
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripcion</label>
        <textarea
          placeholder="Habitacion con servicios incluidos.."
          style={{ height: '7rem' }}
          className={`form-control ${validaciones.descripcion.valido ? '' : 'is-invalid'}`}
          name="descripcion"
          id="descripcion"
          cols="30"
          rows="10"
          defaultValue={stateHabitacion.habitacionSeleccionada.descripcion}
          onChange={handleChange}
        ></textarea>
        <div className="invalid-feedback">{validaciones.descripcion.mensaje}</div>
      </div>

      <div className="pt-3 d-flex justify-content-between">
        <button type="submit" className="btn btn-success">
          Editar
        </button>
        <button type="button" onClick={cerrarModal} className="btn btn-danger">
          Cancelar
        </button>
      </div>
    </form>
  );
};
