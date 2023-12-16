# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

> [!NOTE]
- PARA EL PRIMER PROTOTIPADO---------------------

-en api iran las solicitudes Axios o fetch para llamar el Crud desde django, por ejemplo habitaciones, usuario etc.., Responsable(Programadores)

- en componenetes ira todos los componetes reutilizables, lo creado son solo ejemplos 
- en pages iran los componentes a utilizar ya sea un tabla o un componentes que devuelve algo
- en routes las rutas de admin, usuario, personas aseo, etc.. Responsable(Programadores)
- en context iran los contextos por ejemplo de las Habitaciones, Responsable(Programadores)

- en hooks iran los hooks por ejemplo useClases que servira para validar las clases de los inputs, Responsable(Programadores)
- en views iran el footer navbarPanelAdmin, navbarAdminRegistro, navbarPanelRecepcionista, etcc.. son ejemplos
- Dentro de public hay una carpeta images donde pueden guardarse las imagenes para el prototipado(mas adelante se llamaran desde Django)

- Usar react-router-dom para el prototipado

- RECOMENDACIONES
- utilizar bootstrap, react-router-dom (ir agregregando...)
- la extension Fluent Icons para tener los iconos de las carpetas mas llamativos

- Colores
- fondo por ahora background: #ECECEC
- otros colores a gusto..
- nav fondo  background-color: rgb(89, 11, 161);



GITHUB COPILOT CHAT INFORMACIONES:

Gabriel117343: me surigio una duda, si tengo en mi proyecto de react una carpeta components y otra pages donde iran las paginas, las paginas deberian tener los componentes?, si es asi entonces lo que deberia proteger en rutas protegidas deberian ser las paginas ya que los componenetes como por ejemplo un componente que rederiza una tabla de informacion podria ser utilizado tanto para una pagina de administrador como por una pagina de recepcionista?
----------------------------------------
GitHub Copilot: Sí, tu entendimiento es correcto. En una aplicación React, generalmente se tiene una estructura de carpetas donde `components` y `pages` son comunes. 
Los `components` son piezas reutilizables de código que representan una parte de la interfaz de usuario, como un botón, una tarjeta, una tabla, etc. Estos componentes pueden ser utilizados en múltiples páginas.

Las `pages` son componentes también, pero representan una página completa en tu aplicación. Estas páginas utilizan los componentes de la carpeta `components` para construir la interfaz de usuario.

En cuanto a la protección de rutas, generalmente proteges las `pages`. Por ejemplo, puedes tener una página de administrador que sólo debe ser accesible para los usuarios con el rol de administrador. Esta página puede utilizar varios componentes, como una tabla para mostrar información. Pero esta tabla en sí misma no necesita ser protegida, ya que no representa una página completa, sólo una parte de ella.

Así que sí, en la mayoría de los casos, protegerías las páginas en lugar de los componentes individuales.
