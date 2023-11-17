export const Footer = () => {
  return (

    <footer className="bg-dark">
      <div className='container'>
        <div className='row pt-3'>
          <div className='col-md-4 flex-column'>
            <strong className='text-white'>Contactos</strong>
            <li className='list-unstyled pt-3 pb-1'>
              <a href=''>
                <i className='bi bi-whatsapp'> +56 32093093</i>
              </a>
            </li>

            <li className='list-unstyled pt-1 pb-1'>
              <a href=''>
                <i className='bi bi-envelope-at'> Empresa.nueva100@gmail.coms</i>
              </a>
            </li>
            <li className='list-unstyled pt-1 pb-1'>
              <a href=''>
                <i className='bi bi-facebook'> EmpresaNueva</i>
              </a>
            </li>
            <li className='list-unstyled pt-1 pb-1'>
              <a href=''>
                <i className='bi bi-twitter'> EmpresaTwitter</i>
              </a>
            </li>
            <li className='list-unstyled pt-1 pb-1'>
              <a href=''>
                <i className='bi bi-instagram'> @HotelAricaInstagram</i>
              </a>
            </li>
          </div>
          <div className='col-md-4'>
            <strong className='text-white'>Direcciones</strong>
          </div>
          <div className='col-md-4'>
            <strong className='text-white'>Direcciones</strong>
          </div>
        </div>
      </div>
      <div className='bg-dark'>
        <div className='pt-2 pb-2'>
          <small className='d-flex justify-content-center text-white'>© Todos los derechos reservados - 2023</small>
        </div>
      </div>

    </footer>

  )
}
