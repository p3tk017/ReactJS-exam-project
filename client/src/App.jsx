import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
    
      <HeroSection />
    
      <section class="products">
          <h2>Featured Colognes</h2>
          <div class="product-grid">
              <div class="product">
                  <img src="https://cdn.notinoimg.com/detail_main_mq/armani/3614272225718_01-o/emporio-stronger-with-you-intensely___190118.jpg" alt="Cologne" />
                  <h3>Cologne Name</h3>
                  <p>$119.99</p>
              </div>
              <div class="product">
                  <img src="https://cdn.notinoimg.com/detail_main_mq/xerjoff/2800018180231_01-o/erba-pura___240808.jpg" alt="Cologne" />
                  <h3>Cologne Name</h3>
                  <p>$228.99</p>
              </div>
              <div class="product">
                  <img src="https://cdn.notinoimg.com/detail_main_mq/montale/mntincu_aedp10_01-o/intense-cafe___150210.jpg" alt="Cologne" />
                  <h3>Cologne Name</h3>
                  <p>$179.99</p>
              </div>
          </div>
      </section>
    
      <Footer />
    </>
  )
}

export default App
