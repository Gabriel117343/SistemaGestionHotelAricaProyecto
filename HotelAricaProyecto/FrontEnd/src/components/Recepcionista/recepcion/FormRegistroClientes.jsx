import React, { useContext, useRef, useState } from 'react';
import { ClienteContext } from '../../../context/ClientesContext';
import { toast } from 'react-hot-toast';

import { useClasesInput } from '../../../hooks/useClasesInput'
import { useFormatos } from '../../../hooks/useFormatos';
import './styles.css';
import debounce from 'lodash/debounce';

export const FormRegistroClientes = ({ cambiarOpcion }) => {
  const { crearCliente } = useContext(ClienteContext);
  const formRef = useRef();

  const claseNombre = useClasesInput();
  const claseApellido = useClasesInput();
  const claseRut = useClasesInput();
  const claseTelefono = useClasesInput();
  const claseCorreo = useClasesInput();
  const claseDireccion = useClasesInput();
  const claseContraseña = useClasesInput();

  const nombre = useFormatos();
  const telefono = useFormatos();

  const [errores, setErrores] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    telefono: '',
    email: '',
    direccion: '',
    contraseña: '',
  });

  const validarNombre = (nombre) => {
    const nombreRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,45}$/;
    return nombreRegex.test(nombre);
  };

  const validarApellido = (apellido) => {
    const apellidoRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,45}$/;
    return apellidoRegex.test(apellido);
  };

  const validarRut = (rut) => {
    console.log(rut)
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/;
    return rutRegex.test(rut);
  };

  const validarTelefono = (telefono) => {
    const telefonoRegex = /^\+\d{2} \d{9}$/;
    return telefonoRegex.test(telefono);
  };

  const validarCorreo = (correo) => {
    const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;
    return correoRegex.test(correo);
  };

  const validarDireccion = (direccion) => {
    const direccionRegex = /^[a-zA-Z0-9\s\W]{2,50}$/;
    return direccionRegex.test(direccion);
  };

  const validarContraseña = (contraseña) => {
    const contraseñaRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,15}$/;
    return contraseñaRegex.test(contraseña);
  };

  const manejarCambio = (campo, valor) => {
    switch (campo) {
      case 'nombre':
        setErrores({ ...errores, nombre: validarNombre(valor) ? '' : 'Nombre no válido' });
        break;
      case 'apellido':
        setErrores({ ...errores, apellido: validarApellido(valor) ? '' : 'Apellido no válido' });
        break;
      case 'rut':
        setErrores({ ...errores, rut: validarRut(valor) ? '' : 'Rut no válido' });
        break;
      case 'telefono':
        setErrores({ ...errores, telefono: validarTelefono(valor) ? '' : 'Teléfono no válido' });
        break;
      case 'email':
        setErrores({ ...errores, email: validarCorreo(valor) ? '' : 'Correo no válido' });
        break;
      case 'direccion':
        setErrores({ ...errores, direccion: validarDireccion(valor) ? '' : 'Dirección no válida' });
        break;
      case 'contraseña':
        setErrores({ ...errores, contraseña: validarContraseña(valor) ? '' : 'Contraseña no válida' });
        break;
      default:
        break;
    }
  };

  const enviarFormulario = async (event) => {
    event.preventDefault();

    const nombre = formRef.current.nombre.value;
    const apellido = formRef.current.apellido.value;
    const rut = formRef.current.rut.value;
    const telefono = formRef.current.telefono.value;
    const correo = formRef.current.email.value;
    const direccion = formRef.current.direccion.value;

    setErrores({
      nombre: validarNombre(nombre) ? '' : 'Nombre no válido',
      apellido: validarApellido(apellido) ? '' : 'Apellido no válido',
      rut: validarRut(rut) ? '' : 'Rut no válido',
      telefono: validarTelefono(telefono) ? '' : 'Teléfono no válido',
      email: validarCorreo(correo) ? '' : 'Correo no válido',
      direccion: validarDireccion(direccion) ? '' : 'Dirección no válida',

    });

    const hayErrores = Object.values(errores).some((error) => error !== '');

    if (hayErrores) {
      toast.error('Por favor, corrija los errores antes de enviar el formulario');
      return;
    }

    const formCliente = new FormData(event.target);
    const toastId = toast.loading('Registrando...', { id: 'loading' });
    const { success, message } = await crearCliente(formCliente);

    if (success) {
      formRef.current.reset();
      toast.dismiss(toastId, { id: 'loading' });
      toast.success(message);
      cambiarOpcion();
    } else {
      formRef.current.reset();
      toast.dismiss(toastId, { id: 'loading' });
      toast.error(message);
    }
  };
  return (
    <form action="" onSubmit={enviarFormulario} ref={formRef} className='border px-2 pt-3 pb-5 mt-1 rounded'>
      <div className="row">
        
        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text"  className={`form-control`}  id="nombre" name='nombre' placeholder='Ingrese el nombre' maxLength={20} onChange={(e) => manejarCambio('nombre', e.target.value)}/>
          {errores.nombre && <p className='text-danger'>{errores.nombre}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="apellido" name='apellido'  placeholder='Ingrese el apellido' maxLength={20} onChange={(e) => manejarCambio('apellido', e.target.value)}/>
          {errores.apellido && <p className='text-danger'>{errores.apellido}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="rut" className="form-label">Rut</label>
          <input type="text" className="form-control" id="rut" name='rut' placeholder='Ej: 12345678-9' maxLength={14} onChange={(e) => manejarCambio('rut', e.target.value)}/>
          {errores.rut && <p className='text-danger'>{errores.rut}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="telefono" className="form-label">Telefono</label>
          <input type="text" className="form-control" id="telefono" name='telefono' placeholder='Ej: +56 932497343' maxLength={14} onChange={(e) => manejarCambio('telefono', e.target.value)}/>
          {errores.telefono && <p className='text-danger'>{errores.telefono}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Correo</label>
            <input type="email" className="form-control" id="email" name='email' placeholder='Ej: correo@gmail.com' maxLength={30} onChange={(e) => manejarCambio('email', e.target.value)}/>
            {errores.email && <p className='text-danger'>{errores.email}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="direccion" className="form-label">Direccion</label>
          <input type="text" className="form-control" id="direccion" name='direccion' placeholder='Ingrese la direccion' maxLength={50} onChange={(e) => manejarCambio('direccion', e.target.value)}/>
          {errores.direccion && <p className='text-danger'>{errores.direccion}</p>}
        </div>
        <div className="col-12 col-md-6">

        </div>
        <div className="col-12 mt-3">
          <button className="btn btn-success" type="submit">Registrar</button>
        </div>
      </div>

    </form>
  )
}
