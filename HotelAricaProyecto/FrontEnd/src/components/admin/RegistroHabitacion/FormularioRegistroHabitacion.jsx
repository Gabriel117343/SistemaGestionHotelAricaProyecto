import { debounce } from 'lodash';
import React, { useState, useContext } from 'react';
import { InfoHabitacion } from './InfoHabitacion';
import { toast } from 'react-hot-toast';
import swal from 'sweetalert2';
import { HabitacionContext } from '../../../context/HabitacionContext'
export const FormularioRegistroHabitacion = () => {
  const { crearHabitacion } = useContext(HabitacionContext)
  const [infoHabitacion, setInfoHabitacion] = useState({
    imagen: '',
    tipo: 'Deluxe',
    cama: 'Cama Mediana King',
    precio: 40000,
    ocupacion: '2 personas',
  });

  const [validaciones, setValidaciones] = useState({
    numero: { valido: true, mensaje: '' },
    precio: { valido: true, mensaje: '' },
    cama: { valido: true, mensaje: '' },
    descripcion: { valido: true, mensaje: '' },
  });

  const setInfoHabitacionDebounce = debounce(setInfoHabitacion, 1000);

  const handleInputChange = (value, field) => {
    setInfoHabitacionDebounce({ ...infoHabitacion, [field]: value });

    // Realizar la validación en tiempo real
    const nuevaValidacion = validarCampo(field, value);
    setValidaciones((prevValidaciones) => ({ ...prevValidaciones, [field]: nuevaValidacion }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setInfoHabitacion({ ...infoHabitacion, imagen: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const EnviarFormularioRegistro = async (event) => {
    event.preventDefault();

    // Validar todos los campos antes de enviar el formulario
    const todasLasValidacionesSonCorrectas = Object.values(validaciones).every((v) => v.valido);

    if (!todasLasValidacionesSonCorrectas) {
      toast.error('Por favor, corrija los campos con errores antes de enviar el formulario.');
      return;
    }

    const formHabitaciones = new FormData(event.target);
    const toastId = toast.loading('Cargando...', { id: 'loading' });

    try {
      // Resto del código para enviar el formulario
      const { success, message } = await crearHabitacion(formHabitaciones);

      toast.dismiss(toastId, { id: 'loading' });
      if (success) {
        swal.fire({
          icon: 'success',
          title: 'Habitacion creada',
          text: message,
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/admin/habitaciones-registradas';
          }
        });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: message,
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      toast.dismiss(toastId, { id: 'loading' });
      toast.error('Hubo un error al crear la habitacion.');
      console.log(error);
    }
  };

  const validarCampo = (campo, valor) => {
    switch (campo) {
      case 'numero':
        const esNumero = !isNaN(valor)&& parseInt(valor) <= 999;
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
    <div className="row">
      <div className="col-md-6 col-ms-12">
        <form onSubmit={EnviarFormularioRegistro} className="m-2 border px-3 rounded">
          <div className="form-group">
            <label htmlFor="numero">Numero</label>
            <input
              type="number"
              className={`form-control ${validaciones.numero.valido ? '' : 'is-invalid'}`}
              placeholder="Ej: 233"
              maxLength={3}
              required
              name="numero"
              onChange={(e) => handleInputChange(e.target.value, 'numero')}
            />
            <div className="invalid-feedback">{validaciones.numero.mensaje}</div>
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input
              onChange={(e) => handleInputChange(e.target.value, 'precio')}
              type="number"
              className={`form-control ${validaciones.precio.valido ? '' : 'is-invalid'}`}
              name="precio"
              placeholder="Ej:20000"
              maxLength={5}
              required
            />
            <div className="invalid-feedback">{validaciones.precio.mensaje}</div>
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select
              className="form-control"
              type="text"
              onChange={(e) => handleInputChange(e.target.value, 'cama')}
              name="estado"
              id="estado"
              required
            >
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="camas">Cama</label>
            <input
              onChange={(e) => handleInputChange(e.target.value, 'cama')}
              type="text"
              className={`form-control ${validaciones.cama.valido ? '' : 'is-invalid'}`}
              placeholder="Cama Mediana King..."
              required
              name="cama"
            />
            <div className="invalid-feedback">{validaciones.cama.mensaje}</div>
          </div>
          <div className="form-group">
            <label htmlFor="ocupacion">Ocupacion</label>
            <select
              type="number"
              className="form-control"
              onChange={(e) => handleInputChange(e.target.value, 'ocupacion')}
              name="ocupacion"
            >
              <option value="1">1 Persona</option>
              <option value="2">2 Personas</option>
              <option value="3">3 Personas</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>
            <select
              onChange={(e) => handleInputChange(e.target.value, 'tipo')}
              className="form-control"
              name="tipo"
              id="tipo"
            >
              <option value="individual">Individual</option>
              <option value="doble">Doble</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="imagen">Imagen</label>
            <input
              onChange={handleFileChange}
              type="file"
              className="form-control"
              name="imagen"
            />
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
              required
              onChange={(e) => handleInputChange(e.target.value, 'descripcion')}
            ></textarea>
            <div className="invalid-feedback">{validaciones.descripcion.mensaje}</div>
          </div>
          <div className="pt-3">
            <button type="submit" className="btn btn-success">
              Registrar
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-6 col-ms-12">
        <InfoHabitacion infoHabitacion={infoHabitacion} />
      </div>
    </div>
  );
};