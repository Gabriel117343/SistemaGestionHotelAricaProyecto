import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

 export const Index = () => {
  return (
    <>
      <Navbar />
      <section className='py-5'>
        <div className='container'>
          <div className='text-center'>
            <h1 className='pt-4'>Bienvenido al Hotel Arica</h1>
        
            <br />
            <br />
          </div>
          <h2>Características Destacadas</h2>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card mb-4 feature-card'>
                <i className='fas fa-swimming-pool text-primary mx-auto my-4 d-block' style={{ fontSize: '3em' }}></i>
                <h3 className='text-center'>Piscina Exclusiva</h3>
                <img width="300px" height="200px" class="rounded mx-auto d-block" src="images/piscina.jpg" alt=""  />
                <p className='text-center'>Relájate en nuestra impresionante piscina con vistas espectaculares.</p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card mb-4 feature-card'>
                <i className='fas fa-utensils text-primary mx-auto my-4 d-block' style={{ fontSize: '3em' }}></i>
                <h3 className='text-center'>Restaurantes de Clase Mundial</h3>
                <img width="300px" height="200px" class="rounded mx-auto d-block" src="images/restaurante.jpg" alt=""  />
                <p className='text-center'>Disfruta de una amplia variedad de platos exquisitos en nuestros restaurantes.</p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card mb-4 feature-card'>
                <i className='fas fa-spa text-primary mx-auto my-4 d-block' style={{ fontSize: '3em' }}></i>
                <h3 className='text-center'>Spa y Relajación</h3>
                <img width="300px" height="200px" class="rounded mx-auto d-block" src="images/spa.jpg" alt=""  />
                <p className='text-center'>Recarga tu energía con nuestros tratamientos de spa y relajación.</p>
              </div>
            </div>
          </div>
          
<div class="row">
  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
    <img
      src="https://aricasiempreactiva.cl/wp-content/uploads/2022/04/Vista-Aerea-Playa-El-Laucho-region-de-Arica-y-Parinacota-1.jpg"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Boat on Calm Water"
    />

    <img
      src="https://turismoi.cl/uploads/cl/photo/photo_file/2920/a023cdc17df6c21208eb0da0a21bb410.jpg"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Wintry Mountain Landscape"
    />
  </div>

  <div class="col-lg-4 mb-4 mb-lg-0">
    <img
      src="https://www.stonek.com/FOTOS/_FOTOGRAFOS/dstonek/dstonek_34014.jpg"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Mountains in the Clouds"
    />

    <img
      src="https://altosdelnorte.cl/wp-content/uploads/2021/04/cuevas-de-anzota-arica.jpg"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Boat on Calm Water"
    />
  </div>

  <div class="col-lg-4 mb-4 mb-lg-0">
    <img
      src="https://blogapi.uber.com/wp-content/uploads/2018/04/5-panoramas-en-Arica-que-no-te-puedes-perder-1024x512.png"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Waves at Sea"
    />

    <img
      src="https://chileestuyo.cl/wp-content/uploads/2021/08/morro-de-arica.jpg"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Yosemite National Park"
    />
    <img
      src="https://aricasiempreactiva.cl/wp-content/uploads/2020/10/Vista-superior-Playa-El-Laucho-REgion-de-Arica-y-Parinacota.jpg"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Yosemite National Park"
    />
  </div>
  
</div>

          
          
          
          
            
            
          
        </div>
      </section>
      <Footer />
    </>
  );
};


