# 🏨 Sistema de Gestión Hotelera

<image src="https://github.com/user-attachments/assets/0d6bbb28-6c71-49c4-bcc8-f84897191791" alt="imagen del sistema de gestión hotelera" with='800px'>

> ℹ️ **Descripción**  
> Este es un proyecto de **Gestión Hotelera** que utiliza **Django** como Back End y **React** como Front End.  
> Emplea librerías de interfaz como **Bootstrap**, y está desarrollado en **Python** y **JavaScript**.

---

## 🔒 Rutas Protegidas  
> **Actualización final:** 24/12/2023

---

## 📋 Manual de Instalación

### 1. Requisitos previos  
- Node.js (v18.17.1 o superior)  
- Python (v3.11.5 o superior)  
- pip (v19.0 o superior)  
- Git  
- pipenv (opcional, para entorno virtual)

### 2. Clonar repositorio  
```bash
git clone https://github.com/ProyectoIntegracionllll/SistemaGestionHotelAricaProyecto.git
cd SistemaGestionHotelAricaProyecto
```

### 3. Configurar Front End  
```bash
cd FrontEnd
npm install
# Asegúrate de usar React 18.2.0
npm install react@18.2.0 react-dom@18.2.0
```

### 4. Configurar Back End  
```bash
cd ../BackEnd
# Si usas pipenv:
pip install pipenv        # sólo si no está instalado
pipenv install
pipenv shell
# O con pip + virtualenv:
python -m venv venv
source venv/bin/activate  # Unix/macOS
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

### 5. Iniciar servidores  
- Front End:  
  ```bash
  cd FrontEnd
  npm run dev
  ```  
  Accede en: http://localhost:5173 🚀

- Back End:  
  ```bash
  cd BackEnd
  python manage.py runserver
  ```  
  Accede en: http://127.0.0.1:8000 ⚙️

---

## 📂 Repositorio  
https://github.com/ProyectoIntegracionllll/SistemaGestionHotelAricaProyecto  
