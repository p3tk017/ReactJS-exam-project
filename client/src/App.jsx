import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <header>
        <nav class="navbar">
            <div class="logo">CologneShop</div>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">Brands</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
      </header>
    
      <section class="hero">
          <h1>Discover Your Signature Scent</h1>
          <p>Explore our collection of premium colognes.</p>
          <button>Shop Now</button>
      </section>
    
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
    
      <footer>
          <p>&copy; 2025 CologneShop. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
