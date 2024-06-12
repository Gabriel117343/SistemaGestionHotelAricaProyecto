> [!INFO]
> Este es un proyecto de Gestion Hotelera que utilizara Django como Back End y React como Front End, utiliza librerias para la interfaz de usuario como Bootstrap, > > lenguajes Python y Javascript
=======
> RUTAS PROTEGIDAS - ACTUALIZACION FIN PROYECTO 24/12/2023
Manual de Instalación
Requisitos previos
•	Node.js (v18.17.1 o superior)
•	Python (v3.11.5 o superior)
•	pip (v19.0 o superior)
•	Git
Pasos de instalación
1.	Descargar el Repositorio
2.	Instalar las dependencias del frontend
Navega hasta el directorio del frontend (donde se encuentra el archivo package.json) y ejecuta el siguiente comando para instalar las dependencias:
cd <ruta al directorio FronEnd>
Ej:
PS C:\Users\soliz\OneDrive\Escritorio\PROYECTO-HotelArica\HotelAricaProyecto\FrontEnd> npm install
Asegúrate de que estás utilizando la versión correcta de React (18.2.0). Si tienes problemas, puedes instalarla específicamente con:
npm install react@18.2.0 react-dom@18.2.0
3.	Instalar las dependencias del backend
Navega hasta el directorio del backend (donde se encuentra el archivo Pipfile.lock) y ejecuta el siguiente comando para instalar las dependencias:
cd <ruta al directorio del backend>
Ej:
C:\Users\soliz\OneDrive\Escritorio\PROYECTO-HotelArica\HotelAricaProyecto>
pipenv install
después activa el el entorno virutal con pipenvShell
Si no tienes pipenv instalado, puedes instalarlo con:
pip install pipenv

4.	Iniciar el servidor de desarrollo del frontend
Navega hasta el directorio del frontend y ejecuta el siguiente comando para iniciar el servidor de desarrollo:
npm run dev
Esto iniciará el servidor de desarrollo de React. Puedes acceder a la aplicación en tu navegador web en http://localhost:5173. (importante que sea 5173 de lo contrario no se comunicara con djang)

5.	Iniciar el servidor de desarrollo del backend
Navega hasta el directorio del backend y ejecuta el siguiente comando para iniciar el servidor de desarrollo:
python manage.py runserver
Esto iniciará el servidor de desarrollo de Django. Puedes acceder a la API en tu navegador web en http://127.0.0.1:8000. (importante que sea 127.0.0.1:8000)
Finalmente acceder a http://localhost:5173
Repositorio de GitHub del código Fuente
https://github.com/ProyectoIntegracionllll/SistemaGestionHotelAricaProyecto
